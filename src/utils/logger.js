import { Log } from '../models/index.js';

export default async (code, userId, errorMessage, level, req) => {

  let log = new Log({
    resultCode: code,
    level: level,
    errorMessage: errorMessage,
  });
  await log.save()
    .catch(err => {
      console.log('Logging is failed: ' + err);
    });
}
