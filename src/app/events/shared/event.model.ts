
//model that represents the datatypes
export interface IEvent {
    id: number
    name: string
    date: Date
    time: string
    price: number
    imageUrl: string
    location?:{
        address: string
        city: string
        country: string

    },
    onlineUrl?: string,
    sessions: ISession[]
}

//Every event contains an array of sessions. and the datatype for the individual session has been displayed beneath
export interface ISession{
    id: number
    name: string
    presenter: string
    duration: number
    level: string
    abstract: string
    voters: string[]
}