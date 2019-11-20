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

app.get('/api/persons', (request, response) => {
    Name.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
      });
});

app.get('/info', (request, response) => {
    Name.find({})
    .then(persons => {
        response.send(
        	'<p>Phonebook has info for ' + persons.length + ' people. </p>'
    	    +Date()
        )
        console.log('There are ' + persons.length + ' people in the database. Printing.')
    });
})

app.get('/api/persons/:id', (request, response, next) => {
    Name.findById(request.params.id)
        .then(note => {
          if (note) {          
            response.json(note.toJSON())
          } 
          else {
            response.status(404).end()
          }
        })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Name.findByIdAndRemove(request.params.id)
        .then(result => {
          response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
/*  names.forEach(function(item, index, array) {
	if( item.name === body.name)
		{
			return response.status(400).json({ 
				error: 'name must be unique' 
			})
		}
  })*/
  const name = new Name({
    name: body.name,
    number: body.number
    //id: generateId()
  })

  name
    .save()
    .then(savedName => savedName.toJSON())
    .then(savedAndFormattedName => {
        console.log('Name function savedAndformattedName: ' + savedAndFormattedName)
        response.json(savedAndFormattedName)
    })
    .catch(error => next(error)) 
})

///////////////////////////////////////////////////////////

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
