import React from 'react';

// components
import Character from "@/components/character/Character"
import Filter from "@/components/filter/Filter"

// context
import FilterProvider from "@/context/FilterContext"

// styles
import '@/pages/home/HomePage.scss'

const HomePage: React.FC = () => {
  return (
    <FilterProvider>
      <div className='homepage'>
        <div className="homepage-filter">
          <Filter />
        </div>
        <div className="homepage-item">
          <Character />
        </div>
      </div>
    </FilterProvider>
  )
}

export default HomePage;
