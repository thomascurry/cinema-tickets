import app from './app.js';
import logger from './logger.js';

app.listen(3000, (err) => {
    if (err) throw err;
    logger.info("> Ready on localhost:3000");
});