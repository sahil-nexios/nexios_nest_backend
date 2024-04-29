import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Schedule' })

export class ScheduleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: number;

    @Column()
    email: string;
    
    @Column()
    brief: string
}
