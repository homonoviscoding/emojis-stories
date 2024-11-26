import { useState } from 'react'
import BuildingScreen from '../buildingScreen/BuildingScreen'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import ResultScreen from '../resultScreen/ResultScreen'
import { apiKey } from '../config'




export default function Main () {
  const [stage, setStage] = useState('building')
  const [selectedEmojis, setSelectedEmojis] = useState([])
  const [name, setName] = useState('')
  const [story, setStory] = useState({ title: '', text: '' })

  const openApiKey = apiKey

  const handleGenerate = async () => {
    if (selectedEmojis.length < 3 || name.length < 2) {
      window.alert('You have to select 3 emojis and insert a name')
      return
    }

    setStage('loading')

    const prompt = {
      role: 'user',
      content: `Create a story starting with these emojis: ${selectedEmojis}. The protagonist of the story is named ${name}. The story must be around 320 characters long and have a title, which must also be very short. Your responses should be in JSON format like this example:
      {
        "title": "Intergalactic Encounter",
        "text": "During a night exploration, Alberto Angela comes across an alien spaceship that has landed in Rome. The extraterrestrials seek help against a horde of robotic cats. Angela helps them and in return, the aliens gift him a spaceship."
      }
      Ensure that the JSON keys are "title" and "text", with quotation marks`
    }

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
            messages: [prompt]
            })
        })

        const data = await response.json()
        console.log(data)
        const story = JSON.parse(data.choices[0].message.content)
        setStory(story)
        setStage('result')
        } catch (error) {
        console.error('Error creating story:', error)
        setStage('building')
        }
  }

  return (
    <main className={stage}>
      {stage === 'building' && (
        <BuildingScreen 
          name={name} 
          setName={setName} 
          selectedEmojis={selectedEmojis} 
          setSelectedEmojis={setSelectedEmojis} 
          onGenerate={handleGenerate} 
        />
      )}
      {stage === 'loading' && <LoadingScreen />}
      {stage === 'result' && <ResultScreen story={story} setStory={setStory} setStage={setStage} />}
    </main>
  )
}
