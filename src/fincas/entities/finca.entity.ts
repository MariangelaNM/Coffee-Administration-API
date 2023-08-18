import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Fincas')
export class Finca {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  CaficultorID: number;

  @Column()
  Nombre: string;

  @Column()
  Ubicacion: string;

  @Column()
  Descripcion: string;
}
