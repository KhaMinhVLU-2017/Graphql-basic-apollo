const { gql } = require('apollo-server')
const Tasks = require('./api/model/task')
const ObjectId = require('mongoose').Types.ObjectId
ObjectId.prototype.valueOf = function () {
	return this.toString()
}

const typeDefs = gql`
    type Task {
        _id: ID
        title: String
        description: String
        status: String
    }
    type Query {
        getTasks: [Task]
        task(_id: ID!): Task
    }
    type Mutation {
        addTask(title: String!, description: String!, status: String!): Task
        removeTask(_id: ID!): Task
        updateTask(_id: ID!, title: String!, description: String, status: String): Task
    }
`
const resolvers = {
    Query: {
        getTasks: () => {
            async function ListTask() {
                let list = await Tasks.find({})
                return list
            }
            return ListTask()
        },
        task: (root, agrs) => {
            Tasks.findById(agrs._id)
        }
    },
    Mutation: {
        addTask: (root, agrs) => {
            let title = agrs.title
            let description = agrs.description
            let status = agrs.status
            let task = new Tasks({ title, description, status })
            return task.save()
        },
        removeTask: (root, agrs) => {
            let task = Tasks.findById(agrs._id)
            Tasks.deleteOne({_id: agrs._id})
            return task
        },
        updateTask: (root, agrs) => {
            return Tasks.findOneAndUpdate({_id: agrs._id}, agrs)
        }
    }
}
module.exports = { typeDefs, resolvers }