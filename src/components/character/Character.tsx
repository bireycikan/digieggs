import React, { useContext, useState } from 'react';
import { useQuery } from "react-apollo"
import { gql } from "@apollo/client"
import InfiniteScroll from 'react-infinite-scroll-component';

// component
import CardList from "@/components/card_list/CardList"

// context
import { FilterContext } from "@/context/FilterContext"

// types
import { Edge, Person, PageInfo } from '@/types/Person';


const GET_PERSONS = gql`
  query GetPersonsByPage($offset: Int!, $limit: Int!, $filter: String) {
    getPersonsByPage(offset: $offset, limit: $limit, filter: $filter) {
      name
      id
      image
      location {
        name
      }
    }
  }
`;


const Character: React.FC = () => {
  const [hasMore, setHasMore] = useState(true);
  const { filterChoice } = useContext(FilterContext)
  const { loading, error, data, fetchMore } = useQuery(GET_PERSONS, {
    variables: {
      limit: 20,
      offset: 0,
      filter: filterChoice
    }
  })
  
  console.log('filterChoice', filterChoice)
  console.log({loading, error, data})
  
  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>ERROR: {error}</h1>
  
  let characters: Array<Person> = data.getPersonsByPage;

  const loadMore: () => void = () => {
    fetchMore({
      variables: {
        limit: 20,
        offset: data.getPersonsByPage.length,
        filter: filterChoice
      }
    })
  }


  return (
    <InfiniteScroll
      dataLength={characters.length}
      next={loadMore}
      hasMore={true}
      loader={<h1>Loading...</h1>}
    >
      <CardList collections={characters} />
    </InfiniteScroll>
  );
}

export default Character;
