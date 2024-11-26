import { useState } from 'react'
import homeIcon from '../../assets/home.png'
import { apiKey } from '../config'

// eslint-disable-next-line react/prop-types
const ResultScreen = ({ story, setStory, setStage }) => {
  const [chatMesaages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: JSON.stringify(story),
    },
  ])
  const handleContinue = async () => {

    setStage('loading')

    const openApiKey = apiKey
    
    const prompt = {
      role: 'user',
      content: 'Continue the story from here. Write a short paragraph that continues the previous story. Your responses should only be in JSON format with the same structure as your previous responses. Keep the same value for "title". Change only the value of "text"'
    }

    setChatMessages([ ...chatMesaages, prompt ])

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openApiKey}`
          },
          body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          messages: [ ...chatMesaages, prompt ]
          })
      })

      const data = await response.json()
      console.log(data)
      const newStory = JSON.parse(data.choices[0].message.content)
      setStory(newStory)
      setChatMessages([...chatMesaages, prompt, { role: 'assistant', content: JSON.stringify(newStory) }])
      setStage('result')
      } catch (error) {
      console.error('Error continuing story:', error)
      // setStage('building')
      }
    

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
        <button id="continue" onClick={handleContinue}>CONTINUE</button>
      </div>
    </div>
  )
}

export default ResultScreen
