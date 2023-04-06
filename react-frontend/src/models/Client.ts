import { Lawsuit } from "./Lawsuit"

export enum ClientType{
    PHISICAL = "Physical person",
    JURIDICAL = "Juridical person"
}

export interface Client{
    id?: number
    name : string
    phoneNumber:string
    city:string
    date_of_birth:string
    type: ClientType
}

