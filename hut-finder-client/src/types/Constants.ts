
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

export enum SortMethod {
  ALPHABETICAL_ASC = "ALPHABETICAL_ASC",
  ALPHABETICAL_DESC = "ALPHABETICAL_DESC",
  CATEGORY_ASC = "CATEGORY_ASC",
  CATEGORY_DESC = "CATEGORY_DESC",
}

