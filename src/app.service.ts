import { Inject, Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import type { StoryRequestBody } from './app.interface';
import { PromptGenerator } from './prompt/generator.service';

@Injectable()
export class AppService {
  private openai: OpenAIApi;
  @Inject() private promptGenerator: PromptGenerator;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_TOKEN,
    });
    this.openai = new OpenAIApi(configuration);
  }
  getHello(): string {
    return 'Hello World!';
  }

  public async createAcceptanceCriteria(body: StoryRequestBody): Promise<any> {
    const chat_completion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 1,
      messages: [
        ...this.promptGenerator.generateSystemAssignment(
          body.ticketType,
          body.industry,
          body.role,
        ),
        ...this.promptGenerator.generateScenarioPrompt(body),
      ],
    });
    return chat_completion.data.choices[0].message.content;
  }
}
