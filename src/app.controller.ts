import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create/story')
  createStory(@Body() body: any): any {
    return this.appService.createAcceptanceCriteria(body);
  }
}
