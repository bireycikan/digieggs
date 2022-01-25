import React, { useState } from 'react';
import { FaFilter } from "react-icons/fa"

// components
import Modal from "@/components/modal/Modal"

// styles
import '@/components/filter/Filter.scss'

const Filter: React.FC = () => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='filter'>
      <p className="filter-text">{filter || 'Rick and Morty'}</p>
      <FaFilter className='filter-choice' onClick={handleShow} />
      <Modal show={show} onHide={handleClose} onFilter={(f) => setFilter(f)} />
    </div>
  );
}

export default Filter;
