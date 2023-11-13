import React from "react";
import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import SoundIcon from "./Icons/SoundIcon";
import Speech from "speak-tts";

interface Props {
  word: string;
}

const Speak: React.FC<Props> = ({ word }) => {
  const [text, setText] = useState(word);

  const [voice, setVoice] = useState();
//TODO 음성 제공 아예 안 될때 예외처리 !!
  //   useEffect(() => {

  //   }, [speech]);
  const textToSpeech = (word: string) => {
    const speech = new Speech();
    speech.init().then((data: any) => {
      console.log(data);
      setVoice(data.voices.length>2?data.voices[2].name:data.voices[0].name);
      speech.setVoice(data.voices.length>2?data.voices[2].name:data.voices[0].name);
      speech.speak({
        text:text,
        queue:false,
    })
    });
  };
  return (
    <>
      {/* <h1>{text}</h1> */}
      <IconButton
        icon={<SoundIcon />}
        size={37}
        handleButtonClick={() => textToSpeech(word)}
      />
    </>
  );
};

export default Speak;
