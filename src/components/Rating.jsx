import React from 'react'

const Rating = ({ onRatingSubmit, isVisible }) => {
  const ratings = [
    { value: 1, emoji: '😢' },
    { value: 2, emoji: '😕' },
    { value: 3, emoji: '😐' },
    { value: 4, emoji: '🙂' },
    { value: 5, emoji: '😊' }
  ]

  if (!isVisible) return null

  return (
    <div className="rating-container">
      <h3>How was your focus during this session?</h3>
      <div className="rating-options">
        {ratings.map(({ value, emoji }) => (
          <button
            key={value}
            className="rating-button"
            onClick={() => onRatingSubmit(value)}
          >
            <span className="emoji">{emoji}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Rating 