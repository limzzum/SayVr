import React, { useState, useCallback, useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const RecorderModule = ({ onRecordingStart, onRecordingStop, onPronunciationResult, currentScriptText }) => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [recognizer, setRecognizer] = useState(null);

  useEffect(() => {
    if (!onRec) {
      onRecordingStop(audioUrl);
      setIsRecording(false);
    }
  }, [onRec, onRecordingStop, audioUrl]);

  const onRecAudio = useCallback(async () => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      "07c3100614404b018bcd2dae1c463146",
      "koreacentral"
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const newRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    setRecognizer(newRecognizer);

    const reference_text = currentScriptText;
    const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
      reference_text,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true
    );

    pronunciationAssessmentConfig.applyTo(newRecognizer);

    function onRecognizedResult(result) {
      console.log("발음 평가 텍스트 : ", result.text);
      const pronunciation_result_text = result.text;
      const pronunciation_result = sdk.PronunciationAssessmentResult.fromResult(result);
      console.log(
        "인식된 문장",
        pronunciation_result.text,
        " Accuracy score: ",
        pronunciation_result.accuracyScore,
        "\n",
        "pronunciation score: ",
        pronunciation_result.pronunciationScore,
        "\n",
        "completeness score : ",
        pronunciation_result.completenessScore,
        "\n",
        "fluency score: ",
        pronunciation_result.fluencyScore
      );

      // 발음 결과를 부모 컴포넌트로 전달
      onPronunciationResult({
        text: pronunciation_result_text,
        accuracyScore: pronunciation_result.accuracyScore,
        pronunciationScore: pronunciation_result.pronunciationScore,
        completenessScore: pronunciation_result.completenessScore,
        fluencyScore: pronunciation_result.fluencyScore,
      });

      newRecognizer.close();
    }

    newRecognizer.recognizeOnceAsync((result) => {
      onRecognizedResult(result);

      const userSpeechText = result.text;
      console.log("사용자의 말한 내용: ", userSpeechText);

      setAudioUrl(result.audioData);
      setIsRecording(false);
    });

    setOnRec(false);
    setIsRecording(true);
  }, [currentScriptText, onPronunciationResult]);

  const offRecAudio = async () => {
    if (recognizer) {
      recognizer.close();
    }
    stopRecording();
  };

  const stopRecording = () => {
    setOnRec(true);
    setIsRecording(false);
    if (media) {
      media.ondataavailable = null;

      media.ondataavailable = function (e) {
        const audioBlob = e.data;
        setAudioUrl(audioBlob);
      };

      stream.getAudioTracks().forEach(function (track) {
        track.stop();
      });

      media.stop();
      analyser.disconnect();
      source.disconnect();
    }
  };

  return (
    <>
      <button onClick={onRec ? onRecAudio : offRecAudio}>
        {onRec ? "녹음 시작" : "🔴 녹음 중지 및 평가"}
      </button>
    </>
  );
};

export default RecorderModule;
