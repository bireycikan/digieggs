export interface CardProps {
  item: Character;
}

export interface Character {
  image: string;
  name: string;
  id: number;
  location: Location;
}

export interface Location { 
  name: string; 
  url: string; 
}