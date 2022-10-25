import { useState, useEffect} from 'react';
import './App.css';
import Instructions from './components/Instructions';
import SoloCard from './components/SoloCard';

// 6 different cards with src to picture
const cardPics = [
  {"src": "/img/falesand-2.jpg" , matched: false},
  {"src": "/img/taupou.jpg" , matched: false},
  {"src": "/img/manaia.jpg" , matched: false},
  {"src": "/img/sandula.jpg" , matched: false},
  {"src": "/img/siva-afi.jpg" , matched: false},
  {"src": "/img/samoa-map.png" , matched: false}
]
function App() {
  const [cards, setCards] = useState([])
  // how many trys a user takes to complete the game
  const [trys, setTrys] = useState(0)
  const [choiceUno, setChoiceUno] = useState(null)
  const [choiceDos, setChoiceDos] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    // duplicate the arrays using spread operator, total of 12 (2 of each pics)
    const shuffledCards = [...cardPics, ...cardPics]
      // fire a function for each item in the array to see if they match
        .sort(() => Math.random() - 0.5)
      // add on an id property to each item
        .map((card) => ({ ...card, id: Math.random() }))

        setChoiceUno(null)
        setChoiceDos(null)
        setCards(shuffledCards)
        setTrys(0)
  }

  // compare 2 selected cards
  useEffect (() => {
    
    if(choiceUno && choiceDos){
      setDisabled(true)
      // if the cards === then we have a match
      if(choiceUno.src === choiceDos.src){
        // we take the prev cards state to update the state
        setCards(prevCards => {
        // returning a new array of cards using map, retrys a new array based on the attached array
          return prevCards.map(card => {
            // if they match
            if(card.src === choiceUno.src){
            // return matched to be true, default is false
              return {...card, matched: true}
            } else {
            // if false, return card object unchanged
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceUno, choiceDos])

  console.log(cards)

  const resetTurn = () => {
    setChoiceUno(null)
    setChoiceDos(null)
    setTrys(prevtrys => prevtrys + 1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])
   

  // handle a choice
  const handleChoice = (card) => {
    // if choice1 is true 
    choiceUno ? setChoiceDos(card) : setChoiceUno(card)
  }
  return (
    <div className="App">
      <h2>Pacific Islander 🌴 Culture Match</h2>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
    {cards.map(card => (
      // add card prop to access the card obj in single card comp
      <SoloCard 
      key = {card.id} 
      card={card}
      handleChoice = {handleChoice}
      flipped = {card === choiceUno || card === choiceDos || card.matched}
      disabled = {disabled}
      />
    ))}
  </div>
  <p>Trys: {trys} </p>
  <Instructions />
    </div>
    
  );
}

export default App;
