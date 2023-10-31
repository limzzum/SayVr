package com.npc.say_vr.domain.game.api;

import static com.npc.say_vr.domain.game.constant.GameResponseMessage.GAME_WAITING_SUCCESS;

import com.npc.say_vr.domain.game.dto.GameResponseDto.GameWaitingResponseDto;
import com.npc.say_vr.domain.game.service.GameService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game")
public class GameApiController {

    private final GameService gameService;

    @GetMapping("/wait")
    public ResponseEntity<?> waiting() {
        Long gameId = gameService.registWaitingQueue(1L);

        return ResponseEntity.ok(
            ResponseDto.builder().message(GAME_WAITING_SUCCESS.getMessage())
                .data(GameWaitingResponseDto.builder().gameId(gameId).build())
                .httpStatus(GAME_WAITING_SUCCESS.getStatus()));
    }

}
