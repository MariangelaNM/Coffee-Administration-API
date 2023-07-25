import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateZonaDto } from './dto/create-zona.dto';
import { Zona } from './entities/zona.entity';

export class ZonasRepository {
  constructor(
    @InjectRepository(Zona)
    private readonly ZonaRepository: Repository<Zona>,
  ) {}

  async createZona(createZonaDto: CreateZonaDto) {
    try {
      const Zona = this.ZonaRepository.create({
        ...createZonaDto,
      });

      Zona.Nombre = Zona.Nombre.trim();
      Zona.Descripcion = Zona.Descripcion.trim();
      Zona.FincaID = Zona.FincaID;

      const result = await this.ZonaRepository.save(Zona);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getZonas(): Promise<Zona[]> {
    try {
      const Zonas = await this.ZonaRepository.find();
      return Zonas;
    } catch (error) {
      throw error;
    }
  }

  async getZonaById(Id: number): Promise<Zona> {
    try {
      const Zona = await this.ZonaRepository.findOne({ where: { Id } });
      return Zona;
    } catch (error) {
      throw error;
    }
  }

  async getZonaByFincaID(FincaID: number): Promise<Zona[]> {
    try {
      const Zona = await this.ZonaRepository.find({
        where: { FincaID },
      });
      return Zona;
    } catch (error) {
      throw error;
    }
  }

  async updateZona(Zona: Zona): Promise<Zona> {
    try {
      const updateZona = await this.ZonaRepository.save(Zona);
      return updateZona;
    } catch (error) {
      throw error;
    }
  }

  async deleteZona(Id: number): Promise<boolean> {
    try {
      const result = await this.ZonaRepository.delete(Id);
      return result.affected > 0;
    } catch (error) {
      throw error;
    }
  }
}
