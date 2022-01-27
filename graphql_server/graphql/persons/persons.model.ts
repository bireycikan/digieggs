import { Pagination, Person } from "../../types/persons"
const fs = require('fs');
const path = require('path');

const persons: Array<Person> = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/rick_and_morty.json'), { encoding: "utf-8" }));


function getPersons() {
  return persons;
}

function getPersonsByName(name: string | undefined) {
  if (name) {
    return persons.filter((person: Person) => {
      if (person.name.includes(name)) {
        return true;
      }
    })
  }
  else {
    return persons;
  }
}

function getPersonsByPage(offset: number, limit: number, filter?: string) {

  const sliceStartIndex = offset;
  const sliceEndIndex = limit + offset;
  const filteredPersons: Array<Person> = getPersonsByName(filter)
  const slicedPersons: Array<Person> = filteredPersons.slice(sliceStartIndex, sliceEndIndex);

  return slicedPersons;

  // return {
  //   personList: slicedPersons,
  //   hasMore: slicedPersons.length <= filteredPersons.length
  // }
}

module.exports = {
  getPersons,
  getPersonsByName,
  getPersonsByPage
}