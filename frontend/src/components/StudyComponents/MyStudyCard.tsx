import { useNavigate } from "react-router-dom"
import { StudyInfoDto } from "../../api/StudyPageAPI/StudyAPI"
import AddButton from "./AddButton"

interface StudyCardProps {
  addNew: () => void
  props?: StudyInfoDto
}
function MyStudyCard({ addNew, props }: StudyCardProps) {
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
  const { maxPeople, currentPeople, name, studyId } = props
  const handleNavigation = (id: number) => {
    navigate(`/study/${id}`)
  }
  return (
    <div
      className='card'
      style={{ width: "24rem", backgroundColor: "#82B7F3", marginRight: "20px", marginBottom: "20px", height: "230px" }}
      onClick={() => {
        handleNavigation(studyId)
      }}
    >
      <div className='card-body'>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2 className='card-title'>{name && props ? name : ""}</h2>
          </div>
          <div>
            <h3 className='card-subtitle mb-2 text-muted' style={{ textAlign: "right" }}>
              {currentPeople}/{maxPeople}
            </h3>
          </div>
        </div>
        <h3>ID:{studyId}</h3>
      </div>
    </div>
  )
}

export default MyStudyCard
