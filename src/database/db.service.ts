import { Injectable, OnModuleInit } from '@nestjs/common';
import { DBConnect, DBObject } from './db.utils';

@Injectable()
export class DbService implements OnModuleInit {
  async onModuleInit() {
    await DBConnect();
  }
  async transaction() {
    return await DBObject.transaction();
  }

  async commit() {
    return await DBObject.commit();
  }

  async rollback() {
    return await DBObject.rollback();
  }

  async query(sql: string) {
    return await DBObject.query(sql);
  }

  async insertOne(tableName: string, data: object) {
    return await DBObject.insertOne(tableName, data);
  }

  async insertMany(tableName: string, data: object[]) {
    return await DBObject.insertMany(tableName, data);
  }

  async updateOne(tableName: string, data: object, condition: object) {
    return await DBObject.updateOne(tableName, data, condition);
  }

  async updateMany(tableName: string, data: object, condition: object) {
    return await DBObject.updateMany(tableName, data, condition);
  }

  async updateDirect(query: string, params?: object) {
    return await DBObject.updateDirect(query, params);
  }

  async deleteOne(tableName: string, condition: object) {
    return await DBObject.deleteOne(tableName, condition);
  }

  async deleteMany(tableName: string, condition: object) {
    return await DBObject.deleteMany(tableName, condition);
  }

  async deleteDirect(query: string, condition?: object) {
    return await DBObject.deleteDirect(query, condition);
  }

  async findOne(tableName: string, condition?: object, options?: object) {
    return await DBObject.findOne(tableName, condition, options);
  }

  async findMany(tableName: string, condition?: object, options?: object) {
    return await DBObject.findMany(tableName, condition, options);
  }

  async findDirect(query: string, condition?: object) {
    return await DBObject.findDirect(query, condition);
  }

  async upsertOne(tableName: string, data: object) {
    return await DBObject.upsertOne(tableName, data);
  }

  async upsertMany(tableName: string, data: object[]) {
    return await DBObject.upsertMany(tableName, data);
  }

  async insertIgnoreOne(tableName: string, data: object) {
    return await DBObject.insertIgnoreOne(tableName, data);
  }

  async insertIgnoreMany(tableName: string, data: object[]) {
    return await DBObject.insertIgnoreMany(tableName, data);
  }

  async executeDirect(query: string) {
    return await DBObject.executeDirect(query);
  }
}
