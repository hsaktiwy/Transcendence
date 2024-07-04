import { useState } from 'react'
import './App.css'
interface Props {
  name: string
  age: number
  isMarried: boolean
}
function App(props: Props) {
  const [showInfo, setShowInfo] = useState(false)
  const [inputValue, setInputValue] = useState<string | null>(null)
  const handleChange = (event : React.ChangeEvent<HTMLFormElement>) => {
    setInputValue(event.target.value)
  }
  return (
    <div>
      {showInfo && (
        <>
            <h1>{inputValue ? inputValue : 'field empty'}</h1>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>This person {props.isMarried ? 'is married' : 'is single'}</p>
        </>
      )}
      <button onClick={() =>{
        setShowInfo(!showInfo)
      }}>
        {showInfo ? 'Hide infos' : 'Show infos'}
      </button>
      <input type="text" onChange={handleChange} />
    </div>
  )

}

export default App
