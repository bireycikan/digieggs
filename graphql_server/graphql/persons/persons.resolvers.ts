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
      const { limit, offset, filter } = args;
      return personsModel.getPersonsByPage(offset, limit, filter);
    }
  }
}

module.exports = resolverMap;