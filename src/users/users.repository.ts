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
    try {
      const user = this.userRepository.create({
        ...createUserDto,
      });

      user.Nombres = user.Nombres.trim();
      user.Apellidos = user.Apellidos.trim();
      user.createdAt = new Date();
      user.updatedAt = user.createdAt;

      const result = await this.userRepository.save(user);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(Id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { Id } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      const updateUser = await this.userRepository.save(user);
      return updateUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({
        Correo: email,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(user: User): Promise<boolean> {
    try {
      const result = await this.userRepository.delete(user.Id);
      return result.affected > 0;
    } catch (error) {
      throw error;
    }
  }
}
