import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TipoRecoleccion')
export class TiposRecoleccion {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Nombre: string;    
}
