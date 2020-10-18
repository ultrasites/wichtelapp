import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lottery {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'bigint' })
  facebookIdFirst: number;

  @Column({ nullable: false, type: 'bigint' })
  facebookIdSecond: number;
}
