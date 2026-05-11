function ResultsPage({ results, onRestart }) {
  const avgScore = results.length > 0
    ? (results.reduce((sum, r) => sum + r.evaluation.score, 0) / results.length).toFixed(1)
    : 0

  const getScoreColor = (score) => {
    if (score >= 8) return '#1D9E75'
    if (score >= 6) return '#BA7517'
    return '#D85A30'
  }

  const getScoreMessage = (score) => {
    if (score >= 8) return 'Excellent performance! You are interview ready.'
    if (score >= 6) return 'Good effort. A bit more practice and you will nail it.'
    return 'Keep practicing. Every attempt makes you stronger.'
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Interview Complete</h1>

        <div className="final-score" style={{ borderColor: getScoreColor(avgScore) }}>
          <div className="final-score-num" style={{ color: getScoreColor(avgScore) }}>
            {avgScore}
          </div>
          <div className="final-score-label">Average Score</div>
          <p className="score-message">{getScoreMessage(avgScore)}</p>
        </div>

        <div className="results-list">
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <div className="result-header">
                <span className="result-q">Q{index + 1}</span>
                <span
                  className="result-score"
                  style={{ color: getScoreColor(result.evaluation.score) }}
                >
                  {result.evaluation.score}/10
                </span>
              </div>
              <p className="result-question">{result.question}</p>
              <p className="result-feedback">{result.evaluation.feedback}</p>
              <div className="result-tags">
                <span className="tag-good">✓ {result.evaluation.what_was_good}</span>
                <span className="tag-improve">↑ {result.evaluation.what_to_improve}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary" onClick={onRestart}>
          Start New Interview
        </button>
      </div>
    </div>
  )
}

export default ResultsPage