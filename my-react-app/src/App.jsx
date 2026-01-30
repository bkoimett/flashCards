import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cards, setCards] = useState([
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
    { id: 2, question: "What is JSX?", answer: "JavaScript XML - syntax extension for JavaScript" },
    { id: 3, question: "What is Vite?", answer: "A fast build tool and development server" },
    { id: 4, question: "What is useState?", answer: "A React Hook for managing state in functional components" },
    { id: 5, question: "What is useEffect?", answer: "A React Hook for performing side effects" }
  ])
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [newCard, setNewCard] = useState({ question: '', answer: '' })

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleAddCard = () => {
    if (newCard.question.trim() && newCard.answer.trim()) {
      const newCardObj = {
        id: cards.length + 1,
        question: newCard.question,
        answer: newCard.answer
      }
      setCards([...cards, newCardObj])
      setNewCard({ question: '', answer: '' })
    }
  }

  const handleDeleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id))
    if (currentIndex >= cards.length - 1) {
      setCurrentIndex(Math.max(0, cards.length - 2))
    }
  }

  return (
    <div className="app">
      <header>
        <h1>📚 Flashcard Stack</h1>
        <p>Cards: {cards.length} | Current: {currentIndex + 1}/{cards.length}</p>
      </header>

      <main>
        <div className="flashcard-container">
          <div 
            className={`flashcard ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            <div className="flashcard-front">
              <h2>Question</h2>
              <p>{cards[currentIndex]?.question}</p>
              <small>Click to flip</small>
            </div>
            <div className="flashcard-back">
              <h2>Answer</h2>
              <p>{cards[currentIndex]?.answer}</p>
              <small>Click to flip back</small>
            </div>
          </div>

          <div className="controls">
            <button onClick={handlePrev} disabled={cards.length <= 1}>← Previous</button>
            <button onClick={handleFlip}>
              {isFlipped ? 'Show Question' : 'Show Answer'}
            </button>
            <button onClick={handleNext} disabled={cards.length <= 1}>Next →</button>
          </div>

          <button 
            className="delete-btn"
            onClick={() => handleDeleteCard(cards[currentIndex]?.id)}
            disabled={cards.length === 0}
          >
            Delete Current Card
          </button>
        </div>

        <div className="add-card">
          <h3>Add New Card</h3>
          <input
            type="text"
            placeholder="Enter question..."
            value={newCard.question}
            onChange={(e) => setNewCard({...newCard, question: e.target.value})}
          />
          <textarea
            placeholder="Enter answer..."
            value={newCard.answer}
            onChange={(e) => setNewCard({...newCard, answer: e.target.value})}
            rows="3"
          />
          <button onClick={handleAddCard}>Add Card</button>
        </div>

        <div className="card-list">
          <h3>All Cards ({cards.length})</h3>
          {cards.length === 0 ? (
            <p className="empty-message">No cards yet. Add your first card above!</p>
          ) : (
            <ul>
              {cards.map((card, index) => (
                <li 
                  key={card.id}
                  className={index === currentIndex ? 'active' : ''}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsFlipped(false)
                  }}
                >
                  <span className="card-number">{index + 1}.</span>
                  <span className="card-question">{card.question}</span>
                  <button 
                    className="list-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteCard(card.id)
                    }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer>
        <p>Use ← → buttons to navigate | Click card to flip | Add your own cards!</p>
      </footer>
    </div>
  )
}

export default App