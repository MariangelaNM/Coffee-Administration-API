import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly coffeeCrypto: CoffeeCrypto,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.userRepository.getUserByEmail(createUserDto.Correo)) {
      throw new HttpException(
        `Ya existe un usuario con el correo ${createUserDto.Correo}`,
        HttpStatus.CONFLICT,
      );
    }

    createUserDto.Contrasena = await this.coffeeCrypto.HashPassword(
      createUserDto.Contrasena,
    );
    return await this.userRepository.createUser(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
