

// eslint-disable-next-line react/prop-types
const Emoji = ({ emoji, isSelected, onClick }) => {
  return (
    <li 
      className={`emoji ${isSelected ? 'selected' : ''}`} 
      onClick={() => onClick(emoji)}
    >
      {emoji}
    </li>
  )
}

export default Emoji
