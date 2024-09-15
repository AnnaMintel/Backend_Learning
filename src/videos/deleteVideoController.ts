
import {Request, Response} from 'express'
import {db} from '../db/db'
import { VideoDBType } from '../db/video-db-type'
import { VideoParamType } from '../input-output-types/video-types'
 
export const deleteVideosController = (req: Request<VideoParamType>, res: Response<VideoDBType>) => {
    
    const video = db.videos.find(el => el.id === +req.params.id)
    if (!video){
        res.sendStatus(404)
        return
    }
    
    const filteredVideos = db.videos.filter(el => el.id !== +req.params.id) // получаем видео из базы данных
    db.videos = filteredVideos 

    res.sendStatus(204) // delete video
}
 
