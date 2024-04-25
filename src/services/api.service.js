import * as pollyService from '../aws/aws-polly.js'


  export async function createAudio(text) {
    const voice = await pollyService.createAudio({
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: 'Joanna',
      Engine: 'neural',
      LanguageCode: 'en-US',
      TextType:'text'
    });

    const stream = await voice.AudioStream.transformToByteArray();

    return {
      stream: stream,
      headers: new Headers({
        'Content-Type': voice.ContentType,
      }),
      content:voice.ContentType
    };
  }
