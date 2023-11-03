import { PersonalDeckTitle } from "../api/VocabListAPI/FlashcardsAPI"
import AddButton from "./VocabListComponents/AddButton"

interface MyWordCardProps {
  addNew: () => void
  props?: PersonalDeckTitle
  goTo: (id: number) => void
}
function MyWordCard({ addNew, goTo, props }: MyWordCardProps) {
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
  const { wordCount, name, id } = props

  return (
    <div
      className='card'
      style={{ width: "24rem", backgroundColor: "#82B7F3", marginRight: "20px", marginBottom: "20px", height: "230px" }}
      onClick={() => {
        goTo(id)
      }}
    >
      <div className='card-body'>
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
        <h3>ID:{id} {props.nickname!==null && props.nickname }</h3>
      </div>
    </div>
  )
}

export default MyWordCard
