import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecolectorDto } from './dto/create-recolectore.dto';
import { UpdateRecolectorDto } from './dto/update-recolectore.dto';
import { RecolectoresRepository } from './recolectores.repository';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { Validators } from 'src/helpers/Validators';

@Injectable()
export class RecolectoresService {
  constructor(
    private readonly recolectorRepository: RecolectoresRepository,
    private readonly coffeeCrypto: CoffeeCrypto,
    private readonly validators: Validators,
  ) {}

  async create(createRecolectorDto: CreateRecolectorDto) {
    try {
      this.validators.ValidatePayloadKeys(createRecolectorDto);

      if (
        await this.recolectorRepository.getRecolectorByIdentificacion(
          createRecolectorDto.Identificacion,
        )
      ) {
        throw new HttpException(
          `Ya existe un recolector con la Identificacion ${createRecolectorDto.Identificacion}`,
          HttpStatus.CONFLICT,
        );
      }

      return await this.recolectorRepository.createRecolector(
        createRecolectorDto,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.recolectorRepository.getAllRecolectores();
  }

  async findAllByCaficultor(caficultorId: number) {
    const recolectores =
      await this.recolectorRepository.getRecolectoresByCaficultorId(
        caficultorId,
      );
    if (!recolectores || recolectores.length === 0) {
      throw new HttpException(
        `No existen recolectores asociados al caficultor con ID ${caficultorId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return recolectores;
  }

  async findOneById(id: number) {
    const recolector = await this.recolectorRepository.getRecolectorById(id);
    if (!recolector) {
      throw new HttpException(
        `No existe un recolector con el ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return recolector;
  }

  async update(Id: number, updateRecolectorDto: UpdateRecolectorDto) {
    try {
      this.validators.ValidatePayloadKeys(updateRecolectorDto);

      const recolector = await this.recolectorRepository.getRecolectorById(Id);

      if (!recolector) {
        throw new HttpException(
          `No existe un recolector con el ID ${Id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Actualiza solo los campos proporcionados en updateRecolectorDto
      if (updateRecolectorDto.Nombre) {
        recolector.Nombre = updateRecolectorDto.Nombre.trim();
      }
      if (updateRecolectorDto.Apellidos) {
        recolector.Apellidos = updateRecolectorDto.Apellidos.trim();
      }
      if (updateRecolectorDto.Identificacion) {
        recolector.Identificacion = updateRecolectorDto.Identificacion.trim();
      }
      if (updateRecolectorDto.Cel) {
        recolector.Cel = updateRecolectorDto.Cel;
      }

      // Actualiza otros campos aquí si es necesario

      return this.recolectorRepository.updateRecolector(recolector);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRecolectorNameAndApellidoById(
    id: number,
  ): Promise<{ nombre: string; apellido: string }> {
    const recolector = await this.recolectorRepository.getRecolectorById(id);
    if (!recolector) {
      throw new HttpException(
        `No existe un recolector con el ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { nombre: recolector.Nombre, apellido: recolector.Apellidos }; // Devuelve el nombre y apellido del recolector
  }

  async deleterecolector(id: number) {
    try {
      const recolector = await this.recolectorRepository.getRecolectorById(id);
      if (!recolector) {
        throw new HttpException(
          `No existe el recoletor con el ID ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.recolectorRepository.deleteRecolector(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
