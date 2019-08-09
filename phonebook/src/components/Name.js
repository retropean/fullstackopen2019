import React from 'react'
import numberService from '.././services/numbers'
import del_entry from '../App'

const Name = ({ name, number, del_entry }) => {

  return (
	<li>
		{name}: {number}
		<button onClick={del_entry}>delete</button>
	</li>
  )
}

export default Name