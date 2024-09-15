import { VideoDBType } from "../db/video-db-type"

export enum Resolutions {
    P144 = 'P144', 
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480', 
    P720 = 'P720', 
    P1080 = 'P1080', 
    P1440 = 'P1440', 
    P2160 = 'P2160'

}

export type InputVideoType  = {
    title: string,
    author: string,
    availableResolutions: Resolutions[ ]
}

export type OutputVideoType = VideoDBType

export type OutputErrorsType = {
    errorsMessages: ErrorType[]
}

type ErrorType = {
    message: string,
    field: string
}

export type VideoParamType = {
    id: string
}

export type InputUpdateVideoType = {
    title: string,
    author: string,
    availableResolutions: Resolutions[],
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    publicationDate: string
}