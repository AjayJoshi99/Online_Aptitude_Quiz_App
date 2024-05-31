import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import data from './ExamData.json';
import './style.css';
import Timer from './Timer';

function Exam( props) {
  const { num } = useParams();
  const [showResults, setShowResults] = useState(false);
  var [totalMarks, setTotalMarks] = useState(0);
  var answerObj = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: "" };
  const [ userAnswer, setUserAnswer] = useState(answerObj);
  const x = useNavigate();
 const login = props.prop
 const obj = data.find(exam => exam.e === num);
 
  const checkAnswer = (ipt, ans, ind) => {
    userAnswer[ind] = ipt;
    setUserAnswer(userAnswer);
    if (ipt === ans) {
      setTotalMarks(totalMarks => totalMarks + 1)
    }
  }

  const handleTimeUp = () => {
    setShowResults(true);
  };
  return (
    <div>
      { !login ? (x('Login')) :
      !showResults? (
        <>
          <Timer onTimeUp={handleTimeUp} />
          {
            obj.Question.map((que, index) => {
              return (
                <div className="card border rounded m-3 p-2 shadow-lg" key={index}>
                  <div className="card-body ">
                    <p className="card-text">Question {index + 1} : {que[0]}</p>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name={`answer-${index + 1}`} id={`option1-${index + 1}`} value="A" onChange={(e) => checkAnswer(que[1], que[5], index + 1)} />
                      <label className="form-check-label" htmlFor={`option1-${index + 1}`}>
                        {que[1]}
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name={`answer-${index + 1}`} id={`option1-${index + 1}`} value="B" onChange={(e) => checkAnswer(que[2], que[5], index + 1)} />
                      <label className="form-check-label" htmlFor="option2">
                        {que[2]}
                      </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" name={`answer-${index + 1}`} id={`option1-${index + 1}`} value="C" onChange={(e) => checkAnswer(que[3], que[5], index + 1)} />
                      <label className="form-check-label" htmlFor="option3">
                        {que[3]}
                      </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" name={`answer-${index + 1}`} id={`option1-${index + 1}`} value="D" onChange={(e) => checkAnswer(que[4], que[5], index + 1)} />
                      <label className="form-check-label" htmlFor="option4">
                        {que[4]}
                      </label>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <button onClick={handleTimeUp} className='btn btn-success rounded'>Submit</button>
        </>
        
      ) : (
        <div className=''>
          <div className='text-center'>
          <h2 className='mx-auto'>Quiz Results</h2>
          <h3>Total Marks : {totalMarks}</h3>
          </div>
          {
            obj.Question.map((que,index)=>{
            return(
              <div className="card border rounded m-3 p-2 shadow-lg" key={index}>
                { userAnswer[index+1]===que[5]? <h3 style={{color:'green'}}>Correct</h3>: <h3 style={{color:"red"}}>Incorrect</h3>}
              <p className="card-text"><span className='h5'>Question {index + 1} :  </span>{que[0]}</p>
              <div>
              <div>A.  {que[1]}</div>
              <div>B.  {que[2]}</div>
              <div>C.  {que[3]}</div>
              <div>D.  {que[4]}</div>
              </div>
              <div>Your Answer  : {userAnswer[index+1]}</div>
              <div>Correct Aswer : {que[5]}</div>
              </div>
              )
            })
          }
        </div>
        )}
        
    </div>
  )
}

export default Exam;