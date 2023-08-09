import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Periodos')
export class Periodo {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    TipoRecoleccionID: number;

    @Column()
    Desde: Date;

    @Column()
    Hasta: Date;

    @Column({ name: 'Value' })
    PrecioCajuela: number;

    @Column()
    CaficultorID: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
