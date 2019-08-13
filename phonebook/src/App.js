import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Name from './components/Name'
import numberService from './services/numbers'

const App = () => {
  
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ nameDupe, setNameDupe ] = useState(true)
  const [ numDupe, setNumDupe ] = useState(true)
  const [statusMessage, setStatusMessage] = useState(null)
  
  useEffect(() => {
	  numberService
		  .getAll()
		  .then(initialNumbers => {
		  setPersons(initialNumbers)
      })
  }, []) //empty array means useEffect only runs once on render
  console.log('render', persons.length, 'people')
  
  const addPerson = (event) => {
	  event.preventDefault()
	  const nameObject = {name: newName, number: newNumber}
      if(nameDupe===true)
	  {
		  setPersons(persons.concat(nameObject))
		  numberService
			.create(nameObject)
			.then(returnedName => {
			setPersons(persons.concat(returnedName))
			})
		  setStatusMessage(
			`Added ` + newName
			)
		  setTimeout(() => {
			  setStatusMessage(null)
		  }, 5000)
      }
	  else if(nameDupe===false && numDupe ===true)
	  {
		if( window.confirm(newName + 'is already added to the phonebook, would you like to replace the old number with a new one?'))
		{
			numberService
				.update((persons.find(n => n.name === newName)).id, nameObject)
				.then(returnedNote => {
					setPersons(persons.map(p => p.id !== ((persons.find(n => n.name === newName)).id) ? p : nameObject))
				})
		}
	  }
	  else window.alert(newName + ' is already added to phonebook')
	  setNewName('')
	  setNewNumber('')
  }
  
  const [showAll, setShowAll] = useState(true)
  const personsSearched = persons.filter(person => (person.name).toUpperCase().includes(searchQuery.toUpperCase()))

  const handleNameChange = (event) => {
	setNewName(event.target.value)
	setNameDupe(true)
	persons.forEach(function(item, index, array) {
		if( item.name === event.target.value)
		{
			setNameDupe(false)
		}
	  })
  }

  const handleNumberChange = (event) => {
	setNewNumber(event.target.value)
	setNumDupe(true)
	persons.forEach(function(item, index, array) {
		if( item.number === event.target.value)
		{
			setNumDupe(false)
		}
	})
  }
  
  const handleSearch = (event) => {
	setSearchQuery(event.target.value)
  }
  
  const del_entryOf = (id, name) => {
		if( window.confirm("Do you really want to delete this entry?"))
		{
			numberService
				.del(id)
				.then(setPersons(persons.filter(person => person.id !== id)))
			.catch(error => {
				setStatusMessage(
					name + ` has already been removed from the server`
				)
			    setTimeout(() => {
				  setStatusMessage(null)
				}, 5000)
			})
		}
	}

  const rows = () => personsSearched.map(person =>
	<Name
	  key={person.name}
	  name={person.name}
	  number={person.number}
	  del_entry={() => del_entryOf(person.id, person.name)}
	/>
  )

  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification message={statusMessage} />
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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.includes('Added'))
  {
	return (
		<div className="ok">
			{message}
		</div>
	)
  }
  if (message.includes('server'))
  {
	return (
		<div className="error">
			{message}
		</div>
	)
  }
}

export default App;