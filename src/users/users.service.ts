import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Validators } from 'src/helpers/Validators';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly coffeeCrypto: CoffeeCrypto,
    private readonly validators: Validators,
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      this.validators.ValidatePayloadKeys(createUserDto);

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
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(email: string, updateUserDto: UpdateUserDto) {
    try {
      this.validators.ValidatePayloadKeys(updateUserDto);

      let user = await this.userRepository.getUserByEmail(email);

      if (!user) {
        throw new HttpException(
          `No existe un usuario con el correo ${updateUserDto.Correo}`,
          HttpStatus.NOT_FOUND,
        );
      }

      updateUserDto.Contrasena = await this.coffeeCrypto.HashPassword(
        updateUserDto.Contrasena,
      );

      user = {
        ...user,
        ...updateUserDto,
      };

      user.updatedAt = new Date();

      return this.userRepository.updateUser(user);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(email: string) {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      if (!user) {
        throw new HttpException(
          `No existe un usuario con el correo ${email}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return this.userRepository.deleteUser(user);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      return user;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.getUserById(id);

      return user;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
