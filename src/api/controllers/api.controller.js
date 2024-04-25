import { createAudio } from "../../services/api.service.js";
import errorModel from "../../utils/errors/index.js";
async function awsRoutes(fastify, options) {
  fastify.post("/", {
    schema: {
      description: "Convert text to audio",
      tags: ["AWS"],
      body: {
        type: "object",
        properties: {
          text: { type: "string" },
        },
        // required: ["text"],
      },
      response: {
        200: {
          description: "Successful conversion",
          type: "string",
          format: "binary",
        },
        400: {
          description: "Bad request",
          type: "object",
          properties: {
            error: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        console.log(request.body);
        const { text } = request.body;
        if (!text || typeof text !== "string") {
          const error = await errorModel(
            400,
            "text is required and must be a string"
          );
          throw error;
        }
        const voice = await createAudio(text);
        // reply.header("Content-disposition", "attachment; filename=audio.mp3");
        reply.type(voice.content);
        reply
          .code(200)
          .send(Buffer.from(voice.stream.buffer));

      } catch (e) {
        reply.code(e.status || 500).send({ error: e.message });
      }
    },
  });
}

export default awsRoutes;
