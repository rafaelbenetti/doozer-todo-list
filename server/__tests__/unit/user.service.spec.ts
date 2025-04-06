import { UserRepository } from '../../src/users/user.repository';
import { UserService } from '../../src/users/user.service';

describe('UserService', () => {
  it('should return filtered users when search term is provided', async () => {
    const mockUsers = [{ id: 1, name: 'Alice' }];
    const mockRepo = {
      searchUsers: jest.fn().mockResolvedValue(mockUsers)
    } as UserRepository;

    const userService = new UserService(mockRepo);
    const users = await userService.fetchAllUsers('Ali');

    expect(users).toEqual(mockUsers);
    expect(mockRepo.searchUsers).toHaveBeenCalledWith('Ali');
  });

  it('should return all users when no search term is provided', async () => {
    const mockUsers = [{ id: 1, name: 'Bob' }];
    const mockRepo = {
      searchUsers: jest.fn().mockResolvedValue(mockUsers),
    } as UserRepository;

    const userService = new UserService(mockRepo);
    const users = await userService.fetchAllUsers();

    expect(users).toEqual(mockUsers);
    expect(mockRepo.searchUsers).toHaveBeenCalledWith(undefined);
  });
});
