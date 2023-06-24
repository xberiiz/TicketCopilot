export enum TicketType {
  UserStory,
  Bug,
  Task,
}

export enum RoleType {
  QA,
  BA,
  Developer,
}
export interface Scenario {
  scenario: string;
  given: string[];
  when: string[];
  then: string[];
}
export interface StoryRequestBody {
  ticketType: TicketType;
  industry: string;
  role: RoleType;
  scenarios: Scenario[];
}
