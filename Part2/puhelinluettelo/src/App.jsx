import { useState } from 'react'

const Contact = ({person}) =>{
  return(
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Contacts = ({persons}) =>{
  return (
    <>
      {persons.map((person, i)=> 
        <Contact key={person+i} person={person}/>
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:"040-1231244" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const chngeName = (event) => {
    let name = event.target.value
    setNewName(name)
  }

  const chngeNumber = (event) => {
    let number = event.target.value
    setNewNumber(number)
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
      <form>
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
      <Contacts persons={persons}/>
    </div>
  )

}

export default App