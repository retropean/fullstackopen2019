import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  
  return (
    <div>
	  <p>Hello world {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}

const App = () => {
  const a = 10
  console.log('Drink Coca-Cola!')
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name="Yo" age={a} />
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))