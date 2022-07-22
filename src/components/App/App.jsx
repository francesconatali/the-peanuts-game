import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { Box } from '../Box'
import { Recipient } from '../Recipient'
import CHARACTERS from "../../constants/Config";
import "../../assets/styles/App.css";

export const App = memo(function App() {
  // total number of recipients on the screen
  const numRecipients = 8;
  // shuffle all the recipients and get the first 8 (numRecipients)
  const [recipients, setRecipients] = useState(shuffleArray([
    ...Object.keys(CHARACTERS).map(key => ({
      accepts: key,
      lastDroppedItem: null
    })),
  ]).slice(0, numRecipients));
  // boxes/draggable items
  const [boxes] = useState([
    // get all the characters
    ...Object.keys(CHARACTERS).map(key => ({
      name: CHARACTERS[key].name,
      type: key,
      image: CHARACTERS[key].image
    }))
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
        <h1 className="h1 text-gradient">The Peanuts Game</h1>
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
