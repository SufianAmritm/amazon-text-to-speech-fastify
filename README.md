# Amazon Text-to-Speech API (Fastify)

API that turns text into speech with **AWS Polly** and streams the audio file back to the client.

This repo is one of three versions of the same service, built to compare frameworks:
- [Express](https://github.com/SufianAmritm/amazon-text-to-speech-express)
- [NestJS](https://github.com/SufianAmritm/amazon-text-to-speech-nestjs)
- [Fastify](https://github.com/SufianAmritm/amazon-text-to-speech-fastify)

## Features
- Send text, get an audio stream back
- AWS Polly via the AWS SDK
- Swagger API docs

## Tech
Node.js · Fastify · AWS Polly · Swagger

## Run

```bash
npm install
# set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env
npm run start
```
