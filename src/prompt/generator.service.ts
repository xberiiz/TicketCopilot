import { Injectable } from '@nestjs/common';
import { ChatCompletionRequestMessage } from 'openai';
import { StoryRequestBody, TicketType, RoleType } from 'src/app.interface';

const roleMapping = {
  [RoleType.BA]: 'Business Analyst',
  [RoleType.QA]: 'Quality Analyst',
  [RoleType.Developer]: 'Software Developer',
};
const roleDetail = {
  [RoleType.BA]: `who highly skilled using Agile/Scrum methodology,
    and very expert in writing user stories
    and very detail-oriented`,
  [RoleType.QA]: `with a highly skilled in describing the scenarios to be more cleared`,
};

@Injectable()
export class PromptGenerator {
  public generateScenarioPrompt(
    body: StoryRequestBody,
  ): ChatCompletionRequestMessage[] {
    const scenarios = body.scenarios.map((scenario, index) => {
      const givens = scenario.given.join(' and ');
      const when = scenario.when.join(' and ');
      const then = scenario.then.join(' and ');
      return `
          Scenario ${index + 1}: ${scenario.scenario}
          Given ${givens}
          When ${when}
          Then ${then}
        `;
    });
    return scenarios.map<ChatCompletionRequestMessage>((scenario) => ({
      role: 'user',
      content: scenario,
    }));
  }
  public generateSystemAssignment(
    ticketType: TicketType,
    industry: string,
    role: RoleType,
  ): ChatCompletionRequestMessage[] {
    return [
      {
        role: 'system',
        content: `
          You are working as a ${roleMapping[role]} in a software department
          and are domain expert in ${industry} industry
          ${roleDetail[role]}
        `,
      },
      {
        role: 'system',
        content: `Create a single list of Acceptance Criterias of a ${TicketType[ticketType]} ticket type`,
      },
      {
        role: 'system',
        content: `
          The result should be in the format
          Acceptance Criteria [number]
          - [Detail#1]
          - [Detail#2]
          - etc.
          `,
      },
      {
        role: 'system',
        content: `
          The result should be relevant
          and very detailed
          and concise and thorough as much as possible
          and specific to contexts and scenarios below,`,
      },
    ];
  }
}
