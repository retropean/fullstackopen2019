import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
	setGood(good + 1)
	setAll(all + 1)
  }
  const handleNeutralClick = () => {
	setNeutral(neutral + 1)
	setAll(all + 1)
  }
  const handleBadClick = () => {
	setBad(bad + 1)
	setAll(all + 1)
  }
  
  const Statistics = (props) => {
    if (props.all === 0) {
		
		return (
		  <div>
			No data yet
		  </div>
		)
    }
	return (
		<div>
			<table>
				<Statistic text="good" value = {good} />
				<Statistic text="neutral" value = {neutral} />
				<Statistic text="bad" value = {bad} />
				<Statistic text="all" value = {all} />
				<Statistic text="average" value = {(good - bad) / (good + bad + neutral)} />
				<Statistic text="positive" value = {good/all} />
			</table>
		</div>
	)
/*
	return (
	  <div>	
        <p>Good: {good}</p>
		<p>Neutral: {neutral}</p>
		<p>Bad: {bad}</p>
		<p>All: {props.all}</p>
	    <p>Average: {(good - bad) / (good + bad + neutral)}</p>
	    <p>Positive: {good / all}</p>
	  </div>	
	)
*/
  }

  const Statistic = ({value, text}) => {
	return (
		<tbody>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</tbody>
	)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
	  <Button onClick={handleGoodClick} text='good' />
	  <Button onClick={handleNeutralClick} text='neutral' />
	  <Button onClick={handleBadClick} text='bad' />
	  <h2>statistics</h2>
	  <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
	</div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


ReactDOM.render(<App />, 
  document.getElementById('root')
)

export default App;