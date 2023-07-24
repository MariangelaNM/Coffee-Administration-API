import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Zonas')
export class Zona {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  FincaID: number;

  @Column()
  Nombre: string;

  @Column()
  Descripcion: string;
}
