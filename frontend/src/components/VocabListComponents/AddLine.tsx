import { FC, useEffect, useRef, useState } from "react"
import { Form } from "react-bootstrap"
import { MdSync } from "react-icons/md"
import { getTranslation } from "../../api/VocabListAPI/FlashcardsAPI"
import { TranslationRequestDto } from "../../api/VocabListAPI/PapagoAPI"
import { CreateWordcardRequestDto } from "../../pages/VocabListPage/DeckDetailPage"
import "../../pages/VocabListPage/style.css"
import IconButton from "./IconButton"
import AddIcon from "./Icons/AddIcon"

interface AddLineProps {
  addWord: (wordForm: CreateWordcardRequestDto) => void
}

export const AddLine: FC<AddLineProps> = ({ addWord }) => {
  const [autoE, setAutoE] = useState(false)
  const [autoK, setAutoK] = useState(false)

  const [enOptions, setEnOptions] = useState<string[]>([])
  const [koOptions, setKoOptions] = useState<string[]>([])

  const [wordForm, setWordForm] = useState<CreateWordcardRequestDto>({
    kor: "",
    eng: "",
  })
  const [koForm, setKoForm] = useState("")
  const [enForm, setEnForm] = useState("")

  const [trText, setTrText] = useState("예시")
  const [test, setTest] = useState("예시")

  const [trENGForm, setTrENGForm] = useState<TranslationRequestDto>({
    source: "ko",
    target: "en",
    text: trText || "없음",
  })
  const [trKORForm, setTrKORForm] = useState<TranslationRequestDto>({
    source: "en",
    target: "ko",
    text: trText || "없음",
  })
  const engInput = useRef<HTMLInputElement | null>(null)
  const korInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // After the component is mounted, update the ref
    engInput.current = document.getElementById("engInput") as HTMLInputElement
    korInput.current = document.getElementById("korInput") as HTMLInputElement
  }, [])

  useEffect(() => {
    // if (koForm === "") {
    setTrKORForm((prev) => ({ ...prev, text: enForm }))
    // }
  }, [enForm])
  useEffect(() => {
    // if (enForm === "") {
    setTrENGForm((prev) => ({ ...prev, text: koForm }))
    // }
  }, [koForm])
  useEffect(() => {
    setWordForm({
      kor: koForm,
      eng: enForm,
    })
  }, [enForm, koForm])

  // useEffect(() => {
  //   // Watch for changes in autoE and autoK and focus accordingly
  //   if (autoK) {
  //     korInput?.current?.focus()
  //   } else if (autoE) {
  //     engInput?.current?.focus()
  //   }
  // }, [autoE, autoK])
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name === "eng") {
      setWordForm((prevData) => ({
        ...prevData,
        eng: value,
      }))
      setEnForm(value)
    } else if (name === "kor") {
      setWordForm((prevData) => ({
        ...prevData,
        kor: value,
      }))
      setKoForm(value)
    }
  }

  const handleAuto = (targetLang: string) => {
    // console.log(trENGForm)
    if (targetLang === "ko") {
      if(enForm===""){
        alert("단어를 먼저 입력해야합니다")
        return;
      }
      setAutoK(true)
      getTranslation(trKORForm)
        .then((res) => {
          let result = res.data.data.result
          let list = res.data.data.wordList
          setKoOptions(list)
          console.log(result)
          setTest(result)
          setKoForm(result)
          korInput?.current?.focus()
        })
        .then(() => {

        })
    } else if (targetLang === "en") {
      if(koForm===""){
        alert("단어를 먼저 입력해야합니다")
        return;
      }
      setAutoE(true)
      console.log(trENGForm)
      getTranslation(trENGForm)
        .then((res) => {
          let result = res.data.data.result
          let list = res.data.data.wordList
          setEnOptions(list)
          console.log(result)
          setTest(result)
          setEnForm(result)
          engInput?.current?.focus()
        })
        .then(() => {
  
        })
        .catch((e) => console.log(e))
    }
  }
  return (
    <>
      <div className='row'>
        <div className='col-11'>
          <Form>
            <Form.Group className='mb-3' controlId='eng'>
              <Form.Label>
                영문 <IconButton icon={<MdSync />} size={20} onHover={false} handleButtonClick={() => handleAuto("ko")} /> 한글 번역 | 추천:{" "}
                {enOptions.slice().join(", ")}
              </Form.Label>
              <Form.Control type='text' placeholder='Enter' ref={engInput} name='eng' onChange={handleInputChange} value={wordForm.eng} />
            </Form.Group>{" "}
            <Form.Group className='mb-3' controlId='kor'>
              <Form.Label>
                한글 <IconButton icon={<MdSync />} size={20} onHover={false} handleButtonClick={() => handleAuto("en")} /> 영문 번역 | 추천:{" "}
                {koOptions.slice().join(", ")}
              </Form.Label>
              <Form.Control type='text' placeholder='입력' ref={korInput} name='kor' onChange={handleInputChange} value={wordForm.kor} />
            </Form.Group>
          </Form>
        </div>
        <div
          className='col-1'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onHover
            icon={<AddIcon />}
            size={45}
            handleButtonClick={() => {
              addWord(wordForm)
              setTest("")
              setEnForm("")
              setKoForm("")
            }}
          />
        </div>
      </div>
    </>
  )
}
