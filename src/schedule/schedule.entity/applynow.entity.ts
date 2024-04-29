import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'apply' })

export class applynow {
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
    subject: string;

    @Column()
    file: string;
}
