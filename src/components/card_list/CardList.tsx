import React from 'react';

// components
import Card from "@/components/card/Card"

// styles
import '@/components/card_list/CardList.scss'

// types
import { CardListProps } from '@/types/CardList';



const CardList: React.FC<CardListProps> = ({ collections, filter }) => {

  console.log('filter', filter)
  const getCollections = () => {

    if (filter) {
      return collections.filter((col) => {
        return col.name.includes(filter);
      })
    }
    else {
      return collections;
    }
  }


  return (
    <div className='card-list'>
      {
        collections && getCollections().map((col) => {
          return <Card key={col.id} item={col} />
        })
      }
    </div>
  )
}

export default CardList;
