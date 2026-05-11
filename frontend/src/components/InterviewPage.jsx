import { useState } from 'react'

function InterviewPage({ sessionData, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [evaluations, setEvaluations] = useState([])
  const [currentEval, setCurrentEval] = useState(null)

  const questions = sessionData.questions
  const questionIds = sessionData.questionIds
  const totalQuestions = questions.length

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return
    setLoading(true)

    try {
      const response = await fetch('https://prepai-31ob.onrender.com/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: questionIds[currentIndex],
          user_answer: answer
        })
      })
      const evaluation = await response.json()
      setCurrentEval(evaluation)
      setEvaluations([...evaluations, { question: questions[currentIndex], evaluation }])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      onFinish([...evaluations])
    } else {
      setCurrentIndex(currentIndex + 1)
      setAnswer('')
      setCurrentEval(null)
    }
  }

  return (
    <div className="page">
      <div className="card">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
        <p className="progress-text">Question {currentIndex + 1} of {totalQuestions}</p>

        <div className="question-box">
          <h2>{questions[currentIndex]}</h2>
        </div>

        {!currentEval ? (
          <>
            <div className="form-group">
              <label>Your Answer</label>
              <textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={6}
              />
            </div>
            <button
              className="btn-primary"
              onClick={handleSubmitAnswer}
              disabled={loading || !answer.trim()}
            >
              {loading ? 'Evaluating...' : 'Submit Answer'}
            </button>
          </>
        ) : (
          <div className="evaluation">
            <div className="score-circle">
              <span className="score-num">{currentEval.score}</span>
              <span className="score-denom">/10</span>
            </div>
            <div className="eval-section">
              <h3>Feedback</h3>
              <p>{currentEval.feedback}</p>
            </div>
            <div className="eval-section good">
              <h3>What was good</h3>
              <p>{currentEval.what_was_good}</p>
            </div>
            <div className="eval-section improve">
              <h3>What to improve</h3>
              <p>{currentEval.what_to_improve}</p>
            </div>
            <button className="btn-primary" onClick={handleNext}>
              {currentIndex + 1 >= totalQuestions ? 'See Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewPage