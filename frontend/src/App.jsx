import { useState } from 'react'
import LandingPage from './components/LandingPage'
import HomePage from './components/HomePage'
import InterviewPage from './components/InterviewPage'
import ResultsPage from './components/ResultsPage'
import './App.css'

function App() {
  const [page, setPage] = useState('landing')
  const [sessionData, setSessionData] = useState(null)
  const [results, setResults] = useState(null)

  return (
    <div className="app">
      {page === 'landing' && (
        <LandingPage onGetStarted={() => setPage('home')} />
      )}
      {page === 'home' && (
        <HomePage
          onStart={(data) => {
            setSessionData(data)
            setPage('interview')
          }}
        />
      )}
      {page === 'interview' && (
        <InterviewPage
          sessionData={sessionData}
          onFinish={(res) => {
            setResults(res)
            setPage('results')
          }}
        />
      )}
      {page === 'results' && (
        <ResultsPage
          results={results}
          onRestart={() => setPage('landing')}
        />
      )}
    </div>
  )
}

export default App