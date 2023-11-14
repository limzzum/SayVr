import { useEffect, useState } from "react";
import { WordcardDto, WordcardStatus, getTodaySentence } from "../../api/VocabListAPI/FlashcardsAPI";
import MainPageImg from "../../assets/MainPageAssets/MainPageImage.jpg";
import "./style.css";

function MainPage() {
const [today,setToday]= useState<WordcardDto>({id:0,kor:"천천히 준비하세요",eng:"Take your time, please",wordcardStatus:WordcardStatus.UNCHECKED});
  useEffect(() => {
    
    getTodaySentence().then((res)=>{
      if(res.data.data.errorMessage){
        console.log("오늘의 문장을 가져오지 못했습니다")
        console.log(res.data.data.errorMessage);
      }
      const response:WordcardDto= res.data.data.wordcard;
      setToday(response);
    })
  
  }, [])
  
    return (
      <div>
        <img src={MainPageImg} alt="VrImg" style={{ width: '100vw', height: '75vh', objectFit: 'cover' }}/>
        <p className="englishword">{today.eng}</p>
        <p className="koreanword">{today.kor}</p>
      </div>
    );
  }
  
  export default MainPage;