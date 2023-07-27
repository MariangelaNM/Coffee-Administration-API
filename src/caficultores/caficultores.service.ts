import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CaficultoresRepository } from './caficultores.repository';
import { CreateCaficultorDto } from './dto/create-caficultor.dto';
import { UpdateCaficultoreDto } from './dto/update-caficultor.dto';

@Injectable()
export class CaficultoresService {

  constructor(
    private readonly caficultoresRepository: CaficultoresRepository,
    private readonly usersService: UsersService,
  ) { }

  async create(createCaficultorDto: CreateCaficultorDto) {
    try {

      await this.validateCaficultor(createCaficultorDto);

      const newUser: CreateUserDto = {
        Correo: createCaficultorDto.Correo,
        Contrasena: createCaficultorDto.Contrasena,
        Role: createCaficultorDto.Role,
      }

      const user = await this.usersService.createUser(newUser);

      return await this.caficultoresRepository.createCaficultor(createCaficultorDto, user.Id);

    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async validateCaficultor(createCaficultorDto: CreateCaficultorDto) {
    try {
      const user = await this.usersService.getUserByEmail(createCaficultorDto.Correo);
      const caficultor = await this.caficultoresRepository.getCaficultorByFullName(createCaficultorDto);

      if (user) {
        throw new HttpException(
          `Ya esta registrado un caficultor con el correo ${createCaficultorDto.Correo}`,
          HttpStatus.CONFLICT,
        );
      } else if (caficultor) {
        throw new HttpException(
          `Ya esta registrado un caficultor con el nombre ${createCaficultorDto.Nombre} ${createCaficultorDto.Apellidos}`,
          HttpStatus.CONFLICT,
        );
      }
    }
    catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateCaficultoreDto: UpdateCaficultoreDto) {

    try {
      let existingCaficultor = await this.caficultoresRepository.getCaficultorById(id);

      if (!existingCaficultor) {
        throw new HttpException(
          `No existe un caficultor con el id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      let user = await this.usersService.getUserByEmail(updateCaficultoreDto.Correo);

      user = {
        ...user,
        ...updateCaficultoreDto,
      };

      if (await this.usersService.updateUser(user.Correo, user)) {

        existingCaficultor = {
          ...existingCaficultor,
          ...updateCaficultoreDto,
        };

        return this.caficultoresRepository.updateCaficultor(existingCaficultor);
      }
    }
    catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
