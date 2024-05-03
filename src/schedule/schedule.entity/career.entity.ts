import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'career' })

export class career {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    vacancy: number;

    @Column()
    experiance_year: string;

}
