import fastify from 'fastify';
import { port } from './config/index.js';
import loader from './loaders/index.js';

const app = fastify();

loader(app);

app.listen({port:port}, (err) => {
  if (err) {
    app.log.error();(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

export default fastify