import "./HowItWorks.css";
import runningLate from "../images/runningLate.jpg";

const HowItWorks = () => (
  <div className="container-image-and-info">
    <div><img src={runningLate} alt="Car On Road"/></div>
    <div className="info">
      <p>It’s simple. Enter the address of your starting location, your destination, what time you need to be there by, and how many minutes early you’d like to be. We’ll take care of the rest.</p>
    </div>
  </div>
);   

export {
    HowItWorks
}