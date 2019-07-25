import React from 'react'
import Catalog from './components/Course'

const App = ( catalog_arg ) => {
	//console.log(catalog_arg)
	return (
		<div>
			<Catalog catalog_arg={catalog_arg} />
		</div>
	)
}

export default App