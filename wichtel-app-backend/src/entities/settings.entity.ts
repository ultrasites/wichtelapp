import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryColumn({ nullable: false, type: 'text', unique: true })
  key: string;

  @Column({ nullable: true, type: 'text' })
  value: string;
}
