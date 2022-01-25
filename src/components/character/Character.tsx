import React, { useContext } from 'react';
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
  query GetPersonsByPage($first: Int!, $after: String) {
    getPersonsByPage(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          name
          id
          location {
            name
          }
          image
        }
      }
    }
  }
`;


const Character: React.FC = () => {
  const { filterChoice } = useContext(FilterContext)
  const { loading, error, data, fetchMore } = useQuery(GET_PERSONS, {
    variables: {
      first: 20
    }
  })

  console.log({loading, error, data})

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>ERROR: {error}</h1>

  console.log('data', data)

  let characters: Array<Person> = data?.getPersonsByPage.edges.map((e: Edge) => e.node);
  let pageInfo: PageInfo = data?.getPersonsByPage.pageInfo;


  const loadMore: () => void = () => {
    fetchMore({
      variables: {
        after: pageInfo.endCursor
      }
    })
  }


  return (
    <InfiniteScroll
      dataLength={characters.length}
      next={loadMore}
      hasMore={pageInfo.hasNextPage}
      loader={<h1>Loading...</h1>}
    >
      <CardList collections={characters} filter={filterChoice} />
    </InfiniteScroll>
  );
}

export default Character;
