import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltered, setNewFiltered] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newMessage, setNewMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

    let truth = true

    Object.entries(persons).forEach(([k,v]) => {
      if (v.name.toLowerCase() === newName.toLowerCase()) {
        if (window.confirm(v.name + " is already added to phonebook, replace the old number with a new one?")) {
          personService
            .update(v.id, nameObject)
            .then(returnedPerson => {
              const newPersons = persons.filter(person => person.id !== returnedPerson.id)
              setPersons(newPersons.concat(returnedPerson))
              setNewMessage(
                nameObject.name + "'s number was changed"
              )        
              setTimeout(() => {          
                setNewMessage(null)        
              }, 5000)
              setNewName('')
              setNewNumber('')
              truth = false     
            })
            .catch(error => {
              setErrorMessage(
                "Information of " + nameObject.name + " has already been removed from server"
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== v.id))
              setNewName('')
              setNewNumber('')
              truth = false  
            })
        }
        truth = false
        setNewName('')
        setNewNumber('')
      }
    })

    if (truth === true) {
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewMessage(
          "Added " + nameObject.name
        )        
        setTimeout(() => {          
          setNewMessage(null)        
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
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

  const handleIdChange = (event) => {
    if (window.confirm("Delete " + event.target.name + "?")) {
      personService
        .deleteObject(event.target.id)
        .then(
          setPersons(persons.filter(person => person.id !== event.target.id))     
        )
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFiltered.toLowerCase()))
  
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    
    return (
      <div className='message'>
        {message}
      </div>
    )
  }
  
  const Errory = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFiltered} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Notification message={newMessage} />
      <Errory message={errorMessage} />
      <PersonForm 
                  onSubmit={addName}
                  valueOne={newName}
                  onChangeOne={handleNameChange}
                  valueTwo={newNumber}
                  onChangeTwo={handleNumberChange}
      />
      <h2>Numbers</h2>
        {personsToShow.map(person =>
          <Persons key={person.id} person={person} onClick={handleIdChange}/> 
        )}
    </div>
  )
}

export default App
