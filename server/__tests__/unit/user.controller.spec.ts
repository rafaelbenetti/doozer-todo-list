import { Request, Response } from 'express';
import { UserController } from '../../controllers/UserController';
import { UserService } from '../../src/users/user.service';

describe('UserController', () => {
  it('should return users in response', async () => {
    const mockUsers = [{ id: 1, name: 'Bob' }];
    const mockService = {
      fetchAllUsers: jest.fn().mockResolvedValue(mockUsers),
    } as unknown as UserService;

    const userController = new UserController(mockService);

    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await userController.getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });
});
