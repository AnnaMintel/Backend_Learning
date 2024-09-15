import { Response, Request } from "express";
import { db } from "../db/db";
import { InputUpdateVideoType, InputVideoType, OutputErrorsType, OutputVideoType, Resolutions, VideoParamType } from "../input-output-types/video-types";

const inputValidation = (video: InputUpdateVideoType) => {
  const errors: OutputErrorsType = {
    // объект для сбора ошибок
    errorsMessages: [],
  };

  if (video.title.length > 40 || !video.title) {
    errors.errorsMessages.push({
      message: "length is not appropriate",
      field: "title",
    });
  }

  if (video.author.length > 20 || !video.author) {
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

  if (typeof video.canBeDownloaded !== 'boolean') {
    errors.errorsMessages.push({
      message: "shoult be boolean",
      field: "canBeDownloaded",
    });
  }

  if (video.minAgeRestriction && video.minAgeRestriction < 1 && video.minAgeRestriction > 18) {
    errors.errorsMessages.push({
      message: "invalid age",
      field: "minAgeRestriction",
    });
  }

  return errors;
};

export const updateVideoController = (req: Request<VideoParamType, any, InputUpdateVideoType>, res: Response<OutputErrorsType>) => {
  const errors = inputValidation(req.body);
  console.log("error:", errors);
  
  if (errors.errorsMessages.length) {
    // если есть ошибки - отправляем ошибки
    res.status(400).json(errors);
    return;
  }

  // если всё ок - uptade видео
  const updatedVideos = db.videos.map((el) =>
    el.id === +req.params.id
      ? {
          ...el,
          title: req.body.title,
          author: req.body.author,
          availableResolutions: [...req.body.availableResolutions],
          canBeDownloaded: req.body.canBeDownloaded,
          minAgeRestriction: req.body.minAgeRestriction,
          publicationDate: req.body.publicationDate,
        }
      : el
  );

  db.videos = updatedVideos
  res.sendStatus(204);
 
};
