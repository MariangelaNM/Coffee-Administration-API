import { IsInt, Max, Min } from "class-validator";
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

  @IsInt({ message: 'Cuartillos debe ser un número entero.' })
  @Min(0, { message: 'Cuartillos debe ser mayor o igual a 0.' })
  @Max(3, { message: 'Cuartillos debe ser menor o igual a 3.' })
  @Column()
  Cuartillos: number;

  @Column()
  Creado: Date;

  @Column()
  Modificado: Date;
    @Column()
  Status: Boolean;
  @Column()
  Total: number;
}
