const { ApolloServer } = require('apollo-server')

const {typeDefs, resolvers} = require('./schema')

const server = new ApolloServer({ typeDefs, resolvers })

var mongoose = require('mongoose')
mongoose.connect('mongodb://judasfate:todo2018@ds155833.mlab.com:55833/todo', { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connect to DB')
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })