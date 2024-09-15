//todo this is your video router 

import {Router} from 'express'
import {getVideosController} from './getVideosController'
import { createVideoController } from './createVideoController'
import { findVideoController } from './findVideoController'
import { updateVideoController } from './updateVideoController'
import { deleteVideosController } from './deleteVideoController'
 
export const videosRouter = Router()
 
videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)
videosRouter.put('/:id', updateVideoController)
videosRouter.delete('/:id', deleteVideosController)
 