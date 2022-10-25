import { useState } from 'react';

// styles
import './Instructions.css'

export default function Instructions() {
    const [showRules, setShowRules] = useState(false);

    const toggleRules = () => {
        setShowRules(!showRules);
    }
  return (
    <div className='rules-container'>
        <ul style={{display: showRules ? 'block' : 'none'}}>
            <li>1. Click on cards until all are matched</li>
            <li>2. Click 'New Game' to reset cards</li>
        </ul>
        <button onClick={toggleRules}>Toggle Rules</button>
    </div>
  )
}
