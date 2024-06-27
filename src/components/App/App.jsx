import { useEffect, useState } from 'react'
import './App.css'
import "modern-normalize";
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import Notification from '../Notification/Notification';
import Description from '../Description/Description';
/*import LoginForm from '../LoginForm/LoginForm';*/
function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("saved-feedbacks");
    return savedFeedback ?
    JSON.parse(savedFeedback) : 
    { good: 0, neutral: 0, bad: 0 };
  });
  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1
    }));
  }
  const resetFeedback = () => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      good: 0,
      bad: 0,
      neutral:0
    }));
  }
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  useEffect(() => {
    localStorage.setItem("saved-feedbacks", JSON.stringify(feedback));
  }, [feedback]);

  return (
    <>
      <Description/>
      <Options
        update={updateFeedback}
        totalFeedback={totalFeedback}
        reset={resetFeedback} />
      {totalFeedback === 0 ?
        <Notification /> :
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback} />
      }
      
    </>
      
      )
    
}

export default App;
