import { useState } from 'react'
import { useEffect } from 'react'
import phoneServices from "./services/callFunktions"

const Contact = ({person,handleDelete}) =>{
  return(
    <div>
      {person.name} {person.number} <button onClick={() => handleDelete(person.id,person.name)} >delete</button>
    </div>
  )
}

const Contacts = ({persons,newFilter,handleDelete}) =>{
  return (
    <>
      {persons.filter((p)=>p.name.toLowerCase().includes(newFilter.toLowerCase())).map((person, i)=> 
        <Contact key={person+i} person={person} handleDelete={handleDelete}/>
      )}
    </>
  )
}

const Filter = ({newFilter,chngeFilter}) =>{

  return (
    <>
      <input value={newFilter} onChange={chngeFilter}/>
    </>
  )
}

const PersonsForm = ({newName, newNumber, chngeName, chngeNumber, handleSubmit}) =>{
  return (
    <>
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
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    phoneServices
    .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


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
      phoneServices.create({name:newName,number:newNumber}).then(response => {
        let newPerson = persons.concat(response)
        setPersons(newPerson)
        setNewName("")
        setNewNumber("")
      })
     
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  const handleDelete = (id,personName) => {
    if (window.confirm(`Delete  ${personName} ?`)) {
      phoneServices.removeContact(id).then(response => {
        let removePerson = persons.filter((person) => person.id !== id)
        setPersons(removePerson)
      })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <Filter newFilter={newFilter} chngeFilter={(e) => chngeFilter(e)}/>
      </div>
      <PersonsForm {...{newName,newNumber,chngeName,chngeNumber,handleSubmit}}/>
      <h2>Numbers</h2>
      <Contacts {...{persons, newFilter, handleDelete}}/>
    </div>
  )
}

export default App