import { memo, useRef } from 'react'
import { useDrag } from 'react-dnd'
import "./Box.css";

export const Box = memo(function Box({ name, type, image, isDropped }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, image },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type],
  )
  // to get the box to move around randomly at every page load
  const boxPosition = useRef({
    position: 'absolute',
    top: Math.floor(Math.random() * 90) + '%',
    left: Math.floor(Math.random() * 90) + '%',
  });
  return (
    <div ref={drag} className="box" style={{ ...boxPosition.current, opacity, display: isDropped ? 'none' : 'block' }} data-testid="box">
      {isDropped ? <s>{name}</s> : <img src={image} alt={type} />}
    </div>
  )
})
