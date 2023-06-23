import { Injectable } from '@nestjs/common';
import {
  Configuration,
  CreateCompletionResponseChoicesInner,
  OpenAIApi,
} from 'openai';

@Injectable()
export class AppService {
  private openai: OpenAIApi;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_TOKEN,
    });
    this.openai = new OpenAIApi(configuration);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getResponse(): Promise<CreateCompletionResponseChoicesInner[]> {
    const chat_completion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [],
      // prompt: generatePrompt('cats'),
      temperature: 0.6,
    });
    return chat_completion.data.choices;
  }
}
