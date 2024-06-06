import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/database/db.service';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DbService,
    private readonly util: UtilsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<number> {
    const newUser = await this.dbService.insertOne('user', createUserDto);
    return newUser;
  }

  async findAll(): Promise<object[]> {
    const users = await this.dbService.findMany('user');
    return users;
  }

  async findOne(id: number): Promise<object> {
    const user = await this.dbService.findOne('user', { id });

    if (!this.util.validateObject(user)) {
      console.log('user not found');
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    const updatedUser = await this.dbService.updateOne('user', updateUserDto, {
      id,
    });
    return updatedUser;
  }

  async remove(id: number): Promise<number> {
    const deletedUser = await this.dbService.deleteOne('user', { id });
    return deletedUser;
  }
}
