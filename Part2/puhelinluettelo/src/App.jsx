import { useState } from 'react'

const Contact = ({person}) =>{
  return(
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Contacts = ({persons,newFilter}) =>{
  return (
    <>
      {persons.filter((p)=>p.name.includes(newFilter)).map((person, i)=> 
        <Contact key={person+i} person={person}/>
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const chngeName = (event) => {
    let name = event.target.value
    setNewName(name)
  }

  const chngeNumber = (event) => {
    let number = event.target.value
    setNewNumber(number)
  }

  const chngeFilter = (event) => {
    let filterValue = event.target.value
    setNewFilter(filterValue)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()

    let findPerson = persons.find((person) => person.name === newName)
 
    if(findPerson===undefined){
      let newPerson = persons.concat({name:newName,number:newNumber})
      setPersons(newPerson)
      setNewName("")
      setNewNumber("")
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input value={newFilter} onChange={(e)=> chngeFilter(e)}/>
        </div>
      <form>
        <div>
          <h2>add new</h2>
        </div>
        <div>
          name: <input value={newName} onChange={(e)=> chngeName(e)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(e)=> chngeNumber(e)}/>
        </div>
        <div>
          <button type="submit" onClick={(e)=> handleSubmit(e)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons} newFilter={newFilter}/>
    </div>
  )

}

export default App