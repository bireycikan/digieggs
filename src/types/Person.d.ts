
export interface Person {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Pagination {
  pageInfo: PageInfo;
  edges: Array<Edge>;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface Edge { 
  cursor: string; 
  node: Person;
}