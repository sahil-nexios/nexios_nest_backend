import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'portfolio' })

export class portfolio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column()
    description: string;

}
