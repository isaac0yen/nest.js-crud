import { Injectable, OnModuleInit } from '@nestjs/common';
import { DBConnect, DBObject } from './db.utils';

@Injectable()
export class DbService implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    await DBConnect();
  }

  async transaction() {
    return await DBObject.transaction();
  }

  // Add other methods from DBObject here
}
