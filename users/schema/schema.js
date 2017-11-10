const graphql = require('graphql');
const axios = require('axios');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;

const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: {
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		description: {type: GraphQLString}
	}
});
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve(parentValue, args){
				return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(resp => resp.data);
			}
		}
	}
});
//gives graphql a way to find a specific item in db
//entry point
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			//if given id, will return UserType
			args: { id: { type:GraphQLString } },
			resolve(parentValue, args) {
				//where we find the actual data/ go into database
				return axios.get(`http://localhost:3000/users/${args.id}`)
					.then(resp => resp.data);
			}
		},
		company: {
			type: CompanyType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${args.id}`)
					.then(resp => resp.data);
			}
		}
	}
});
//returns new instance of graphql schema
module.exports = new GraphQLSchema({
	query: RootQuery
})

