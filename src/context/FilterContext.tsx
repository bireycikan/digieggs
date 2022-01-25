import { createContext, useReducer } from "react"
import { InitialStateType, Props, FilterOptions } from "@/types/FilterContext"

const InitialState = {
  filterChoice: '',
  filter: null
}

export const FilterContext = createContext<InitialStateType>(InitialState);


function filterReducer(state: InitialStateType, action: { type: string, payload: any }) {
  if (action.type === "FILTER_CHOICE") {
    return { ...state, filterChoice: action.payload }
  }
  else {
    return state;
  }
}

const FilterProvider: React.FC<Props> = ({children}) => {

  const [state, dispatch] = useReducer(filterReducer, {
    filterChoice: '',
    filter: null
  })

  const filter: (filterOption: FilterOptions) => void = (filterOption) => {
    dispatch({ type: "FILTER_CHOICE", payload: filterOption })
  }

  return (
    <FilterContext.Provider value={{...state, filter }}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider;