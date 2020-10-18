import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ nullable: false, unique: true })
  facebookId: number;

  @Column({ nullable: false, type: 'text' })
  name: string;
}
