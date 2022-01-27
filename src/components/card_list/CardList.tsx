import React from 'react';

// components
import Card from "@/components/card/Card"

// styles
import '@/components/card_list/CardList.scss'

// types
import { CardListProps } from '@/types/CardList';



const CardList: React.FC<CardListProps> = ({ collections }) => {
  return (
    <div className='card-list'>
      {
        collections && collections.map((col) => {
          return <Card key={col.id} item={col} />
        })
      }
    </div>
  )
}

export default CardList;
