import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { PeriodosRepository } from './periodos.repository';

@Injectable()
export class PeriodosService {

  constructor(
    private readonly periodoRepository: PeriodosRepository,
  ) { }

  async create(createPeriodoDto: CreatePeriodoDto) {
    try {
      if (await this.periodoRepository.getPeriodoByCompositeKey(createPeriodoDto)) {
        throw new HttpException(
          'Ya existe un periodo con los mismos datos.',
          HttpStatus.CONFLICT,
        );
      }

      createPeriodoDto.Desde = new Date(createPeriodoDto.Desde);
      createPeriodoDto.Hasta = new Date(createPeriodoDto.Hasta);

      return await this.periodoRepository.createPeriodo(createPeriodoDto);

    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCaficultorId(caficultorID: number) {
    try {
      return await this.periodoRepository.getPeriodosByCaficultor(caficultorID);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      return await this.periodoRepository.getPeriodoById(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updatePeriodoDto: UpdatePeriodoDto) {
    try {

      let oldPeriodo = await this.periodoRepository.getPeriodoById(+id);

      if (!oldPeriodo) {
        throw new HttpException(`No existe el periodo con id ${id}.`, HttpStatus.NOT_FOUND,);
      }

      oldPeriodo = {
        ...oldPeriodo,
        ...updatePeriodoDto,
      };

      return await this.periodoRepository.updatePeriodo(oldPeriodo);

    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {

      const currentPeriodo = await this.periodoRepository.getPeriodoById(id);

      if (!currentPeriodo) {
        throw new HttpException(`No existe el periodo.`, HttpStatus.NOT_FOUND,);
      }

      return this.periodoRepository.deletePeriodo(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
