import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'team' })

export class team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    designation: string;

}
