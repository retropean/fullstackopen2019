const express = require('express')
const app = express()
//const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const Name = require('./models/name')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

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

app.get('/api/persons', (request, response) => {
    Name.find({}).then(notes => {
        response.json(notes.map(note => note.toJSON()))
      });
});

app.get('/info', (req, res) => {
  res.send(
	'<p>Phonebook has info for ' + names.length + ' people.</p>'
	+Date()
  )
})
/*
app.get('/api/persons/:id', (request, response) => {
  names.findById(request.params.id)
    .then(note => {
      response.json(note.toJSON())
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
    })
})
*/

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

app.post('/api/persons', (request, response, next) => {
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

  const name = new Name({
    name: body.name,
    number: body.number,
    id: generateId()
  })

  name
    .save()
    .then(savedName => savedName.toJSON())
    .then(savedAndFormattedName => {
      response.json(savedAndFormattedName)
    })
    .catch(error => next(error)) 
/*    
    .catch(error => {
      console.log(error);

      response.status(400).end()
    })  
*/
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
