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
        throw new Error('Ya existe un periodo con los mismos datos');
      }

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

  async update(updatePeriodoDto: UpdatePeriodoDto) {
    try {

      let oldPeriodo = await this.periodoRepository.getPeriodoByCompositeKey(updatePeriodoDto);

      if (!oldPeriodo) {
        throw new HttpException(`No existe el periodo.`, HttpStatus.NOT_FOUND,);
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
