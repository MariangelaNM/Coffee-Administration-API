import { IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('RegistroDeRecoleccion')
export class RegistroRecoleccion {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  ZonaID: number;

  @Column()
  PeriodoID: number;

  @Column()
  RecolectorID: number;

  @Column()
  Cajuelas: number;

  @Column()
  Cuartillos: number;

  @Column()
  Creado: Date;

  @Column()
  Modificado: Date;
}
