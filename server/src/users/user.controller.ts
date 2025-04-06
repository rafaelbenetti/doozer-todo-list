import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UserService } from "./user.service";

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  get = async (req: Request, res: Response) => {
    try {
      const search = req.query.search as string;
      const users = await this.userService.get(search);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
