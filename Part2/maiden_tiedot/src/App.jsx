import { useState } from 'react'
import { useEffect } from 'react'
import countryServices from "./services/callFunktions"


const Languages = ({languages}) =>{

  return (
    <div>
      <ul>
        {Object.values(languages).map((language,i) => <li key={language+i}>{language}</li>)}
      </ul>
    </div>
  )
}

const CountrySpecifics = ({country}) =>{

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital[0]}</div>
      <div>area: {country.area}</div>
      <div>
        <h1>languages:</h1>
        <Languages languages={country.languages}/>
      </div>
      <div>
        <img src={country.flags["png"]} alt="flag" />
      </div>
    </div>
  )
}
 

const Country = ({country,getSpecific,handleShow}) =>{
  return(
    <div>
      {getSpecific!==true?
        <>{country.name.common} <button onClick={() => handleShow(country.name.common)}>show</button></>
        :
        <div>
          <CountrySpecifics {...{country}}/>
        </div>
      }
    </div>
  )
}

const Countires = ({countries,handleShow}) =>{
  return (
    <>
      {countries.length<=10?
        <>
          {countries.length>1?
            <>
              {countries.map((country, i)=> 
                <Country key={country+i} country={country} getSpecific={false} handleShow={handleShow}/>
              )}
            </>
            :
            <>
              {countries.map((country, i)=> 
                <Country key={country+i} country={country} getSpecific={true}/>
              )}
            </>
          }
        </>
        :
        <>
          To many matches, specify another filter
        </>
      }
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

const App = () => {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    countryServices
    .getAllFiltered()
      .then(response => {
        setCountries(response)
      })
  }, [])

  useEffect (() => {
    if(newFilter!==""){
      let tempCountries = countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      setFilteredCountries(tempCountries)
    }
    else{
      setFilteredCountries([])
    }
  }, [newFilter])

  const chngeFilter = (event) => {
    let filterValue = event.target.value
    setNewFilter(filterValue)
  }

  const handleShow = (countryName) =>{
    setNewFilter(countryName)
  }

  return (
    <div>
      {countries.length!==0?
        <>
          <div>
          find countries : <Filter newFilter={newFilter} chngeFilter={(e) => chngeFilter(e)}/>
          </div>
          <>
            {filteredCountries!==undefined?
              <Countires countries={filteredCountries} handleShow={handleShow}/>
              :
              null
            }
          </>
        </>
        :
        null
      }
    </div>
  )
}

export default App