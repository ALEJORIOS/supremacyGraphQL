import { ApolloServer, gql } from "apollo-server";

const persons = [
    {
        id: 1,
        name: "Alejandro",
        company: "Big company",
        phone: "+111222333"
    },
    {
        id: 2,
        name: "Andrew",
        company: "North company",
        phone: "+444555666"
    },
    {
        id: 3,
        name: "Stiven",
        company: "South company",
        phone: "+777888999"
    }
]

const typeDefs = gql`
    type Person {
        id: Int
        name: String!
        company: String!
        phone: String!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!

    }
`

const resolvers = {
    Query: {
        personCount: () => {
            return persons.length
        },
        allPersons: () => {
            return persons
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server starts at ${url}`)
})