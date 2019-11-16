//Execute with node mongo.js [password]

const mongoose = require('mongoose')
var constants = require('./db_pass')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = constants.pass

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// Adding a new note
/*
const note = new Note({
  content: 'Third note is third',
  date: new Date(),
  important: false,
})

note.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

Note.find({important: true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
