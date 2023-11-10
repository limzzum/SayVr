import spinner from '../../../assets/MatchingGamePageAssets/loading-spinner.png'
import "./style.css";


function Footer() {
  return (
    <div className='footer-container'>
   <div className="loading-spinner">
      <img src={spinner} alt="Loading..." />
    </div>
    <div className='loading-text'>Loading</div>
    </div>
 
  );
}

export default Footer;
