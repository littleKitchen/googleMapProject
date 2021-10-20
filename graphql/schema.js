const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '查询数据',
        addressName: addressName,
        geometry: geometry,
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        description: '修改数据',
        fields: () => ({

        })
    })
});

module.exports = schema;