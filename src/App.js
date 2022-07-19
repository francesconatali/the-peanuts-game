import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { Box } from './Box.js'
import { Recipient } from './Recipient.js'
import { ItemTypes } from './ItemTypes.js'
import "./App.css";
// the five images used in the app
import imgSnoopy from './images/snoopy.png';
import imgWoodstock from './images/woodstock.png';
import imgCharlieBrown from './images/charliebrown.png';
import imgLucy from './images/lucy.png';
import imgLinus from './images/linus.png';
import imgPeppermintPatty from './images/peppermintpatty.png';
import imgSallyBrown from './images/sallybrown.png';
import imgFranklin from './images/franklin.png';

export const App = memo(function App() {
  // recipients
  const [recipients, setRecipients] = useState([
    { accepts: [ItemTypes.Snoopy], lastDroppedItem: null },
    { accepts: [ItemTypes.Woodstock], lastDroppedItem: null },
    { accepts: [ItemTypes.CharlieBrown], lastDroppedItem: null },
    { accepts: [ItemTypes.Lucy], lastDroppedItem: null },
    { accepts: [ItemTypes.Linus], lastDroppedItem: null },
    { accepts: [ItemTypes.PeppermintPatty], lastDroppedItem: null },
    { accepts: [ItemTypes.SallyBrown], lastDroppedItem: null },
    { accepts: [ItemTypes.Franklin], lastDroppedItem: null }
  ])
  // boxes/draggable items
  const [boxes] = useState([
    { name: 'Snoopy', type: ItemTypes.Snoopy, image: imgSnoopy  },
    { name: 'Woodstock', type: ItemTypes.Woodstock, image: imgWoodstock },
    { name: 'CharlieBrown', type: ItemTypes.CharlieBrown, image: imgCharlieBrown  },
    { name: 'Lucy', type: ItemTypes.Lucy, image: imgLucy  },
    { name: 'Linus', type: ItemTypes.Linus, image: imgLinus  },
    { name: 'PeppermintPatty', type: ItemTypes.PeppermintPatty, image: imgPeppermintPatty  },
    { name: 'SallyBrown', type: ItemTypes.SallyBrown, image: imgSallyBrown  },
    { name: 'Franklin', type: ItemTypes.Franklin, image: imgFranklin  }
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
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
        {recipients.map(({ accepts, lastDroppedItem }, index) => (
          <Recipient
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            numDroppedBoxes={droppedBoxNames.length}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      {boxes.map(({ name, type, image }, index) => (
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
