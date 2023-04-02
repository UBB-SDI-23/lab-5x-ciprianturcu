export enum LawsuitType{
    Civil,
    Commercial,
    Criminal,
    Family,
    Juvenile,
    Tax,
}

export interface Lawsuit{
    id: number
    description:string
    type: LawsuitType
    state: string
    courtDate: string
    client: number
}