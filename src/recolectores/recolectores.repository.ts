import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecolectorDto } from './dto/create-recolectore.dto';
import { Recolector } from './entities/recolectore.entity';

export class RecolectoresRepository {
  constructor(
    @InjectRepository(Recolector)
    private readonly recolectorRepository: Repository<Recolector>,
  ) { }

  async createRecolector(createRecolectorDto: CreateRecolectorDto) {
    try {
      const recolector = this.recolectorRepository.create({
        ...createRecolectorDto,
      });

      recolector.createdAt = new Date();
      recolector.updatedAt = recolector.createdAt;

      const result = await this.recolectorRepository.save(recolector);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getRecolectores(): Promise<Recolector[]> {
    try {
      const recolectores = await this.recolectorRepository.find();
      return recolectores;
    } catch (error) {
      throw error;
    }
  }

  async getRecolectorById(Id: number): Promise<Recolector> {
    try {
      const recolector = await this.recolectorRepository.findOne({ where: { Id } });
      return recolector;
    } catch (error) {
      throw error;
    }
  }

  async updateRecolector(recolector: Recolector): Promise<Recolector> {
    try {
      const updateRecolector = await this.recolectorRepository.save(recolector);
      return updateRecolector;
    } catch (error) {
      throw error;
    }
  }

  async getRecolectorByIdentificacion(Identificacion: string): Promise<Recolector> {
    try {
      const recolector = await this.recolectorRepository.findOne({ where: { Identificacion } });
      return recolector;
    } catch (error) {
      throw error;
    }
  }

  async deleteRecolector(Id: number): Promise<boolean> {
    try {
      const result = await this.recolectorRepository.delete(Id);
      return result.affected > 0;
    } catch (error) {
      throw error;
    }
  }
}
