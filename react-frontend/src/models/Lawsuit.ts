export enum LawsuitType{
    CIVIL = "Civil",
    COMMERCIAL = "Commercial",
    CRIMINAL = "Criminal",
    FAMILY = "Family",
    JUVENILE = "Juvenile",
    TAX = "Tax",
}

export interface Lawsuit{
    id?: number
    description:string
    type: LawsuitType
    state: string
    courtDate: string
    client: number
}