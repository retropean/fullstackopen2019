const express = require('express')
const app = express()
//const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

/*
app.use(morgan(
 function (tokens, req, res) {
  return [
	tokens.method(req, res),
	tokens.url(req, res),
	tokens.status(req, res),
	tokens.res(req, res, 'content-length'), '-',
	tokens['response-time'](req, res), 'ms',
	JSON.stringify(req.body)
  ].join(' ')
 }))
*/

let names = [
	{
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 1
    },
    {
      name: "Eric Randall",
      number: "571-888-6666",
      id: 2
    },
    {
      name: "Jeff Smith",
      number: "703-777-4444",
      id: 3
    },
    {
      name: "Alex Norris",
      number: "44-22-2222",
      id: 4
    }
]

app.get('/api/persons', (req, res) => {
  res.json(names)
})

app.get('/info', (req, res) => {
  res.send(
	'<p>Phonebook has info for ' + names.length + ' people.</p>'
	+Date()
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = names.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  names = names.filter(p => p.id !== id)
  console.log('deleting '+ id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = names.length > 0
    ? Math.max(...names.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  //return 400 bad request if content missing
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  names.forEach(function(item, index, array) {
	if( item.name === body.name)
		{
			return response.status(400).json({ 
				error: 'name must be unique' 
			})
		}
  })

  const name = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  names = names.concat(name)

  response.json(name)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//const PORT = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
