import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello TFM - Grupo 4 - Coffee Analytics!';
  }
}
