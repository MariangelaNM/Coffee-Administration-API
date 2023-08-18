import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Roles')
export class Role {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Nombre: string;

    @Column()
    Descripcion: string;
}
