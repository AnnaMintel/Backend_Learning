
import {Request, Response} from 'express'
import {db} from '../db/db'
import { VideoDBType } from '../db/video-db-type'
import { VideoParamType } from '../input-output-types/video-types'
 
export const findVideoController = (req: Request<VideoParamType>, res: Response<VideoDBType>) => {
    const video = db.videos.find(el => el.id === +req.params.id) // получаем видео из базы данных
 
    if (!video){
        res.sendStatus(404)
        return
    }
    res.status(200).json(video) // отдаём видео в качестве ответа
}
 
