import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Name from './components/Name'
import numberService from './services/numbers'

const App = () => {
  
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ Dupe, setDupe ] = useState(true)
  
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
	  Dupe ? setPersons(persons.concat(nameObject)) : window.alert(newName + ' is already added to phonebook')

	  numberService
		  .create(nameObject)
		  .then(returnedName => {
			setPersons(persons.concat(returnedName))
      })
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
  const del_entryOf = (id) => {
		if( window.confirm("Do you really want to delete this entry?"))
		{
			numberService
				.del(id)
				.then(setPersons(persons.filter(person => person.id !== id)))
		}
	}

/*  const del_entry = id => {
	  console.log("datwindow")
	  const url = `http://localhost:3001/names/${id}`
	  const person = persons.find(n => n.id === id)
	  
	  window.confirm("Do you really want to delete this entry?");
	  //const changedNote = { ...note, important: !note.important }
/*	
/*	
	  noteService
		  .update(id, changedNote)
		  .then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
	  .catch(error => {
		  alert(
			`the note '${note.content}' was already deleted from server`
		  )
		  setNotes(notes.filter(n => n.id !== id))
  	  })
  }
*/

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
	  del_entry={() => del_entryOf(person.id)}
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