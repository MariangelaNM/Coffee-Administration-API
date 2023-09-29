// registro.controller.ts
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroRecoleccionDto } from './dto/create-registro.dto';
import { RegistroRecoleccion } from './entities/registro.entity';
import { CoffeeKeyGuard } from 'src/guards/coffee-key/coffee-key.guard';
import { RegistroNotFoundException } from './registro.exceptions';

@UseGuards(CoffeeKeyGuard)
@Controller('registros')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  async create(
    @Body() createRegistroDto: CreateRegistroRecoleccionDto,
  ): Promise<RegistroRecoleccion> {
    return await this.registroService.createRegistroRecoleccion(
      createRegistroDto,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRegistroDto: CreateRegistroRecoleccionDto,
  ): Promise<RegistroRecoleccion> {
    return await this.registroService.updateRegistroRecoleccion(
      id,
      updateRegistroDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    await this.registroService.deleteRegistroRecoleccion(id);
    return `Registro con ID ${id} fue eliminado exitosamente.`;
  }

  @Get(':registroId/recolecciones')
  async findRegistrosRecoleccionByRegistroId(
    @Param('registroId') registroId: number,
  ): Promise<RegistroRecoleccion[]> {
    return await this.registroService.findRegistrosRecoleccionByRegistroId(
      registroId,
    );
  }

  @Get('periodos/:periodoId')
  async findRegistrosByPeriodo(
    @Param('periodoId') periodoId: number,
  ): Promise<RegistroRecoleccion[]> {
    return await this.registroService.findRegistrosByPeriodo(periodoId);
  }

  @Get('zonas/:zonaId')
  async findRegistrosByZona(
    @Param('zonaId') zonaId: number,
  ): Promise<RegistroRecoleccion[]> {
    return await this.registroService.findRegistrosByZona(zonaId);
  }

  @Get('recolectores/:recolectorId')
  async findRegistrosByRecolector(
    @Param('recolectorId') recolectorId: number,
  ): Promise<RegistroRecoleccion[]> {
    return await this.registroService.findRegistrosByRecolector(recolectorId);
  }

  @Get('recolectores')
  async findRegistrosByRecolectorAndFecha(
    @Query('recolectorId') recolectorId: number,
    @Query('fecha') fecha: string,
  ) {
    try {
      const registros =
        await this.registroService.findRegistrosByRecolectorAndFecha(
          recolectorId,
          fecha,
        );
      return registros;
    } catch (error) {
      if (error instanceof RegistroNotFoundException) {
        // Maneja la excepción y devuelve una respuesta apropiada
        throw new HttpException(
          'No se encontraron registros para los criterios de búsqueda especificados.',
          HttpStatus.NOT_FOUND,
        );
      }
      // Maneja otros errores
      throw new HttpException(
        'Ocurrió un error interno en el servidor.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('resumen/diario')
  async findResumenDiario(): Promise<any> {
    return await this.registroService.findResumenDiario();
  }

  @Get('resumen/semanal')
  async findResumenSemanal(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
    @Query('recolectorId') recolectorId: number,
  ): Promise<any> {
    // Verifica si el RecolectorId es válido
    if (recolectorId) {
      const recolectorExist = await this.registroService.checkRecolectorExists(
        recolectorId,
      );
      if (!recolectorExist) {
        throw new NotFoundException(
          `El recolector con ID ${recolectorId} no existe.`,
        );
      }
    }

    // Verifica si las fechas son válidas
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);

    if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinDate.getTime())) {
      throw new BadRequestException(
        'Las fechas proporcionadas no son válidas.',
      );
    }

    return await this.registroService.findResumenSemanal(
      fechaInicio,
      fechaFin,
      recolectorId,
    );
  }
}
