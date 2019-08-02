import React, { useState } from 'react'
import Name from './components/Name'

const App = (props) => {
  
  const [ persons, setPersons] = useState(props.names) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ Dupe, setDupe ] = useState(true)
  
  const addPerson = (event) => {
	  event.preventDefault()
	  const nameObject = {name: newName, number: newNumber}
	  Dupe ? setPersons(persons.concat(nameObject)) : window.alert(newName + ' is already added to phonebook')
	  setNewName('')
  }
  
  const [showAll, setShowAll] = useState(true)
  const personsSearched = persons.filter(person => (person.name).toUpperCase().includes(searchQuery.toUpperCase()))

  const handleNameChange = (event) => {
	setNewName(event.target.value)
	setDupe(true)
	persons.forEach(function(item, index, array) {
		if( item.name === event.target.value)
		{
			setDupe(false)
		}
	  })
  }
  
  const handleNumberChange = (event) => {
	setNewNumber(event.target.value)
  }
  
  const handleSearch = (event) => {
	setSearchQuery(event.target.value)
  }
  
  const rows = () => personsSearched.map(person =>
	<Name
	  key={person.name}
	  name={person.name}
	  number={person.number}
	/>
  )

  return (
    <div>
      <h2>Phonebook</h2>
	  <form>
		<div>
		  filter shown with <input 
			value={searchQuery} 
			onChange={handleSearch}
			/>
		</div>
	  </form>
	  <h2>Add a New Number</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
			value={newName} 
			onChange={handleNameChange}
		  />
        </div>
		<div>
		  number: <input 
			value={newNumber}
			onChange={handleNumberChange}
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

export default App;