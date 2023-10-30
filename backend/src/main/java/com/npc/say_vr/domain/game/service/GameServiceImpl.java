package com.npc.say_vr.domain.game.service;

import com.npc.say_vr.domain.game.constant.GameStatus;
import com.npc.say_vr.domain.game.domain.Game;
import com.npc.say_vr.domain.game.domain.Ranking;
import com.npc.say_vr.domain.game.dto.GameStatusDto;
import com.npc.say_vr.domain.game.dto.PlayerDto;
import com.npc.say_vr.domain.game.dto.WaitingGameDto;
import com.npc.say_vr.domain.game.repository.GameRepository;
import com.npc.say_vr.domain.game.repository.RankingRepository;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameServiceImpl implements GameService {

    private final RedisUtil redisUtil;
    private final RankingRepository rankingRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    @Override
    public Long create() {
        Game game = Game.builder().status(GameStatus.CREATED).totalRound(5).build();
        Game save = gameRepository.save(game);
        return save.getId();
    }

    @Override
    public Long registWaitingQueue(Long userId) {
        Ranking ranking = rankingRepository.findByUserId(userId).orElseThrow();
        String name = ranking.getTier().getName();

        if(redisUtil.hasKey(name)){
            WaitingGameDto waitingGameDto = (WaitingGameDto) redisUtil.get(name);
            Long gameId = waitingGameDto.getGameId();
            GameStatusDto gameStatusDto = (GameStatusDto) redisUtil.getGameStatusList(String.valueOf(gameId));
            User user = userRepository.findById(userId).orElseThrow();
            PlayerDto playerDto = PlayerDto.builder().userId(userId).ranking(1L).point(0L).winCnt(0)
                .profile(user.getProfile()).build();
            gameStatusDto.setPlayerB(playerDto);
            String quizAnswer = createQuizAnswer();
            String quizQuestion = getQuizQuestion(quizAnswer);
            gameStatusDto.setQuestion(quizQuestion);
            gameStatusDto.setAnswer(quizAnswer);
            redisUtil.setGameStatusList(String.valueOf(gameId), gameStatusDto, 30 * 1000 * 60);
            return waitingGameDto.getGameId();
        }

        Long gameId = create();
        redisUtil.set(name, WaitingGameDto.builder().gameId(gameId).waitingUserId(userId).build(), 30);

        User user = userRepository.findById(userId).orElseThrow();
        PlayerDto playerDto = PlayerDto.builder().userId(userId).ranking(1L).point(0L).winCnt(0)
            .profile(user.getProfile()).build();
        GameStatusDto gameStatusDto = GameStatusDto.builder().gameId(gameId).playerA(playerDto).build();
        redisUtil.setGameStatusList(String.valueOf(gameId),gameStatusDto, 30 * 1000 * 60);
        return gameId;
    }

    @Override
    public boolean checkQuizAnswer(Long gameId, String answer) {
        GameStatusDto gameStatusDto = (GameStatusDto) redisUtil.getGameStatusList(String.valueOf(gameId));
        return gameStatusDto.getAnswer().equals(answer);
    }

    @Override
    public String createQuizAnswer() {
        //TODO : 단어 db에서 정답 가져오기
        String answer = "answer";
        return answer;
    }

    @Override
    public String getQuizQuestion(String answer) {
        // TODO : 파파고 api 이용해 한글로 번역 => 질문만들기
        String question = "질문";
        return question;
    }
}
