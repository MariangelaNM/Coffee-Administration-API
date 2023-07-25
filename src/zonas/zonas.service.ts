import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Validators } from 'src/helpers/Validators';
import { CreateZonaDto, ZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { ZonasRepository } from './zonas.repository';

@Injectable()
export class ZonasService {
  constructor(
    private readonly ZonaRepository: ZonasRepository,
    private readonly validators: Validators,
  ) {}

  async create(createZonaDto: CreateZonaDto) {
    try {
      this.validators.ValidatePayloadKeys(createZonaDto);

      return await this.ZonaRepository.createZona(createZonaDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getByFinca(createZonaDto: ZonaDto) {
    try {
      const Zona = await this.ZonaRepository.getZonaByFincaID(
        createZonaDto.FincaID,
      );
      if (!Zona) {
        throw new HttpException(
          `No existe zonas para  la Finca ${createZonaDto.FincaID}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return Zona;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: number) {
    try {
      const Zona = await this.ZonaRepository.getZonaById(id);
      if (!Zona) {
        throw new HttpException(
          `No existe la Zona con el ID ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return Zona;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateZona(id: number, updateZonaDto: UpdateZonaDto) {
    try {
      this.validators.ValidatePayloadKeys(updateZonaDto);

      let Zona = await this.ZonaRepository.getZonaById(id);

      Zona = {
        ...Zona,
        ...updateZonaDto,
      };

      Zona.Nombre = Zona.Nombre.trim();
      Zona.Descripcion = Zona.Descripcion.trim();

      return this.ZonaRepository.updateZona(Zona);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteZona(id: number) {
    try {
      const Zona = await this.ZonaRepository.getZonaById(id);
      if (!Zona) {
        throw new HttpException(
          `No existe la Zona con el ID ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.ZonaRepository.deleteZona(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
