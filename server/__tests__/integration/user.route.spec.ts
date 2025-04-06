import express from 'express';
import request from 'supertest';
import { UserController } from '../../controllers/UserController';
import userRoutes from '../../src/users/user.routes';

jest.mock('../../controllers/UserController');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return a list of users', async () => {
      const mockUsers = [{ id: 1, name: 'Test User' }];

      (UserController as jest.Mock).mockImplementation(() => ({
        getUsers: (req: any, res: any) => res.json(mockUsers),
      }));

      const response = await request(app).get('/api/users?search=Test');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });

    it('should return an empty list if no users are found', async () => {
      const mockUsers: any[] = [];

      (UserController as jest.Mock).mockImplementation(() => ({
        getUsers: (req: any, res: any) => res.json(mockUsers),
      }));

      const response = await request(app).get('/api/users?search=NonExistent');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });
  });
});
