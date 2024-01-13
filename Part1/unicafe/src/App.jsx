import { useState } from 'react'

const Header = ({header}) => {
  // tallenna napit omaan tilaansa

  return (
    <div>
      {header}
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  // tallenna napit omaan tilaansa
  const header = "statistics"
  return (
    <div>
      <h2>
        <Header header={header}/>
      </h2>
      <div>
        <StatisticsData text="good" value={good}/>
        <StatisticsData text="neutral" value={neutral}/>
        <StatisticsData text="bad" value={bad}/>
      </div>
    </div>
  )
}

const StatisticsData = ({text,value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Button = ({text, handleClick}) => {
  // tallenna napit omaan tilaansa

  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const header = "give feedback"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    let newValue = good + 1;
    setGood(newValue)
  }

  const increaseNeutral= () => {
    let newValue = neutral + 1;
    setNeutral(newValue)
  }

  const increaseBad = () => {
    let newValue = bad + 1;
    setBad(newValue)
  }

  return (
    <div>
      <h2>
        <Header header={header}/>
      </h2>
      <div>
        <Button text="good" handleClick={() => increaseGood()} />
        <Button text="neutral" handleClick={() => increaseNeutral()} />
        <Button text="bad" handleClick={() => increaseBad()} />
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App