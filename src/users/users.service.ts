import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(user: User) {
    return this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  store(user: User) {
    return this.create(user);
  }

  findBy({ where }) {
    return this.users.filter((user) => {
      return where.some((condition) => {
        return (
          user[Object.keys(condition)[0]] ===
          condition[Object.keys(condition)[0]]
        );
      });
    });
  }
}
