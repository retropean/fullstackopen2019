import React from 'react'
import ReactDOM from 'react-dom'

const exercises1 = 10
const exercises2 = 7
const exercises3 = 14

const Header = (props) => {
  console.log(props)
  return (
    <div>
	  <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  
  return (
    <div>
	  <p>
        {props.part} {props.excount}
      </p>
    </div>
  )
}

const Footer = (props) => {
 
  return (
    <div>
	  <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'

  return (
    <div>
      <Header course={course} />
      <Content part={part1} excount={exercises1} />
	  <Content part={part2} excount={exercises2} />
	  <Content part={part3} excount={exercises3} />
	  <Footer />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))