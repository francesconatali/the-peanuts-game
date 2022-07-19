import { memo } from 'react'
import { useDrop } from 'react-dnd'
import Confetti from 'react-confetti';
import "./Recipient.css";
export const Recipient = memo(function Recipient({
  accept,
  lastDroppedItem,
  numDroppedBoxes,
  onDrop,
  numRecipients
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = isOver && canDrop
  let backgroundColor = 'rgb(43 43 43 / 60%)'
  if (isActive) {
    backgroundColor = 'rgb(167 123 243 / 80%)'
  }
  return (
    <div ref={drop} className="recipient" style={{ backgroundColor }} data-testid="recipient">
      {/* when the image is not yet been dropped */}
      {!lastDroppedItem &&
      (isActive
        ? 'Release to drop'
        : `${accept}`)
      }
      {/* when the image is dropped, show the image in the recipient and show confetti! */}
      {lastDroppedItem && (
        <>
          <img src={lastDroppedItem.image} alt={lastDroppedItem.name} />
          <Confetti
            run={ true }
            recycle = { numDroppedBoxes < numRecipients ? false : true }
          />
        </>
      )}
    </div>
  )
})
