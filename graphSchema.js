const graphqlHTTP = require('express-graphql')
const buildSchema = require('graphql')

module.exports = {
	schema,
	root,
	graphqlHTTP
}

var schema = buildSchema(`
	type Query {
		hello: String
	}
`)

var root = {
	hello: () => {
		return 'Hello world!';
	},
}