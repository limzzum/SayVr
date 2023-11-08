import spinner from '../../../assets/MatchingGamePageAssets/loading-spinner.png'

function GameProceedingFooter() {
  return (
    <div className='footer-container'>
   <div className="loading-spinner">
      <img src={spinner} alt="Loading..." />
    </div>
    <div className='loading-text'>Loading</div>
    </div>
 
  );
}

export default GameProceedingFooter;
