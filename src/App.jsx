import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "modern-normalize";
import Feedback from './Feedback';
import Options from './Options';
import Notification from './Notification';
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
      <h1>Sip Happens Café</h1>
      <p>Please leave your feedback about our service by selecting one of the options below.</p>
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
