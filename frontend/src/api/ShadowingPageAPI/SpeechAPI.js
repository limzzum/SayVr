import React, { useState, useCallback, useEffect } from "react";

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

  const onRecAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log("녹음된 데이터 유알엘 변경 작업 중");
      console.log(URL.createObjectURL(audioUrl));

      const reader = new FileReader();
      reader.onloadend = function () {
        const base64String = reader.result.split(',')[1];
        console.log(base64String);

        callPronunciationAPI(base64String);
      };

      reader.readAsDataURL(audioUrl);
    }
  }, [audioUrl]);

  const callPronunciationAPI = (base64String) => {
    console.log("axios 부분에서 확인하는 값", base64String)

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
