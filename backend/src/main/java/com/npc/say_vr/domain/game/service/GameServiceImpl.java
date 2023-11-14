package com.npc.say_vr.domain.game.service;

import static com.npc.say_vr.domain.game.constant.GameResponseMessage.GAME_START_MESSAGE;
import static com.npc.say_vr.domain.game.constant.GameResponseMessage.GAME_STATUS_INFO;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.WordUpdateResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.WordcardDto;
import com.npc.say_vr.domain.flashcards.service.WordcardService;
import com.npc.say_vr.domain.game.constant.GameStatus;
import com.npc.say_vr.domain.game.constant.SocketType;
import com.npc.say_vr.domain.game.domain.Game;
import com.npc.say_vr.domain.game.domain.Ranking;
import com.npc.say_vr.domain.game.domain.Tier;
import com.npc.say_vr.domain.game.dto.GameRequestDto.PlayerOutRequestDto;
import com.npc.say_vr.domain.game.dto.GameRequestDto.SubmitAnswerRequestDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameResultDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameSocketResponseDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameWaitingResponseDto;
import com.npc.say_vr.domain.game.dto.GameStatusDto;
import com.npc.say_vr.domain.game.dto.PlayerDto;
import com.npc.say_vr.domain.game.repository.GameRepository;
import com.npc.say_vr.domain.game.repository.RankingRepository;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.global.util.RedisUtil;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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
    private final RabbitTemplate rabbitTemplate;
    private final GameScheduler gameScheduler;
    private final WordcardService wordcardService;
    private final RankingService rankingService;

    private static final String EXCHANGE_NAME = "amq.topic";

    @Override
    @Transactional
    public Long create() {
        Game game = Game.builder().status(GameStatus.CREATED).totalRound(5).build();
        Game save = gameRepository.save(game);
        return save.getId();
    }

    @Override
    @Transactional
    public GameWaitingResponseDto registWaitingQueue(Long userId) {
        Ranking ranking = rankingRepository.findByUserId(userId).orElseThrow();
        Tier tier = ranking.getTier();
        Long rank = rankingService.readRank(userId);
        String name = ranking.getTier().getName();

        if(redisUtil.hasKey(name)){
            String gameId = (String) redisUtil.get(name);
            GameStatusDto gameStatusDto = redisUtil.getGameStatusList(gameId);

            User user = userRepository.findById(userId).orElseThrow();

            if(gameStatusDto.getPlayerA().getUserId() == userId){
                return GameWaitingResponseDto.builder().gameId(Long.valueOf(gameId))
                    .profile(user.getProfile())
                    .isGameStart(false)
                    .build();
            }

            redisUtil.delete(name);
            PlayerDto playerDto = PlayerDto.builder().userId(userId).nickname(user.getNickname()).ranking(rank).tierImage(tier.getImage()).point(
                    (long) ranking.getPoint()).winCnt(0)
                .profile(user.getProfile()).build();
            gameStatusDto.setPlayerB(playerDto);
            redisUtil.setGameStatusList(gameId,gameStatusDto);
            updateQuiz(Long.valueOf(gameId));
            GameSocketResponseDto gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.GAME_START)
                .data(gameStatusDto)
                .message(GAME_START_MESSAGE.getMessage())
                .build();
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, "game." + gameId, gameSocketResponseDto);

            return GameWaitingResponseDto.builder().gameId(Long.valueOf(gameId))
                .profile(user.getProfile())
                .isGameStart(true)
                .build();
        }

        Long gameId = create();
        redisUtil.set(name, String.valueOf(gameId), 30* 1000* 60);

        User user = userRepository.findById(userId).orElseThrow();
        PlayerDto playerDto = PlayerDto.builder().userId(userId).nickname(user.getNickname()).ranking(rank).tierImage(tier.getImage()).point(
                (long) ranking.getPoint()).winCnt(0)
            .profile(user.getProfile()).build();
        GameStatusDto gameStatusDto = GameStatusDto.builder().gameId(gameId).playerA(playerDto).build();
        redisUtil.setGameStatusList(String.valueOf(gameId),gameStatusDto);
        return GameWaitingResponseDto.builder().gameId(Long.valueOf(gameId))
            .profile(user.getProfile())
            .isGameStart(false)
            .build();
    }

    @Override
    public void gameStart(Long userId) {
        Long gameId = findGameIdByUserId(userId);
        updateQuiz(gameId);
        gameScheduler.addGameRoom(gameId);
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(String.valueOf(gameId));

        GameSocketResponseDto gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.GAME_START)
            .gameStatusDto(gameStatusDto)
            .message(GAME_STATUS_INFO.getMessage())
            .build();
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, "game." + gameId, gameSocketResponseDto);

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
            PlayerDto playerB = gameStatusDto.getPlayerB();
            playerB.addWinCnt();
            gameStatusDto.setPlayerB(playerB);
            redisUtil.setGameStatusList(String.valueOf(gameId), gameStatusDto);
            return true;
        }

        return false;
    }

    @Override
    public Map<String, String> createQuizAnswer() {
//        WordUpdateResponseDto wordUpdateResponseDto = wordcardService.readTodaySentence();
        WordcardDto wordcard = null; //wordUpdateResponseDto.getWordcard();

        Map<String, String> result = new HashMap<>();
        String answer = wordcard != null ? wordcard.getEng() :"answer";
        String question = wordcard != null ? wordcard.getKor() :"질문";
        result.put("answer", answer);
        result.put("question", question);
        return result;
    }

    @Override
    public String updateQuiz(Long gameId) {
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(String.valueOf(gameId));
        Map<String, String> quiz = createQuizAnswer();
        String quizAnswer = quiz.get("answer");
        String quizQuestion = quiz.get("question");
        gameStatusDto.setQuestion(quizQuestion);
        gameStatusDto.setAnswer(quizAnswer);
        gameStatusDto.setQuizEndTime(LocalDateTime.now().plusSeconds(33));
        gameStatusDto.setCurRound(gameStatusDto.getCurRound() + 1);
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
        rankingService.updateRanking(winnerId, WINNER_POINT);
        rankingService.updateRanking(loserId, LOSER_POINT);

        deleteGameStatus(gameId);
        return GameResultDto.builder().winnerId(winnerId).loserId(loserId).isDraw(isDraw)
            .winnerPoint(WINNER_POINT).loserPoint(LOSER_POINT).drawPoint(DRAW_POINT).build();

    }

    @Override
    public GameResultDto playerOutGame(PlayerOutRequestDto playerOutRequestDto) {

        String gameId = String.valueOf(playerOutRequestDto.getGameId());
        Long outUserId = playerOutRequestDto.getOutUserId();
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(gameId);
        if(gameStatusDto == null){
            throw new IllegalArgumentException();
        }

        if(isWaitingGame(gameStatusDto)){
            Ranking ranking = rankingRepository.findByUserId(outUserId).orElseThrow();
            String name = ranking.getTier().getName();
            redisUtil.deleteGameStatusList(gameId);
            redisUtil.delete(name);
            return null;
        }

        Long playerA_userId = gameStatusDto.getPlayerA().getUserId();
        Long playerB_userId = gameStatusDto.getPlayerB().getUserId();
        Long winnerId = playerA_userId;
        Long loserId = playerB_userId;

        if(outUserId == playerA_userId){
            winnerId = playerB_userId;
            loserId = playerA_userId;
        }
        rankingService.updateRanking(winnerId, WINNER_POINT);
        rankingService.updateRanking(loserId, LOSER_POINT);

        deleteGameStatus(Long.valueOf(gameId));

        return GameResultDto.builder().isDraw(false).winnerId(winnerId).loserId(loserId)
            .winnerPoint(WINNER_POINT).build();
    }

    private static boolean isWaitingGame(GameStatusDto gameStatusDto) {
        return gameStatusDto.getPlayerA() == null || gameStatusDto.getPlayerB() == null;
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

    @Override
    public void deleteGameStatus(Long gameId) {
        gameScheduler.removeGameRoom(gameId);
        redisUtil.deleteGameStatusList(String.valueOf(gameId));
    }
}
