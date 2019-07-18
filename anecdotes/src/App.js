import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [index, setIndex] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  const handleClick = () => {
		setIndex(Math.floor(Math.random() * (+anecdotes.length - + 0) + 0))
  }
  const handleVote = () => {
		const copy = [...votes]
		copy[index] += 1  
		setVotes(copy)
  }
  
  return (
    <div>
	  <h2>Anecdote of the day</h2>
	  <p>
	    {anecdotes[index]}
	  </p>
	  <Button onClick={handleVote} text='Vote' />
	  <Button onClick={handleClick} text='Random Anecdote' />
	  <h2>Anecdote with the most Votes</h2>
	  <Greatest votes={votes}/>
    </div>
  )
}

const Greatest = (props) => {
	console.log((props.votes))
	console.log(props.votes.indexOf(Math.max.apply(null,props.votes)))
  return (
    <div>
		<p>{anecdotes[props.votes.indexOf(Math.max.apply(null,props.votes))]}</p>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

export default App;
