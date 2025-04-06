import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserRepository } from '../users/user.repository';
import { UserService } from '../users/user.service';

container.register<UserRepository>(UserRepository, { useClass: UserRepository });
container.register<UserService>(UserService, { useClass: UserService });
