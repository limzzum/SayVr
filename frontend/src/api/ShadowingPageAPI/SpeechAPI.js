import React, { useState, useCallback, useEffect } from "react";
import toWav from "audiobuffer-to-wav";

const RecorderModule = ({ onRecordingStart, onRecordingStop }) => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [audioElement, setAudioElement] = useState();

  useEffect(() => {
    if (!onRec) {
      // 녹음 중지 시 호출되는 부분
      onRecordingStop(audioUrl);
    }
  }, [onRec, onRecordingStop, audioUrl]);

  const onRecAudio = useCallback(async () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 16000,
        bitsPerSecond: 16000,
        audio: {
          sampleRate: 16000,
        },
      });
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 녹음 중지와 관련된 로직을 여기에서 처리하지 않도록 변경
        if (e.playbackTime > 20) {
          // 녹음 중지 로직 추가
          stopRecording();
        } else {
          setOnRec(false);
        }
      };
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }, []);

  const offRecAudio = () => {
    // 기존 코드와 중복되는 부분을 stopRecording 함수로 분리
    stopRecording();
  };

  const stopRecording = () => {
    if (media) {
      media.ondataavailable = null; // 기존 이벤트 리스너 삭제

      media.ondataavailable = function (e) {
        const audioBlob = e.data;
        setAudioUrl(audioBlob);
        setOnRec(true);
      };

      stream.getAudioTracks().forEach(function (track) {
        track.stop();
      });

      media.stop();
      analyser.disconnect();
      source.disconnect();
    }
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log("녹음된 데이터 유알엘 변경 작업 중");
      console.log(URL.createObjectURL(audioUrl));
  
      // 리샘플링 및 기타 처리
      const audioBlob = audioUrl;
      const reader = new FileReader();
      reader.readAsArrayBuffer(audioBlob);
  
      reader.onloadend = function () {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = reader.result;
        audioCtx.decodeAudioData(arrayBuffer, function (decodedBuffer) {
          const resampledBuffer = audioCtx.createBuffer(1, decodedBuffer.length, 16000);
          resampledBuffer.getChannelData(0).set(decodedBuffer.getChannelData(0));
          const wavBuffer = toWav(resampledBuffer);
          
          // Create a new Blob from the resampled data
          const resampledBlob = new Blob([wavBuffer], { type: 'audio/wav' });
  
          // Now, you can convert the Blob to a base64 string
          const readerForBase64 = new FileReader();
          readerForBase64.onloadend = function () {
            const base64String = readerForBase64.result.split(',')[1];
            console.log(base64String);
            
            // Call your API with the base64 string
            callPronunciationAPI(base64String);
          };
  
          readerForBase64.readAsDataURL(resampledBlob);
        });
      };
    }
  }, [audioUrl]);

  const callPronunciationAPI = (base64String) => {
    console.log("axios 부분에서 확인하는 값", base64String);

    const openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation";
    const accessKey = "5a9f37a7-aac6-41ab-9be2-989c17d29f17";
    const languageCode = "english";
    const script = null;

    const requestJson = {
      argument: {
        language_code: languageCode,
        script: script,
        audio: base64String,
      },
    };

    fetch(openApiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: accessKey,
      },
      body: JSON.stringify(requestJson),
    })
      .then((response) => {
        console.log(response)
        console.log("[responseCode] " + response.status);
        return response.text();
      })
      .then((data) => {
        console.log("[responBody]");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const playRecordedAudio = () => {
    if (audioElement) {
      audioElement.play();
    }
  };

  return (
    <>
      <button onClick={onRec ? onRecAudio : offRecAudio}>{onRec ? "녹음 시작" : "녹음 중지"}</button>
      <button onClick={onSubmitAudioFile}>결과 확인</button>
      {audioUrl && <audio ref={(audio) => setAudioElement(audio)} src={URL.createObjectURL(audioUrl)} controls />}
    </>
  );
};

export default RecorderModule;