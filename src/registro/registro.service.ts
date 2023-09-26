// registro.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Validators } from 'src/helpers/Validators';
import { CoffeeCrypto } from 'src/helpers/bycript/CoffeeCrypto';
import { Repository } from 'typeorm';
import { CreateRegistroRecoleccionDto } from './dto/create-registro.dto';
import { RegistroRecoleccion } from './entities/registro.entity';
import { RegistroNotFoundException } from './registro.exceptions';

@Injectable()
export class RegistroService {
  constructor(
    @InjectRepository(RegistroRecoleccion)
    private readonly registroRepository: Repository<RegistroRecoleccion>,
    private readonly coffeeCrypto: CoffeeCrypto,
    private readonly validators: Validators,
  ) {}

  async createRegistroRecoleccion(
    createRegistroDto: CreateRegistroRecoleccionDto,
  ): Promise<RegistroRecoleccion> {
    try {
      // Intenta crear el registro de recolección
      const registro = this.registroRepository.create(createRegistroDto);
      return await this.registroRepository.save(registro);
    } catch (error) {
      // Si ocurre un error, maneja las excepciones
      if (error.code === '23502') {
        // Esto maneja el error de restricción de no nulo en la base de datos
        throw new ConflictException(
          'No se pudo crear el registro de recolección. Uno o más campos obligatorios son nulos.',
        );
      } else {
        console.error('Error al crear el registro:', error);
        throw new Error('No se pudo crear el registro de recolección.');
      }
    }
  }

  async updateRegistroRecoleccion(
    id: number,
    updateRegistroDto: CreateRegistroRecoleccionDto,
  ): Promise<RegistroRecoleccion> {
    // Implementa la lógica para actualizar un registro de recolección de café por su ID
    const findOptions = {
      where: { Id: id },
    };

    const registro = await this.registroRepository.findOne(findOptions);

    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado.`);
    }

    // Actualizar los campos relevantes del registro aquí
    registro.ZonaID = updateRegistroDto.ZonaID;
    registro.PeriodoID = updateRegistroDto.PeriodoID;
    registro.RecolectorID = updateRegistroDto.RecolectorID;
    registro.Cajuelas = updateRegistroDto.Cajuelas;
    registro.Cuartillos = updateRegistroDto.Cuartillos;

    return await this.registroRepository.save(registro);
  }

  async deleteRegistroRecoleccion(id: number): Promise<void> {
    // Implementa la lógica para eliminar un registro de recolección de café por su ID
    const findOptions = {
      where: { Id: id },
    };

    const registro = await this.registroRepository.findOne(findOptions);

    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado.`);
    }

    await this.registroRepository.remove(registro);
  }

  async findRegistrosRecoleccionByRegistroId(
    registroId: number,
  ): Promise<RegistroRecoleccion[]> {
    // Implementa la lógica para obtener todos los registros de recolección de café de un registro principal
    return await this.registroRepository.find({ where: { Id: registroId } });
  }

  async findRegistrosByPeriodo(
    periodoId: number,
  ): Promise<RegistroRecoleccion[]> {
    return await this.registroRepository.find({
      where: { PeriodoID: periodoId }, // Filtra por el ID del periodo
    });
  }

  async findRegistrosByZona(zonaId: number): Promise<RegistroRecoleccion[]> {
    return await this.registroRepository.find({
      where: { ZonaID: zonaId }, // Filtra por el ID de la zona
    });
  }

  async findRegistrosByRecolector(
    recolectorId: number,
  ): Promise<RegistroRecoleccion[]> {
    return await this.registroRepository.find({
      where: { RecolectorID: recolectorId }, // Filtra por el ID del recolector
    });
  }

  async findRegistrosByRecolectorAndFecha(
    recolectorId: number,
    fecha: string,
  ): Promise<RegistroRecoleccion[]> {
    // Convierte la cadena de fecha al formato "YYYY-MM-DD"
    const fechaParts = fecha.split('/');
    const fechaDate = new Date(
      `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`,
    );

    const registros = await this.registroRepository.find({
      where: {
        RecolectorID: recolectorId, // Filtra por el ID del recolector
        Creado: fechaDate, // Usa la fecha convertida
      },
    });

    if (!registros || registros.length === 0) {
      throw new RegistroNotFoundException(); // Lanza la excepción personalizada si no se encontraron registros
    }

    return registros;
  }

  async findResumenDiario(): Promise<any> {
    // Implementa la lógica para obtener un resumen diario del total de café recolectado por cada recolector
    // Devuelve los resultados como sea necesario
  }

  async findResumenSemanal(): Promise<any> {
    // Implementa la lógica para obtener un resumen semanal del total de café recolectado por cada recolector
    // Devuelve los resultados como sea necesario
  }
}
