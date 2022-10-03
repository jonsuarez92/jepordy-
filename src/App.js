import "./style.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Score from "./components/Score";
import Button from "./components/Button";


export default function App() {
  const [answer, setAnswer] = useState({})
  const [questionButton, setQuestionButton] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [score, setScore] = useState(0)
  const [num, setNum] = useState({})

  const url = "http://jservice.io/api/random"



  const decreaseScore = (what) => {
    setScore(score - what)
  }
  const increaseScore = (what) => {
    setScore(score + what)
  }
  const resetScore = () => {
    setScore(0)
    // if(score > 0){
    //    setScore(0)
    //   }
    //   else {
    //     setScore(0)
    //   } ;
  }
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url)
        // console.log(response)
        const data = await response.json()
        console.log(data)
        setAnswer(data)
        setNum(answer[0])
      } catch (err) {
        console.log(err)
      }
    })()
  }, [questionButton])


  const answerTog = () => {
    if (questionButton) {
      setQuestionButton(false)
    } else {
      setQuestionButton(true)
    }
  }
  const showTog = () => {
    setShowButton(!showButton)

  }

  return (
    <>
      <Header />
      <Button item={num} arrowBrackets={decreaseScore} />
      <main className="border">
        <Score score={score} />

        <div className="button-area">
          <button onClick={(e) => decreaseScore(answer[0].value)}>Decrease</button>
          <button onClick={(e) => increaseScore(answer[0].value)}>Increase</button>
          <button onClick={(e) => resetScore('reset')}>Reset</button>
        </div>
      </main>
      <p>Lets play</p>
      <button onClick={answerTog} className="AnsBtn">Random Question</button>
      <div>
        {Object.keys(answer).length ? (
          <div>
            <h2>Question: {answer[0].question}</h2>
          </div>
        ) :
          (
            ""
          )}
      </div>

      <button onClick={showTog} className="AnsBtn">Answer</button>

      {Object.keys(answer).length ? (
        showButton ? (
          <h1>Answer: {answer[0].answer}</h1>

        ) :
          (
            ""
          )) :
        (
          ""
        )
      }


    </>
  );
}