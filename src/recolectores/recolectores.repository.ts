import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecolectorDto } from './dto/create-recolectore.dto';
import { Recolector } from './entities/recolectore.entity';

export class RecolectoresRepository {
  constructor(
    @InjectRepository(Recolector)
    private readonly recolectorRepository: Repository<Recolector>,
  ) { }

  async createRecolector(createRecolectorDto: CreateRecolectorDto): Promise<Recolector> {
    const recolector = this.recolectorRepository.create({
      ...createRecolectorDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.recolectorRepository.save(recolector);
  }

  async getAllRecolectores(): Promise<Recolector[]> {
    return this.recolectorRepository.find();
  }

  async getRecolectorById(id: number): Promise<Recolector> {
    return this.searchRecolectorById(id);
  }

  async getRecolectorByIdentificacion(Identificacion: string): Promise<Recolector> {
    return this.searchRecolectorByIdentificacion(Identificacion);
  }

  async updateRecolector(recolector: Recolector): Promise<Recolector> {
    return this.recolectorRepository.save(recolector);
  }

  async deleteRecolector(id: number): Promise<void> {
    await this.recolectorRepository.delete(id);
  }

  private async searchRecolectorById(id: number): Promise<Recolector> {
    return this.recolectorRepository.findOne({
      where: [{ "Id":id }]
    });
  }

  private async searchRecolectorByIdentificacion(Identificacion: string): Promise<Recolector> {
    return this.recolectorRepository.findOne({
      where: [{ Identificacion }]
    });
  }
  
}