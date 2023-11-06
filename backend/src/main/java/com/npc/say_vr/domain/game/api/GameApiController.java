package com.npc.say_vr.domain.game.api;

import static com.npc.say_vr.domain.game.constant.GameResponseMessage.GAME_WAITING_SUCCESS;

import com.npc.say_vr.domain.game.dto.GameResponseDto.GameWaitingResponseDto;
import com.npc.say_vr.domain.game.service.GameService;
import com.npc.say_vr.domain.user.service.UserService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game")
@Slf4j
@CrossOrigin("*")
public class GameApiController {

    private final GameService gameService;
    private final UserService userService;

    @GetMapping("/wait")
    public ResponseEntity<?> waiting(@AuthenticationPrincipal Long userId) {
        log.info("게임 대기 큐 등록 api 호출 됨");
        Long gameId = gameService.registWaitingQueue(userId);
        String profile = userService.readUser(userId).getProfile();

        return ResponseEntity.ok(
            ResponseDto.builder().message(GAME_WAITING_SUCCESS.getMessage())
                .data(GameWaitingResponseDto.builder().gameId(gameId).profile(profile).build())
                .httpStatus(GAME_WAITING_SUCCESS.getStatus()).build());
    }

}
