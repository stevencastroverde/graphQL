const graphql = require('graphql');
const _ = require('lodash');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;

//just for dev purposes using hardcoded data
const users = [
	{ id: '23', firstName: 'Bill', age: 20},
	{ id: '47', firstName: 'Sam', age: 21 }
]
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: {type: GraphQLString },
		firstName: {type: GraphQLString },
		age: {type: GraphQLInt }
	}
});

//gives graphql a way to find a specific item in db
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			//if given id, will return UserType
			args: { id: { type:GraphQLString } },
			resolve(parentValue, args) {
				//where we find the actual data/ go into database
				return _.find(users, { id: args.id });
			}
		}
	}
});
//returns new instance of graphql schema
module.exports = new GraphQLSchema({
	query: RootQuery
})

