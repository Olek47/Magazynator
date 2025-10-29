import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 14 })
  code: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'int' })
  quantity: number

  @Column({ type: 'varchar', length: 255 })
  location: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageFile: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
