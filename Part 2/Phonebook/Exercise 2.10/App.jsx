import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltered, setNewFiltered] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1)
    }

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
          <Persons key={person.id} person={person} />
        )}
    </div>
  )
}

export default App
