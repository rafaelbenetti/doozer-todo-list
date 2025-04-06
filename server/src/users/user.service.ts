import { inject, injectable } from 'tsyringe';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository
  ) {}

  async get(search?: string): Promise<User[]> {
    const users = await this.userRepository.searchBy(search);
    return users.map(user => User.fromEntity(user));
  }
}
