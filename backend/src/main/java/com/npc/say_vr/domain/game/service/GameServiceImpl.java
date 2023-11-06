package com.npc.say_vr.domain.game.service;

import com.npc.say_vr.domain.game.constant.GameStatus;
import com.npc.say_vr.domain.game.domain.Game;
import com.npc.say_vr.domain.game.domain.Ranking;
import com.npc.say_vr.domain.game.dto.GameRequestDto.PlayerOutRequestDto;
import com.npc.say_vr.domain.game.dto.GameRequestDto.SubmitAnswerRequestDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameResultDto;
import com.npc.say_vr.domain.game.dto.GameStatusDto;
import com.npc.say_vr.domain.game.dto.PlayerDto;
import com.npc.say_vr.domain.game.dto.WaitingGameDto;
import com.npc.say_vr.domain.game.repository.GameRepository;
import com.npc.say_vr.domain.game.repository.RankingRepository;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.global.util.RedisUtil;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameServiceImpl implements GameService {

    private final int FINAL_ROUND = 5;
    private final int WINNER_POINT = 200;
    private final int LOSER_POINT = 50;
    private final int DRAW_POINT = 100;


    private final RedisUtil redisUtil;
    private final RankingRepository rankingRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Long create() {
        Game game = Game.builder().status(GameStatus.CREATED).totalRound(5).build();
        Game save = gameRepository.save(game);
        return save.getId();
    }

    @Override
    @Transactional
    public Long registWaitingQueue(Long userId) {
        Ranking ranking = rankingRepository.findByUserId(userId).orElseThrow();
        String name = ranking.getTier().getName();

        if(redisUtil.hasKey(name)){
            String gameId = (String) redisUtil.get(name);
            GameStatusDto gameStatusDto = redisUtil.getGameStatusList(gameId);
            User user = userRepository.findById(userId).orElseThrow();
            PlayerDto playerDto = PlayerDto.builder().userId(userId).ranking(1L).point(0L).winCnt(0)
                .profile(user.getProfile()).build();
            gameStatusDto.setPlayerB(playerDto);
            redisUtil.setGameStatusList(gameId,gameStatusDto);
            updateQuiz(Long.valueOf(gameId));
            return Long.valueOf(gameId);
        }

        Long gameId = create();
        redisUtil.set(name, String.valueOf(gameId), 30* 1000* 60);

        User user = userRepository.findById(userId).orElseThrow();
        PlayerDto playerDto = PlayerDto.builder().userId(userId).ranking(1L).point(0L).winCnt(0)
            .profile(user.getProfile()).build();
        GameStatusDto gameStatusDto = GameStatusDto.builder().gameId(gameId).playerA(playerDto).build();
        redisUtil.setGameStatusList(String.valueOf(gameId),gameStatusDto);
        return gameId;
    }

    @Override
    public boolean checkQuizAnswer(SubmitAnswerRequestDto submitQuizAnswer) {
        Long gameId = submitQuizAnswer.getGameId();
        String submitText = submitQuizAnswer.getText();
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(String.valueOf(gameId));

        Long userId = submitQuizAnswer.getUserId();
        if(gameStatusDto.getAnswer().equals(submitText)){
            PlayerDto playerA = gameStatusDto.getPlayerA();
            if(playerA.getUserId() == userId){
                playerA.addWinCnt();
                gameStatusDto.setPlayerA(playerA);
                redisUtil.setGameStatusList(String.valueOf(gameId), gameStatusDto);
                return true;
            }
        }
        PlayerDto playerB = gameStatusDto.getPlayerB();
        playerB.addWinCnt();
        gameStatusDto.setPlayerB(playerB);
        redisUtil.setGameStatusList(String.valueOf(gameId), gameStatusDto);
        return false;
    }

    @Override
    public String createQuizAnswer() {
        //TODO : 단어 db에서 정답 가져오기
        String answer = "answer";
        return answer;
    }

    @Override
    public String updateQuiz(Long gameId) {
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(String.valueOf(gameId));
        String quizAnswer = createQuizAnswer();
        String quizQuestion = getQuizQuestion(quizAnswer);
        gameStatusDto.setQuestion(quizQuestion);
        gameStatusDto.setAnswer(quizAnswer);
        gameStatusDto.setQuizEndTime(LocalDateTime.now().plusSeconds(30));
        redisUtil.setGameStatusList(String.valueOf(gameId), gameStatusDto);
        return quizQuestion;
    }

    @Override
    public boolean isTimeLimitExceeded(Long gameId) {
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(String.valueOf(gameId));
        return gameStatusDto.getQuizEndTime().isBefore(LocalDateTime.now());
    }

    @Override
    public boolean isEndGame(Long gameId) {
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(String.valueOf(gameId));
        return gameStatusDto.getCurRound() == FINAL_ROUND;
    }

    @Override
    public GameResultDto getGameResult(Long gameId) {
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(String.valueOf(gameId));
        PlayerDto playerA = gameStatusDto.getPlayerA();
        PlayerDto playerB = gameStatusDto.getPlayerB();


        Long winnerId = playerB.getUserId();
        Long loserId = playerA.getUserId();
        boolean isDraw = false;

        if(playerA.getWinCnt()> playerB.getWinCnt()){
            winnerId = playerA.getUserId();
            loserId = playerB.getUserId();
        }
        if(playerA.getWinCnt() == playerB.getWinCnt()){
            isDraw = true;
        }
        // TODO : 랭킹 점수 업데이트
        return GameResultDto.builder().winnerId(winnerId).loserId(loserId).isDraw(isDraw)
            .winnerPoint(WINNER_POINT).loserPoint(LOSER_POINT).drawPoint(DRAW_POINT).build();

    }

    @Override
    public GameResultDto playerOutGame(PlayerOutRequestDto playerOutRequestDto) {
        //TODO : 레디스 게임 상태 관리 삭제 & 랭킹 점수 업데이트
        String gameId = String.valueOf(playerOutRequestDto.getGameId());
        Long outUserId = playerOutRequestDto.getOutUserId();
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(gameId);
        if(gameStatusDto == null){
            throw new IllegalArgumentException("todo");
        }


        Long playerA_userId = gameStatusDto.getPlayerA().getUserId();
        Long playerB_userId = gameStatusDto.getPlayerB().getUserId();
        Long winnerId = playerA_userId;
        Long loserId = playerB_userId;

        if(outUserId == playerA_userId){
            winnerId = playerB_userId;
            loserId = playerA_userId;
        }

        return GameResultDto.builder().isDraw(false).winnerId(winnerId).loserId(loserId)
            .winnerPoint(WINNER_POINT).build();
    }

    @Override
    public Long findGameIdByUserId(Long userId) {
        List<GameStatusDto> gameStatusValues = redisUtil.getGameStatusValues();
        for (GameStatusDto gameStatusDto : gameStatusValues){
            if(gameStatusDto.getPlayerA().getUserId() == userId || gameStatusDto.getPlayerB().getUserId() == userId){
                return gameStatusDto.getGameId();
            }
        }
        return null;
    }

    @Override
    public String getQuizQuestion(String answer) {
        // TODO : 파파고 api 이용해 한글로 번역 => 질문만들기
        String question = "질문";
        return question;
    }
}
