import React from 'react';

// images
// import birey from "@/assets/images/bireycikan.jpg"

// styles
import '@/components/card/Card.scss'

// types
import { CardProps } from "@/types/Card"

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <React.Fragment>
      <div className="person-card">
        <img className='person-card-image' src={item.image} alt={item.name} />
        <div className='person-card-body'>
          <p className='person-card-title'>
            <span className="text-bold">#id: </span>
            <span className='text-light'>{item.id}</span>
          </p>
          <p className='person-card-title'>
            <span className="text-bold">Name: </span>
            <span className='text-light'>{item.name}</span>
          </p>
          <p className='person-card-title'>
            <span className="text-bold">Location: </span>
            <span className='text-light'>{item.location.name}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Card;
