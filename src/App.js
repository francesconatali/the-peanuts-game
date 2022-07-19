import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { Box } from './Box.js'
import { Recipient } from './Recipient.js'
import { ItemTypes } from './ItemTypes.js'
import "./App.css";
// images used in the app
import imgSnoopy from './images/snoopy.png';
import imgWoodstock from './images/woodstock.png';
import imgCharlieBrown from './images/charliebrown.png';
import imgLucy from './images/lucy.png';
import imgLinus from './images/linus.png';
import imgPeppermintPatty from './images/peppermintpatty.png';
import imgSallyBrown from './images/sallybrown.png';
import imgFranklin from './images/franklin.png';
import imgSchroeder from './images/schroeder.png';
import imgPigPen from './images/pigpen.png';
import imgMarcie from './images/marcie.png';

export const App = memo(function App() {
  // total number of recipients on the screen
  const numRecipients = 8;
  // shuffle recipients and get the first 8 (numRecipients)
  const [recipients, setRecipients] = useState(shuffleArray([
    { accepts: [ItemTypes.Snoopy], lastDroppedItem: null },
    { accepts: [ItemTypes.Woodstock], lastDroppedItem: null },
    { accepts: [ItemTypes.CharlieBrown], lastDroppedItem: null },
    { accepts: [ItemTypes.Lucy], lastDroppedItem: null },
    { accepts: [ItemTypes.Linus], lastDroppedItem: null },
    { accepts: [ItemTypes.PeppermintPatty], lastDroppedItem: null },
    { accepts: [ItemTypes.SallyBrown], lastDroppedItem: null },
    { accepts: [ItemTypes.Franklin], lastDroppedItem: null },
    { accepts: [ItemTypes.Schroeder], lastDroppedItem: null },
    { accepts: [ItemTypes.PigPen], lastDroppedItem: null },
    { accepts: [ItemTypes.Marcie], lastDroppedItem: null }
  ]).slice(0, numRecipients))
  // boxes/draggable items
  const [boxes] = useState([
    { name: 'Snoopy', type: ItemTypes.Snoopy, image: imgSnoopy  },
    { name: 'Woodstock', type: ItemTypes.Woodstock, image: imgWoodstock },
    { name: 'CharlieBrown', type: ItemTypes.CharlieBrown, image: imgCharlieBrown  },
    { name: 'Lucy', type: ItemTypes.Lucy, image: imgLucy  },
    { name: 'Linus', type: ItemTypes.Linus, image: imgLinus  },
    { name: 'PeppermintPatty', type: ItemTypes.PeppermintPatty, image: imgPeppermintPatty  },
    { name: 'SallyBrown', type: ItemTypes.SallyBrown, image: imgSallyBrown  },
    { name: 'Franklin', type: ItemTypes.Franklin, image: imgFranklin  },
    { name: 'Schroeder', type: ItemTypes.Schroeder, image: imgSchroeder  },
    { name: 'Pig-Pen', type: ItemTypes.PigPen, image: imgPigPen  },
    { name: 'Marcie', type: ItemTypes.Marcie, image: imgMarcie  }
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      )
      setRecipients(
        update(recipients, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, recipients],
  )
  return (
    <>
      <div id="title">
        <h1 className="h1 text-gradient">The Peanuts<br/>Game</h1>
      </div>
      <div className="container">
        {
        // map recipients
        recipients.map(({ accepts, lastDroppedItem }, index) => (
          <Recipient
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            numDroppedBoxes={droppedBoxNames.length}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
            numRecipients={numRecipients}
          />
        ))}
      </div>

      {
      // map boxes, but only the ones that accept the item type of the recipient
      boxes.filter(({ type }) => recipients.some(({ accepts }) => accepts.includes(type))).map(({ name, type, image }, index) => (
        <Box
          name={name}
          type={type}
          image={image}
          isDropped={isDropped(name)}
          key={index}
        />
      ))}

      <footer>
        by <a target="_blank" rel="noreferrer" href="https://francesconatali.com/">Francesco Natali</a>
      </footer>
    </>
  )
})

export default App;
