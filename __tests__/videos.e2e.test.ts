import { req } from "./test-helpers";
import { db, setDB } from "../src/db/db";
import { dataset1 } from "./datasets";
import { SETTINGS } from "../src/settings";
import { InputVideoType, Resolutions } from "../src/input-output-types/video-types";

describe("/videos", () => {
  beforeAll(async () => {
    // очистка базы данных перед началом тестирования
    setDB();
  });

  it("should get empty array", async () => {
    setDB(); // очистка базы данных если нужно

    const res = await req.get(SETTINGS.PATH.VIDEOS).expect(200); // проверяем наличие эндпоинта
    expect(res.body.length).toBe(0); // проверяем ответ эндпоинта
  });

  it("should get not empty array", async () => {
    setDB(dataset1); // заполнение базы данных начальными данными если нужно

    const res = await req.get(SETTINGS.PATH.VIDEOS).expect(200);

    expect(res.body.length).toBe(1);
    expect(res.body[0]).toEqual(dataset1.videos[0]);
  });

  it("should create", async () => {
    setDB();
    const frontVideo: InputVideoType = {
      title: "t1",
      author: "a1",
      availableResolutions: [Resolutions.P144],
    };

    const res = await req
      .post(SETTINGS.PATH.VIDEOS)
      .send(frontVideo) // отправка данных
      .expect(201);

    expect(res.body.title).toEqual(frontVideo.title);
    expect(res.body.author).toEqual(frontVideo.author);
    expect(res.body.availableResolutions).toEqual(frontVideo.availableResolutions);
  });

  it("shouldn't create", async () => {
    setDB();
    const frontVideo: InputVideoType = {
      title: "t1",
      author: "qwertyuioasdfghjkzxcvbnmhhhhggfcccc",
      availableResolutions: [Resolutions.P144],
    };

    const res = await req
    .post(SETTINGS.PATH.VIDEOS)
    .send(frontVideo) // отправка данных
    .expect(400);

    expect(res.body.errorsMessages.length).toBe(1);
    expect(res.body.errorsMessages[0].field).toEqual('author');
  });

  it('shouldn\'t find video', async () => {
      setDB(dataset1)

      const res = await req.get(SETTINGS.PATH.VIDEOS + '/1').expect(404) // проверка на ошибку
  });

  it('should find video', async () => {
    setDB(dataset1)

    const res = await req.get(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id).expect(200)
    expect(res.body.id).toEqual(dataset1.videos[0].id)
  })

  it('should delete video', async () => {
    setDB()
    setDB(dataset1)

    const res = await req.delete(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id).expect(204)
    expect(db.videos.length).toBe(0)
  })

  it('shouldn\'t delete video', async () => {
    setDB()

    const res = await req.delete(SETTINGS.PATH.VIDEOS + '/1').expect(404)
  })

  it('shouldn\'t delete video', async () => {
    setDB()

    const res = await req.delete(SETTINGS.PATH.VIDEOS + '/1').expect(404)
  })

  it('should update video', async () => {
    setDB()
    setDB(dataset1)

    //const currentData = new Date().toISOString()

    const validInput = {
      title: 'New Title',
      author: 'New Author',
      availableResolutions: [Resolutions.P144],
      canBeDownloaded: true,
      minAgeRestriction: 18,
      publicationDate: "2024-09-15T14:32:06.608Z",
    };

    const res = await req.put(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id).send(validInput).expect(204)
    console.log(res.body);
    expect(db.videos[0].title).toBe(validInput.title)
    expect(db.videos[0].author).toBe(validInput.author)
    expect(db.videos[0].availableResolutions.length).toBe(1)
    expect(db.videos[0].canBeDownloaded).toBe(validInput.canBeDownloaded)
    expect(db.videos[0].minAgeRestriction).toBe(validInput.minAgeRestriction)
    expect(db.videos[0].publicationDate).toBe(validInput.publicationDate)
  })

});
