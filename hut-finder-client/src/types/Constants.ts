
export enum HutCategory {
  GREAT_WALKS = "Great Walks",
  INDIVIDUALLY_PRICED = "Individually Priced",
  CLUB = "Club / Serviced Alpine",
  SERVICED = "Serviced",
  STANDARD =  "Standard",
  BASIC = "Basic",
}

export const getHutCategory = (category: number): HutCategory => {
  return HutCategory[Object.keys(HutCategory)[category] as keyof typeof HutCategory];
}

