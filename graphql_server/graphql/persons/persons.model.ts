import { Pagination, Person } from "../../types/persons"
const fs = require('fs');
const path = require('path');
const { UserInputError } = require('apollo-server-express');

const persons: Array<Person> = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/rick_and_morty.json'), { encoding: "utf-8" }));


function getPersons() {
  return persons;
}

function getPersonsByName(name: string) {
  return persons.filter((person: Person) => {
    if (person.name.includes(name)) {
      return person;
    }
  })
}

function getPersonsByPage(first: number, after: string) {
  let afterIndex: number = 0;
  if (after !== undefined) {
    const lastIndex: number = persons.findIndex((p: Person) => Buffer.from(p.id + p.name).toString('base64') === after)
    if (lastIndex === -1) {
      throw new UserInputError('Invalid after value: cursor not found')
    }
    afterIndex = lastIndex + 1;
  }


  const slicedPersons: Array<Person> = persons.slice(afterIndex, afterIndex + first);
  const lastSlicedPerson: Person = slicedPersons[slicedPersons.length - 1];

  return {
    pageInfo: {
      endCursor: Buffer.from(lastSlicedPerson.id + lastSlicedPerson.name).toString('base64'),
      hasNextPage: afterIndex + first < persons.length
    },
    edges: slicedPersons.map((sp: Person) => {
      return {
        cursor: Buffer.from(sp.id + sp.name).toString('base64'),
        node: sp
      }
    })
  }
}

module.exports = {
  getPersons,
  getPersonsByName,
  getPersonsByPage
}