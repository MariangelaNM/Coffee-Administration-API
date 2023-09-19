import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiposRecoleccion } from './entities/tipos-recoleccion.entity';


export class TiposRecoleccionRepository {
    constructor(
        @InjectRepository(TiposRecoleccion)
        private readonly tiposRecoleccionRepository: Repository<TiposRecoleccion>,
    ) { }

    async getAll(): Promise<TiposRecoleccion[]> {
        try {
            const Zonas = await this.tiposRecoleccionRepository.find();
            return Zonas;
        } catch (error) {
            throw error;
        }
    }
}
