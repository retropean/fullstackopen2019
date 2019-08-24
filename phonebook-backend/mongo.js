const mongoose = require('mongoose')
var constants = require('./db_pass')

const password = process.argv[2]
const url = constants.pass
mongoose.connect(url, { useNewUrlParser: true })

const nameSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Name = mongoose.model('Name', nameSchema)

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
