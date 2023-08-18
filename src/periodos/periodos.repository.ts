import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePeriodoDto } from "./dto/create-periodo.dto";
import { UpdatePeriodoDto } from "./dto/update-periodo.dto";
import { Periodo } from "./entities/periodo.entity";

export class PeriodosRepository {
    constructor(
        @InjectRepository(Periodo)
        private readonly periodoRepository: Repository<Periodo>,
    ) { }

    async createPeriodo(createPeriodoDto: CreatePeriodoDto) {
        try {
            const periodo = this.periodoRepository.create({
                ...createPeriodoDto,
            });

            periodo.createdAt = new Date();
            periodo.updatedAt = periodo.createdAt;

            const result = await this.periodoRepository.save(periodo);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getPeriodoById(Id: number): Promise<Periodo> {
        try {
            const periodo = await this.periodoRepository.findOne({ where: { Id } });
            return periodo;
        } catch (error) {
            throw error;
        }
    }

    async getPeriodoByCompositeKey(currentPeriodo: CreatePeriodoDto | UpdatePeriodoDto): Promise<Periodo> {
        try {
            const periodo = await this.periodoRepository.findOne({
                where: {
                    CaficultorID: currentPeriodo.CaficultorID,
                    TipoRecoleccionID: currentPeriodo.TipoRecoleccionID,
                    Desde: currentPeriodo.Desde,
                    Hasta: currentPeriodo.Hasta,
                },
            });
            return periodo;
        } catch (error) {
            throw error;
        }
    }

    async getPeriodosByCaficultor(caficultorID: number): Promise<Periodo[]> {
        try {
            const periodos = await this.periodoRepository.find({
                where: { CaficultorID: caficultorID },
            });
            return periodos;
        } catch (error) {
            throw error;
        }
    }

    async updatePeriodo(periodo: Periodo): Promise<Periodo> {
        try {
            periodo.updatedAt = new Date();
            const updatePeriodo = await this.periodoRepository.save(periodo);
            return updatePeriodo;
        } catch (error) {
            throw error;
        }
    }

    async deletePeriodo(Id: number): Promise<void> {
        try {
            await this.periodoRepository.delete({ Id });
        } catch (error) {
            throw error;
        }
    }
}