import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyFormbody from "@fastify/formbody";
import fastifyMultipartbody from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifyCookie from "@fastify/cookie";
import fastifySwaggerUi from "@fastify/swagger-ui";
import swaggerConfig from "../config/swagger.config.js";
import awsRoutes from "../api/controllers/api.controller.js";
export default async (fastify, _options) => {
  fastify.register(fastifyCors, {
    origin: "*",
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  });

  fastify.register(fastifyHelmet);
  fastify.register(fastifyCookie);
  fastify.register(fastifyFormbody);
  fastify.register(fastifyMultipartbody);


  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
  };

  fastify.register(fastifySwagger, swaggerConfig);
  fastify.register(fastifySwaggerUi, swaggerUiOptions);

  fastify.addHook("onError", async (request, reply, error) => {
    fastify.log.error(error);
    reply.code(500).send({
      resultMessage: error.message,
      resultCode: 500,
    });
  });

  fastify.register(awsRoutes, { prefix:'/aws' });

  fastify.register((app, options, done) => {
    app.get("/", {
      schema: {
        tags: ["Default"],
        response: {
          200: {
            type: "string",
           example:'Ok',
          },
        },
      },
      handler: (req, res) => {
        res.send("Server is running..");
      },
    });
    done();
  });


  fastify.setNotFoundHandler(async (request, reply) => {
    const error = new Error("Endpoint could not be found!");
    reply.code(404).send({
      resultMessage: error.message,
      resultCode: 404,
    });
  });
};
