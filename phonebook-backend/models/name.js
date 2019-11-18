require('dotenv').config()
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
        console.log('connected to MongoDB')  
  })  
  .catch((error) => {    
        console.log('error connecting to MongoDB:', error.message)  
  })

const nameSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true  },  
  number: {
    type: String,
    minlength: 8,
    unique: true,
    required: true  },
  id: {
    type: Number
  }
})

nameSchema.plugin(uniqueValidator);

nameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/*
//if no parameters are sent, print contents of the phonebook
if(process.argv.length < 3)
{
      console.log('Phonebook:')
      Name.find({}).then(result => {
            result.forEach(name => {
            console.log(name.name + " " + name.number)
      })
      mongoose.connection.close()
  })
}
//else enter the information into the phonebook
else
{
    const name = new Name({
      name: process.argv[2],
      number: process.argv[3]
      //id: 1
    })

    name.save().then(response => {
        console.log('entry saved!')
        mongoose.connection.close()
    })
}
*/

const Name = mongoose.model('Name', nameSchema)

module.exports = mongoose.model('Name', nameSchema)
