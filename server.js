// server.js
console.log('May Node be with you')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://rg_123:potatoparty@jksandbox.ctmep.mongodb.net/star-wars-quotes?retryWrites=true&w=majority'
const url = 'mongodb://127.0.0.1:27017'

const dbName = 'star-wars-quotes'
let db

let quotesCollection

// server activation
app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })

// App configurations
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err)

  // Storing a reference to the database so you can use it later
  db = client.db(dbName)
  quotesCollection = db.collection('quotes')
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)
})

// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     db = client.db('star-wars-quotes')
//     quotesCollection = db.collection('quotes')
//     })

app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
      })
    .catch(error => console.error(error))
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray()
    .then(results => {
      res.render('index.ejs', { quotes: results })
    })
    .catch(error => console.error(error))
})


app.put('/quotes', (req, res) => {
  quotesCollection.findOneAndUpdate(
    { name: 'Yoda' },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      upsert: true
    }
  )
    .then(result => {
       res.json('Success')
     })
    .catch(error => console.error(error))
})

app.delete('/quotes', (req, res) => {
  quotesCollection.deleteOne(
    { name: req.body.name }
  )
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch(error => console.error(error))
})
