import React, { useState } from 'react'

const App = () => {
  
  const [ persons, setPersons] = useState(names) 
  const [ newName, setNewName ] = useState('')
  const [ Dupe, setDupe ] = useState(false)
  
  const addPerson = (event) => {
	  event.preventDefault()
	  const nameObject = {name: newName}
	  setPersons(persons.concat(nameObject))
	  setNewName('')
/*	  }
	  else
	  {
		window.alert(newName + ' is already added to phonebook')
	  }*/
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const rows = () => persons.map(name =>
	<Name
	  key={name.name}
	  name={name.name}
	/>
  )

  const Name = ({ name }) => {
	  return (
		<li>{name}</li>
	  )
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
			value={newName} 
			onChange={handleNameChange}
		  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}

const names = [
  {
    name: 'Jeff Smith'
  },
  {
    name: 'Eric Randall'
  }
]

export default App;