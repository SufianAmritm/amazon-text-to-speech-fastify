import createError from "@fastify/error";
export default async function errorModel(code, message) {
  const error = createError("ERROR_CODE", message,code);
  return new error;
}
