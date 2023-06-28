//users typerorm repository
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.insert({
      Correo: createUserDto.Correo,
      Contrasena: createUserDto.Contrasena,
      Role: createUserDto.Role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return true;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(Id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { Id } });
    return user;
  }

  async updateUser(id: number, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    const updateUser = Object.assign(user, createUserDto);
    await this.userRepository.save(updateUser);
    return updateUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { Correo: email },
    });
    return user;
  }
}
