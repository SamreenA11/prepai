import { useState } from 'react'

function HomePage({ onStart }) {
  const [jobRole, setJobRole] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleStart = async () => {
    if (!jobRole.trim() || !jobDescription.trim()) {
      setError('Please fill in both fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_role: jobRole, job_description: jobDescription })
      })
      const data = await response.json()
      onStart({
        sessionId: data.session_id,
        questions: data.questions,
        questionIds: data.question_ids
      })
    } catch (err) {
      setError('Could not connect to server. Make sure Flask is running.')
    }
    setLoading(false)
  }

  return (
    <div className="page">
      <div className="card">
        <h1>PrepAI</h1>
        <p className="subtitle">AI-powered mock interviews tailored to your job description</p>

        <div className="form-group">
          <label>Job Role</label>
          <input
            type="text"
            placeholder="e.g. Software Development Engineer at Google"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button
          className="btn-primary"
          onClick={handleStart}
          disabled={loading}
        >
          {loading ? 'Generating questions...' : 'Start Mock Interview'}
        </button>
      </div>
    </div>
  )
}

export default HomePage