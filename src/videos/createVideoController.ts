import { Response, Request } from "express";
import { db } from "../db/db";
import { InputVideoType, OutputErrorsType, OutputVideoType, Resolutions } from "../input-output-types/video-types";

const inputValidation = (video: InputVideoType) => {
  const errors: OutputErrorsType = {
    // объект для сбора ошибок
    errorsMessages: [],
  };

  if (video.title.length > 40) {
    errors.errorsMessages.push({
      message: "length is not appropriate",
      field: "title",
    });
  }

  if (video.author.length > 20) {
    errors.errorsMessages.push({
      message: "length is not appropriate",
      field: "author",
    });
  }

  if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find((p) => !Resolutions[p])) {
    errors.errorsMessages.push({
      message: "error!!!!",
      field: "availableResolution",
    });
  }

  return errors;
};

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
  const errors = inputValidation(req.body);
  if (errors.errorsMessages.length) {
    // если есть ошибки - отправляем ошибки
    res.status(400).json(errors);
    return;
  }

  // если всё ок - добавляем видео
  const newVideo: OutputVideoType = {
    ...req.body,
    id: Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
  };
  db.videos = [...db.videos, newVideo];

  res.status(201).json(newVideo);
};
