import homeIcon from '../../assets/home.png'

// eslint-disable-next-line react/prop-types
const ResultScreen = ({ story, setStage }) => {
  const handleContinue = () => {
    const prompt = {
      role: 'user',
      content: 'Continua la storia da qui. Scrivi un breve paragrafo che prosegua la storia precedente. Le tue risposte sono solo in formato JSON con lo stesso formato delle tue risposte precedenti. Mantieni lo stesso valore per "title". Cambia solo il valore di "text"'
    }

    // Your continue story logic here...
  }

  const handleHome = () => {
    window.location.reload()
  }

  return (
    <div className="result-screen">
      <div className="story">
        <h2 className="story-title">{story.title}</h2>
        <p className="story-text">{story.text}</p>
      </div>
      <div className="result-buttons">
        <button id="home" className="secondary-button" onClick={handleHome}>
          <img src={homeIcon} alt="home" />
        </button>
        <button id="continue" onClick={handleContinue}>AVANTI</button>
      </div>
    </div>
  )
}

export default ResultScreen
