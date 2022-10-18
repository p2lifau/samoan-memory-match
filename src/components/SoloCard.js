import './SoloCard.css'
import React from 'react'

export default function SoloCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
      if(!disabled){
        handleChoice(card)
      }
      
    }

  return (
    <div className="card">
        <div className= {flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="card front"/>
          <img 
          className="back"
          src='/img/fine-mat-bg.png' 
          onClick={handleClick} 
          alt='card back'/>
        </div>
      </div>
  )
}
