import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServerstatus(): string {
    return this.appService.getServerStatus();
  }
}

//HTTP GET
