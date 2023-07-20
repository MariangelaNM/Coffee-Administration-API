import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Roles')
export class Role {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Nombre: string;

    @Column()
    Descripcion: string;
}
