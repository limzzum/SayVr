package com.npc.say_vr.domain.vr.api;

import com.npc.say_vr.domain.vr.domain.Conversation;
import com.npc.say_vr.global.dto.ResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/conversation")
public class ConversationApiController {

    //TODO: api 목록
    //내 정보 조회 -> 등급 발음/문맥/문법 평균 총평 VR - SERVER 라서 유저에게 안가고 나에게? 유저 부분에서 해야 할 것 같지만,,
    // 대화 상세 조회-> 대화 ID 별 상세 whole conversation


    //내 정보 조회 API TODO: (VR에서 등급조회 기타 등등 이후 협상할 것)
    @GetMapping("/info")
    public ResponseEntity<?> readMyProficiencyInfo(@AuthenticationPrincipal Long userId) {
        //ProficiencyInfoDto -->
        ResponseDto responseDto = new ResponseDto("success", 0);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //내 대화 목록 조회 -> 며칠자 대화 ID
    @GetMapping("/list")
    public ResponseEntity<?> readMyConversationList(@AuthenticationPrincipal Long userId) {
        List<Conversation> conversationList;
        ResponseDto responseDto = new ResponseDto("success", conversationList);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //내 대화 조회 API
    @GetMapping("/list/{conversationId}")
    public ResponseEntity<?> readConversation(@AuthenticationPrincipal Long userId,
        @PathVariable Long conversationId) {
        Conversation conversation;
        ResponseDto responseDto = new ResponseDto("success", conversation);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //TODO: 대화 시작 후 어떤 단계로 끊어서 진행 할 건지,, 대화 시작시 요청 보내라고? VR과 대화 필요,
    @PostMapping("/line")
    public ResponseEntity<?> createConversation(@AuthenticationPrincipal Long userId,
        @RequestBody CreateConversationRequestDto createConversationRequestDto) {
        // 시작시 상태: 시작, 으로 오고, 문장 두개 줌, 평가있으면 같이 받음,,
        // Line ProficiencyInfo
        ResponseDto responseDto = new ResponseDto("success", 0);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

}
