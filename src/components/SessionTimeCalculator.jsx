import React from 'react'

const SessionTimeCalculator = ({ ratings }) => {
  const calculateNewTimes = () => {
    if (!ratings.length) return { workTime: 25, breakTime: 5 }

    const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    
    // Adjust work time based on average rating
    let workTime = 25 // default 25 minutes
    if (averageRating >= 4) {
      workTime = 30 // increase by 5 minutes for good ratings
    } else if (averageRating <= 2) {
      workTime = 20 // decrease by 5 minutes for poor ratings
    }

    // Adjust break time based on average rating
    let breakTime = 5 // default 5 minutes
    if (averageRating >= 4) {
      breakTime = 7 // longer break for good performance
    } else if (averageRating <= 2) {
      breakTime = 8 // even longer break for poor performance
    }

    return { workTime, breakTime }
  }

  const { workTime, breakTime } = calculateNewTimes()

  return (
    <div className="session-time-calculator">
      <h3>Recommended Session Times</h3>
      <div className="time-display">
        <div className="time-block">
          <span className="time-label">Work Time:</span>
          <span className="time-value">{workTime} minutes</span>
        </div>
        <div className="time-block">
          <span className="time-label">Break Time:</span>
          <span className="time-value">{breakTime} minutes</span>
        </div>
      </div>
    </div>
  )
}

export default SessionTimeCalculator 