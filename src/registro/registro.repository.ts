// registro.repository.ts
import { Repository } from 'typeorm';
import { RegistroRecoleccion } from './entities/registro.entity';


export class RegistroRecoleccionRepository extends Repository<RegistroRecoleccion> {
  async findResumenDiario(): Promise<any> {
    // Implementa la lógica para obtener un resumen diario del total de café recolectado por cada recolector
    const resumenDiario = await this.createQueryBuilder('registro')
      .select('registro.RecolectorID', 'recolectorId')
      .addSelect('SUM(registro.Cajuelas) + SUM(registro.Cuartillos * 0.25)', 'totalCafeRecolectado')
      .where('DATE(registro.Creado) = CURDATE()') // Filtra por registros del día actual
      .groupBy('registro.RecolectorID')
      .getRawMany();

    return resumenDiario;
  }

  async findResumenSemanal(): Promise<any> {
    // Implementa la lógica para obtener un resumen semanal del total de café recolectado por cada recolector
    const resumenSemanal = await this.createQueryBuilder('registro')
      .select('registro.RecolectorID', 'recolectorId')
      .addSelect('SUM(registro.Cajuelas) + SUM(registro.Cuartillos * 0.25)', 'totalCafeRecolectado')
      .where('YEARWEEK(registro.Creado, 1) = YEARWEEK(CURDATE(), 1)') // Filtra por registros de la semana actual
      .groupBy('registro.RecolectorID')
      .getRawMany();

    return resumenSemanal;
  }
}
