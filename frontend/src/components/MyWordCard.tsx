import { useNavigate } from "react-router-dom"
import { PersonalDeckTitle } from "../api/VocabListAPI/FlashcardsAPI"
import AddButton from "./VocabListComponents/AddButton"
import {FaStar} from "react-icons/fa"
interface MyWordCardProps {
  addNew: () => void
  props?: PersonalDeckTitle
  type: string
}
function MyWordCard({ addNew, props, type }: MyWordCardProps) {
  const navigate = useNavigate()

  if (!props) {
    return (
      <>
        <div
          className='card'
          style={{
            display: "flex",
            width: "24rem",
            backgroundColor: "#82B7F3",
            marginRight: "20px",
            marginBottom: "20px",
            height: "230px",
          }}
          onClick={addNew}
        >
          <div className='card-body' style={{ justifyContent: "center" }}>
            <AddButton handleButtonClick={addNew} size='50' />
          </div>
        </div>
      </>
    )
  }
  const { wordCount, name, id, forkCount, nickname } = props
  const handleNavigation = (id: number) => {
    navigate(`/flashcard/${id}`)
  }
  return (
    <div
      className='card'
      style={{ width: "24rem", backgroundColor: "#82B7F3", marginRight: "20px", marginBottom: "20px", height: "230px" }}
      onClick={() => {
        handleNavigation(id)
      }}
    >
      <div className='card-body' style={{display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2 className='card-title'>{name && props ? name : ""}</h2>
          </div>
          <div>
            <h3 className='card-subtitle mb-2 text-muted' style={{ textAlign: "right" }}>
              {wordCount}
            </h3>
          </div>
        </div>
        {type === "public" && (
          <>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <h3>{props.nickname !== null && props.nickname}</h3>
              <div>
                <FaStar color="gold" />{forkCount}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MyWordCard
