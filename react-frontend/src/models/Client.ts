import { Lawsuit } from "./Lawsuit"

export enum ClientType{
    PHISICAL = "Physical Person",
    JURIDICAL = "Juridical Person"
}

export type ClientTypeKey = keyof typeof ClientType;

interface ClientTypeMap{
    [key:string]: ClientType;
}

const clientTypeMap : ClientTypeMap = {
    PHISICAL: ClientType.PHISICAL,
    JURIDICAL: ClientType.JURIDICAL,
};

export function getClientTypeByTypeKey(key : ClientTypeKey) : ClientType{
    const clientType = clientTypeMap[key];
  console.log(`getClientTypeByKey("${key}") returned:`, clientType);
  return clientType;
}

export interface Client{
    id?: number
    name : string
    phoneNumber:string
    city:string
    date_of_birth:string
    type: ClientType
    lawsuits?: Lawsuit[]
}

