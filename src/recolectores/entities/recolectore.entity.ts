//import { Caficultor } from "src/caficultores/entities/caficultor.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Recolectores')
export class Recolector {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  CaficultorID: number;

  @Column()
  Nombre: string;

  @Column()
  Apellidos: string;

  @Column()
  Identificacion: string;

  @Column()
  Cel: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}