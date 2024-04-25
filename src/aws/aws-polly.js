import AWS from '@aws-sdk/client-polly'
import  client from './client.js'

export async function createAudio(input) {
  const voice = await client.send(new AWS.SynthesizeSpeechCommand(input));
  if (voice instanceof Error) {
    console.log(voice);
    throw new Error(voice.message);
  }
  return voice;
}
