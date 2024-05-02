import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'client' })

export class client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    designation: string

}
