export interface ilistRequest {
  listName: string;
  data: iListData[];
}

export interface iList extends ilistRequest {
  id: number;
}

export interface iListData {
  name: string;
  quantity: string;
}

export type ListRequiredKeys = "listName" | "data";

export type DataRequiredKeys = "name" | "quantity";
