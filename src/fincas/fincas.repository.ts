import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFincaDto } from './dto/create-finca.dto';
import { Finca } from './entities/finca.entity';

export class FincasRepository {
  constructor(
    @InjectRepository(Finca)
    private readonly fincaRepository: Repository<Finca>,
  ) {}

  async createFinca(createFincaDto: CreateFincaDto) {
    try {
      const finca = this.fincaRepository.create({
        ...createFincaDto,
      });

      finca.Nombre = finca.Nombre.trim();
      finca.Descripcion = finca.Descripcion.trim();
      finca.Ubicacion = finca.Ubicacion.trim();
      finca.CaficultorID = finca.CaficultorID;

      const result = await this.fincaRepository.save(finca);
      return result;
      
    } catch (error) {
      throw error;
    }
  }

  async getFincas(): Promise<Finca[]> {
    try {
      const Fincas = await this.fincaRepository.find();
      return Fincas;
    } catch (error) {
      throw error;
    }
  }

  async getFincaById(Id: number): Promise<Finca> {
    try {
      const finca = await this.fincaRepository.findOne({ where: { Id } });
      return finca;
    } catch (error) {
      throw error;
    }
  }

  async updateFinca(finca: Finca): Promise<Finca> {
    try {
      const updateFinca = await this.fincaRepository.save(finca);
      return updateFinca;
    } catch (error) {
      throw error;
    }
  }

  async deleteFinca(Id: number): Promise<boolean> {
    try {
      const result = await this.fincaRepository.delete(Id);
      return result.affected > 0;
    } catch (error) {
      throw error;
    }
  }
}
