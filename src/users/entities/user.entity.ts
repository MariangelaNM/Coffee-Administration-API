import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuarios')
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Correo: string;

  @Column()
  Contrasena: string;

  @Column()
  Role: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
