import { useState, useEffect } from 'react'
import './App.css'
import Rating from './components/Rating'
import SessionTimeCalculator from './components/SessionTimeCalculator'

function App() {
  const [task, setTask] = useState('')
  const [studyHours, setStudyHours] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0.1 * 60) // 25 minutes in seconds
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState([])
  const [currentSession, setCurrentSession] = useState(1)
  const [showRating, setShowRating] = useState(false)
  const [ratings, setRatings] = useState([])
  const [workTime, setWorkTime] = useState(0.1)
  const [breakTime, setBreakTime] = useState(0.1)

  // Calculate total sessions based on study hours
  const totalSessions = Math.ceil(studyHours * 2) 
  
  useEffect(() => {
    let timer
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      if (!isBreak) {
        // Work session completed
        setSessions((prev) => [...prev, { type: 'work', session: currentSession }])
        setTimeLeft(breakTime * 60)
        setIsBreak(true)
        setShowRating(true)
      } else {
        // Break completed
        setSessions((prev) => [...prev, { type: 'break', session: currentSession }])
        setTimeLeft(workTime * 60)
        setIsBreak(false)
        setCurrentSession((prev) => prev + 1)
      }
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft, isBreak, currentSession, workTime, breakTime])

  const handleStart = () => {
    if (!task) return
    setIsRunning(true)
    setSessions([])
    setCurrentSession(1)
    setRatings([])
    setTimeLeft(workTime * 60)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(workTime * 60)
    setIsBreak(false)
    setSessions([])
    setCurrentSession(1)
    setRatings([])
  }

  const handleRatingSubmit = (rating) => {
    setRatings((prev) => [...prev, rating])
    setShowRating(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="app">
      <h1>Focus Timer</h1>
      
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          disabled={isRunning}
        />
        <input
          type="number"
          min="1"
          max="12"
          value={studyHours}
          onChange={(e) => setStudyHours(Number(e.target.value))}
          disabled={isRunning}
        />
        <button onClick={handleStart} disabled={isRunning || !task}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="timer-section">
        <h2>{isBreak ? 'Break Time' : 'Work Time'}</h2>
        <div className="timer">{formatTime(timeLeft)}</div>
        <div className="session-info">
          Session {currentSession} of {totalSessions}
        </div>
      </div>

      <Rating onRatingSubmit={handleRatingSubmit} isVisible={showRating} />
      
      <SessionTimeCalculator ratings={ratings} />

      <div className="sessions-section">
        <h3>Completed Sessions</h3>
        <div className="sessions-list">
          {sessions.map((session, index) => (
            <div key={index} className={`session-item ${session.type}`}>
              {session.type === 'work' ? 'Work' : 'Break'} Session {session.session}
              {session.type === 'work' && ratings[index] && (
                <span className="session-rating">
                  Rating: {['😢', '😕', '😐', '🙂', '😊'][ratings[index] - 1]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
