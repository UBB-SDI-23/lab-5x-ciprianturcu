import { Lawsuit } from "./Lawsuit"

export enum ClientType{
    PHISICAL = "Physical Person",
    JURIDICAL = "Juridical Person"
}

export type ClientTypeKey = keyof typeof ClientType;

interface ClientTypeMap{
    [key:string]: ClientType;
}

const ClientTypeMap : ClientTypeMap = {
    [ClientType.PHISICAL]: ClientType.PHISICAL,
    [ClientType.JURIDICAL]: ClientType.JURIDICAL
};

export function getClientTypeByTypeKey(key : ClientTypeKey) : ClientType{
    return ClientTypeMap[key]
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

