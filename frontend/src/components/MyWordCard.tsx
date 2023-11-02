import { PersonalDeckTitle } from "../api/VocabListAPI/FlashcardsAPI"

function MyWordCard(props: PersonalDeckTitle) {
  const { wordCount, name } = props

  return (
    <div
      className='card'
      style={{ width: "24rem", backgroundColor: "#82B7F3", marginRight: "20px", marginBottom: "20px", height: "230px" }}
    >
      <div className='card-body'>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h5 className='card-title'>{name && props ? name : ""}</h5>
          </div>
          <div>
            <h6 className='card-subtitle mb-2 text-muted' style={{ textAlign: "right" }}>
              {wordCount}
            </h6>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MyWordCard
