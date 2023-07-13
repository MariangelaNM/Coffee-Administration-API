import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Validators } from 'src/helpers/Validators';
import { CreateFincaDto } from './dto/create-finca.dto';
import { UpdateFincaDto } from './dto/update-finca.dto';
import { FincasRepository } from './fincas.repository';

@Injectable()
export class FincasService {
  constructor(
    private readonly fincaRepository: FincasRepository,
    private readonly validators: Validators,
  ) {}

  async create(createfincaDto: CreateFincaDto) {
    try {
      this.validators.ValidatePayloadKeys(createfincaDto);

      return await this.fincaRepository.createFinca(createfincaDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatefinca(id: number, updatefincaDto: UpdateFincaDto) {
    try {
      this.validators.ValidatePayloadKeys(updatefincaDto);

      let finca = await this.fincaRepository.getFincaById(id);

      
      finca = {
        ...finca,
        ...updatefincaDto,
      };

      finca.Nombre = finca.Nombre.trim();
      finca.Ubicacion = finca.Ubicacion.trim();
      finca.Descripcion = finca.Descripcion.trim();

      return this.fincaRepository.updateFinca(finca);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletefinca(id: number) {
    try {
      const finca = await this.fincaRepository.getFincaById(id);
      if (!finca) {
        throw new HttpException(
          `No existe la finca con el ID ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.fincaRepository.deleteFinca(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
