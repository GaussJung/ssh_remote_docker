import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * Company Entity
 */
@Entity({ name: 'company' })
export class Company {
  @PrimaryColumn()
  cid: number;

  @Column({ length: 200 })
  cname: string;

  @Column({ length: 100, nullable: true })
  cphone?: string;

  @Column({ length: 200, nullable: true })
  industry?: string;

  @Column({ type: 'text', nullable: true })
  remarks?: string;
}