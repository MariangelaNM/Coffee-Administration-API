import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Caficultores')
export class Caficultor {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Nombre: string;

    @Column()
    Apellidos: string;

    @Column()
    UsuarioID: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
