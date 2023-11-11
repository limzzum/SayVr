package com.npc.say_vr.domain.game.api;

import static com.npc.say_vr.domain.game.constant.GameResponseMessage.IS_ANSWER;
import static com.npc.say_vr.domain.game.constant.GameResponseMessage.IS_BAD_ANSWER;
import static com.npc.say_vr.domain.game.constant.GameResponseMessage.PLAYER_OUT_MESSAGE;

import com.npc.say_vr.domain.game.constant.SocketType;
import com.npc.say_vr.domain.game.dto.GameRequestDto.GameSocketRequestDto;
import com.npc.say_vr.domain.game.dto.GameRequestDto.PlayerOutRequestDto;
import com.npc.say_vr.domain.game.dto.GameRequestDto.SubmitAnswerRequestDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameQuizResultDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameSocketResponseDto;
import com.npc.say_vr.domain.game.dto.GameStatusDto;
import com.npc.say_vr.domain.game.service.GameService;
import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.service.GoalService;
import com.npc.say_vr.domain.user.service.ActivityService;
import com.npc.say_vr.global.util.RedisUtil;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GameSocketController {

    private final RabbitTemplate rabbitTemplate;
    private final RedisUtil redisUtil;
    private final GameService gameService;
    private final ActivityService activityService;
    private final GoalService goalService;

    private static final String EXCHANGE_NAME = "amq.topic";


    @MessageMapping("game.{gameId}")
    public void game(GameSocketRequestDto gameSocketRequestDto, @DestinationVariable String gameId, SimpMessageHeaderAccessor accessor){
        Long userId = Long.valueOf(accessor.getUser().getName());
        log.info("game 웹소켓 메시지 pull");
        SocketType socketType = gameSocketRequestDto.getSocketType();
        GameSocketResponseDto gameSocketResponseDto;

        if(socketType.equals(SocketType.GAME_INFO)){
            if(redisUtil.hasKeyGameStatusList(gameId)){
                GameStatusDto gameStatusDto = redisUtil.getGameStatusList(gameId);
                gameSocketResponseDto = GameSocketResponseDto.builder().socketType(socketType)
                    .gameStatusDto(gameStatusDto).build();
                rabbitTemplate.convertAndSend(EXCHANGE_NAME, "game." + gameId, gameSocketResponseDto);
            }
            return;
        }

        if(socketType.equals(SocketType.CHAT)){
            System.out.println(gameSocketRequestDto.getMessage());
                gameSocketResponseDto = GameSocketResponseDto.builder().socketType(socketType)
                    .data(gameSocketRequestDto.getMessage()).build();
                rabbitTemplate.convertAndSend(EXCHANGE_NAME, "game." + gameId, gameSocketResponseDto);
            return;
        }

        if(socketType.equals(SocketType.QUIZ)){
            String text = gameSocketRequestDto.getMessage();
            boolean isAnswer = false;
            GameStatusDto gameStatusDto = null;
            String message = IS_BAD_ANSWER.getMessage();

            SubmitAnswerRequestDto submitAnswerRequestDto = SubmitAnswerRequestDto.builder()
                .gameId(Long.valueOf(gameId)).userId(userId).text(text).build();
            if(gameService.checkQuizAnswer(submitAnswerRequestDto)){
                isAnswer = true;
                message = IS_ANSWER.getMessage();
                if(gameService.isEndGame(Long.valueOf(gameId))){
                    gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.GAME_END)
                        .data(gameService.getGameResult(Long.valueOf(gameId)))
                        .build();
                    rabbitTemplate.convertAndSend(EXCHANGE_NAME, "game." + gameId, gameSocketResponseDto);
                    activityService.saveActicity(userId, OptionType.GAME);
                    goalService.updateCheckListOption(userId,OptionType.GAME);
                    return;
                }
                gameService.updateQuiz(Long.valueOf(gameId));
                gameStatusDto = redisUtil.getGameStatusList(gameId);
            }

            GameQuizResultDto gameQuizResultDto = GameQuizResultDto.builder().userId(userId).isAnswer(isAnswer)
                .build();
            gameSocketResponseDto = GameSocketResponseDto.builder().socketType(socketType)
                .gameStatusDto(gameStatusDto)
                .data(gameQuizResultDto)
                .message(message)
                .build();
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, "game." + gameId, gameSocketResponseDto);
            gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.CHAT)
                .data(gameSocketRequestDto.getMessage()).build();
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, "game." + gameId, gameSocketResponseDto);

            return;
        }


        if(socketType.equals(SocketType.PLAYER_OUT)){
            gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.GAME_END)
                .message(PLAYER_OUT_MESSAGE.getMessage())
                .data(gameService.playerOutGame(PlayerOutRequestDto.builder().gameId(Long.valueOf(gameId))
                        .outUserId(userId).build()))
                .build();
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, "game." + gameId, gameSocketResponseDto);
            return;
        }


        gameSocketResponseDto = GameSocketResponseDto.builder().socketType(socketType)
            .message(gameSocketRequestDto.getMessage()).build();
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, "game." + gameId, gameSocketResponseDto);
    }


}
