import { ReactNode } from "react"

export type InitialStateType = {
  filterChoice: string;
  filter: any;
}
  
export interface Props {
  children: ReactNode;
}

export interface FilterOptions {
  type: string;
  payload: any;
}