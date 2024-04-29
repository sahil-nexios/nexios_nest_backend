import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'contact' })

export class contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: number;

    @Column()
    message: string;

}
