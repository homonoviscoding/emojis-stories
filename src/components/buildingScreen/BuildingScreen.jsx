import Emoji from '../emoji/Emoji'
import './BuildingScreen.css'

// eslint-disable-next-line react/prop-types
const BuildingScreen = ({ name, setName, selectedEmojis, setSelectedEmojis, onGenerate }) => {
  const emojis = [
    '👹', '👽', '🧚', '🧟', '🌴', '🌍', '🐥', '🧢',
    '🍿', '🐂', '💣', '🔥', '🤖', '🚀', '🥩', '🔫', '🐕', '🥷'
  ]

  const handleEmojiClick = (emoji) => {
    // eslint-disable-next-line react/prop-types
    if (selectedEmojis.includes(emoji)) {
      console.warn(`Emoji ${emoji} già presente`)
      return
    }
    const newEmojis = [...selectedEmojis, emoji]
    if (newEmojis.length > 3) {
      newEmojis.shift()
    }
    setSelectedEmojis(newEmojis)
  }

  return (
    <div className="building-screen">
      <div className="field">
        <label>Protagonist</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Scegli 3 emoji</label>
        <ul className="emoji-list">
          {emojis.map((emoji) => (
            // eslint-disable-next-line react/prop-types
            <Emoji key={emoji} emoji={emoji} isSelected={selectedEmojis.includes(emoji)} onClick={handleEmojiClick} />
          ))}
        </ul>
      </div>
      <button id="generate" onClick={onGenerate}>GENERATE</button>
    </div>
  )
}

export default BuildingScreen
