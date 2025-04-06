import { Column, Table } from "@wwwouter/typed-knex";

export class User {
  id: number;
  name: string;
  email: string;
  country: string;
  state: string;
  city: string;
  phone: string;
  createdAt: Date;
  active: boolean;

  static fromEntity(entity: UserEntity): User {
    const dto = new User();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.country = entity.country;
    dto.state = entity.state;
    dto.city = entity.city;
    dto.phone = entity.phone;
    dto.createdAt = entity.created_at;
    dto.active = entity.active;
    return dto;
  }
}

@Table("users")
export class UserEntity {
  @Column()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column()
  created_at: Date;

  @Column()
  active: boolean;
}
