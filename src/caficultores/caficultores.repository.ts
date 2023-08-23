import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCaficultorDto } from "./dto/create-caficultor.dto";
import { Caficultor } from "./entities/caficultor.entity";

export class CaficultoresRepository {
    constructor(
        @InjectRepository(Caficultor)
        private readonly caficultorRepository: Repository<Caficultor>,
    ) { }

    async createCaficultor(createCaficultorDto: CreateCaficultorDto, userId: number) {
        try {

            const caficultor = this.caficultorRepository.create({
                ...createCaficultorDto,
            });

            caficultor.createdAt = new Date();
            caficultor.updatedAt = caficultor.createdAt;
            caficultor.UsuarioID = userId;

            const result = await this.caficultorRepository.save(caficultor);

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getCaficultorByFullName(createCaficultorDto: CreateCaficultorDto) {
        try {
            const caficultor = await this.caficultorRepository.findOne({
                where:
                {
                    Apellidos: createCaficultorDto.Apellidos,
                    Nombre: createCaficultorDto.Nombre
                }
            });

            return caficultor;
        } catch (error) {
            throw error;
        }
    }

    async updateCaficultor(caficultor: Caficultor): Promise<Caficultor> {
        try {
            caficultor.updatedAt = new Date();
            const updateCaficultor = await this.caficultorRepository.save(caficultor);
            return updateCaficultor;
        } catch (error) {
            throw error;
        }
    }

    async getCaficultorById(Id: number): Promise<Caficultor> {
        try {
            const caficultor = await this.caficultorRepository.findOne({ where: { Id } });
            return caficultor;
        } catch (error) {
            throw error;
        }
    }

    async getCaficultorByUserId(UsuarioID: number): Promise<Caficultor> {
        try {
            const caficultor = await this.caficultorRepository.findOne({ where: { UsuarioID } });
            return caficultor;
        } catch (error) {
            throw error;
        }
    }
}