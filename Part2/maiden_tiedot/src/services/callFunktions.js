import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = import.meta.env.VITE_SOME_KEY


const  getAllFiltered = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getWetherInfo = (capital) => {
  const request = axios.get('https://api.openweathermap.org/data/2.5/weather?q='+capital+'&appid='+api_key)
  return request.then(response => response.data)
}

export default { getAllFiltered,getWetherInfo}