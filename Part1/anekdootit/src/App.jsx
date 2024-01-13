import { useState } from 'react'

const AnecdoteWithMostVotes = ({text,amountOfVotes}) => {
  return(
    <div>
      <h2>
        Anecdote with most votes
      </h2>
      <>
        {amountOfVotes!==0?
          <>
            <div>
              {text}
            </div>
            <div>
              has {amountOfVotes} votes
            </div>
          </>
          :
          null
        }
      </>
    </div>
  )
}

const Button = ({text,handleClick}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(anecdotes.map(() => {return 0}))
  const [anecdoteWithMostVotes, setAnecdoteWithMostVotes] = useState()
  const [mostVotes, setMostVotes] = useState(0)

  // console.log(mostVotes)
  const vote = () => {
    const copy = { ...points }
    copy[selected] += 1  
    let newValue = copy
    setPoints(newValue)

    let voteValues = Object.values(newValue);
    let largestVoteValue = Math.max(...voteValues.map((value) => value))
    let newVoteValue = voteValues.indexOf(largestVoteValue)
    setMostVotes(largestVoteValue)
    setAnecdoteWithMostVotes(newVoteValue)
  }

  const nextAnecdote = () => {
    let newValue = Math.floor(Math.random()
    * ((anecdotes.length-1) - 0 + 1)) + 0;
    setSelected(newValue)
  }

  

  return (
    <div>
      {anecdotes[selected]}
      <p>
        has {points[selected]} votes
      </p>
      <div>
        <Button text="next anecdote" handleClick={() => nextAnecdote()} />
        <Button text="vote" handleClick={() => vote()} />
      </div>
      <div>
        <AnecdoteWithMostVotes text={anecdotes[anecdoteWithMostVotes]} amountOfVotes={mostVotes}/>
      </div>
    </div>
  )
}

export default App