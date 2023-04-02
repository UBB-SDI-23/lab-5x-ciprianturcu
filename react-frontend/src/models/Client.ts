import { Lawsuit } from "./Lawsuit"

export enum ClientType{
    "Physical person",
    "Juridical person"

}

export interface Client{
    id: number
    name : string
    phoneNumber:string
    city:string
    date_of_birth:string
    type: ClientType
    lawsuits: Lawsuit
}

