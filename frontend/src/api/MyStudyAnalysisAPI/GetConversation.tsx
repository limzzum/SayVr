import React, { useEffect } from 'react';
import axios from 'axios';

interface GetConversationProps {
  conversationId: number;
}

const GetConversation: React.FC<GetConversationProps> = ({ conversationId }) => {
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        // URL 생성
        const url = `https://말해vr.site/conversation/${conversationId}`;

        // 헤더 설정
        const headers = {
          Authorization: 'YourAuthorizationString', // 여기에 실제 Authorization 값 넣어주세요
        };

        // GET 요청 보내기
        const response = await axios.get(url, { headers });

        // 성공적으로 응답 받았을 때의 처리
        console.log('Response:', response.data);

        // 여기서 받은 데이터를 활용하여 추가적인 로직을 구현할 수 있습니다.
      } catch (error) {
        // 오류 발생 시의 처리
        console.error('Error fetching conversation:', error);
      }
    };

    // 함수 호출
    fetchConversation();
  }, [conversationId]);

  return <div>Fetching Conversation...</div>;
};

export default GetConversation;
