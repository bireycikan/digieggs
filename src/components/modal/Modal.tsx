import React, { BaseSyntheticEvent, Fragment, useContext } from 'react';
import { createPortal } from "react-dom"
import { FaTimes } from "react-icons/fa"

// styles
import '@/components/modal/Modal.scss'

// context
import { FilterContext } from "@/context/FilterContext"

// types
import { ModalProps } from '@/types/Modal';


const Modal: React.FC<ModalProps> = ({ show, onHide, onFilter }) => {
  const { filter } = useContext(FilterContext);

  if (!show) return null;

  const handleOnChangeFilter = (e: BaseSyntheticEvent) => {
    filter(e.target.value)
    onFilter(e.target.value)
    onHide();
  }

  return createPortal(
    <Fragment>
      <div className="filter-overlay" />
      <div className='filter-modal'>
        <div className='filter-close'>
          <p className='close-text'>Filter</p>
          <FaTimes 
            className='close-button' 
            onClick={onHide}
          />
        </div>

        <div className='filter-body' onChange={handleOnChangeFilter}>
          <div className="filter-body-item">
            <span className='item-text'>Rick</span>
            <input className='item-select' type="radio" name='character' value="Rick" />
          </div>
          <div className="filter-body-item">
            <span className="item-text">Morty</span>
            <input className='item-select' type="radio" name='character' value="Morty" />
          </div>
        </div>
      </div>
    </Fragment>,
    document.getElementById('portal')
  )
}

export default Modal;
