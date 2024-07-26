import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltered, setNewFiltered] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
      })

    let truth = true

    Object.entries(persons).forEach(([k,v]) => {
      if (v.name === newName) {
        alert(`${newName} is already added to phonebook`)
        truth = false
      }
    })

    if (truth === true) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } 
  }  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFiltered(event.target.value)
    const newFiltered = event.target.value
      if (newFiltered !== '') {
        setShowAll(false)
      } else {
        setShowAll(true)
      }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFiltered.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFiltered} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
                  onSubmit={addName}
                  valueOne={newName}
                  onChangeOne={handleNameChange}
                  valueTwo={newNumber}
                  onChangeTwo={handleNumberChange}
      />
      <h2>Numbers</h2>
        {personsToShow.map(person => 
          <Persons key={person.name} person={person} />
        )}
    </div>
  )
}

export default App
