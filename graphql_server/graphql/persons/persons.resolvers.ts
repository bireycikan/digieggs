import { Pagination, Person } from "../../types/persons"
const personsModel = require('./persons.model');
const { DateTimeResolver, URLResolver } = require('graphql-scalars');



const resolverMap = {
  DateTime: DateTimeResolver,
  URL: URLResolver,
  Query: {
    persons: () => {
      return personsModel.getPersons();
    },
    getPersonsByName: (_: any, args: any) => {
      return personsModel.getPersonsByName(args.name);
    },
    getPersonsByPage: (_: any, args: any) => {
      const { first, after } = args;
      return personsModel.getPersonsByPage(first, after);
    }
  }
}

module.exports = resolverMap;