import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import Name from './components/Name'

function App() {
  const [ countries, setCountries] = useState([])
  const [ searchQuery, setSearchQuery ] = useState('')
  
  useEffect(() => {
	  axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
		  setCountries(response.data)
		  console.log('data pulled')
		})
  }, [])
  console.log('render', countries.length, 'countries')
  console.log(countries)
  
  const handleSearch = (event) => {
	setSearchQuery(event.target.value)
  }
/*
  const rows = () => 
	  countriesToShow.length > 10 ?
	  "too many matches, specify another filter":
	  countriesToShow.map(country =>
		<Country
		  key={country.name}
		  country={country}
		/>
	  )
*/
  const rows = () => 
	countriesToShow.length === 1 ?
	 countriesToShow.map(country =>
		<CountryDetail
		  key={country.name}
		  country={country}
		/>)
	 :
  	 (countriesToShow.length > 10 ?
	   "too many matches, specify another filter":
	   countriesToShow.map(country =>
		<Country
		  key={country.name}
		  country={country}
		/>
	  ))
  
  const countriesToShow = countries.filter(country => (country.name).toUpperCase().includes(searchQuery.toUpperCase()))

  return (
    <div>
	  <form>
		<div>
		  find countries <input 
			value={searchQuery} 
			onChange={handleSearch}
			/>
		</div>
      </form>
	  <div>
	    {rows()}
	  </div>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <p>{country.name}</p>
  )
}

const CountryDetail = ({ country }) => {
  const countryLang = country.languages.map(language =>
	<li>{language.name}</li>
  )
  return (
    <div>
		<h1>{country.name}</h1>
		<div>capital {country.capital}</div>
		<div>population {country.population}</div>
		<h2>languages</h2>
		<div>{countryLang}</div>
		<img src={country.flag} alt="Country Flag" width="200px"/>
	</div>
  )
}

export default App;
