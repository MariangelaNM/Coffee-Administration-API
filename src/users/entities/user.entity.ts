import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
