
export type TFlightStorage = {
    id: number
    towPlane_id?: number
    towCaptain_id?: number
    towCrew_id?: number[]

    date: string

    startDate?: string
    finishDate?: string

    ready: boolean
    plane_id: number
    captain_id: number
    crew_id: number[]
};