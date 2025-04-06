import db from "../config/db";
import { UserEntity } from "./user.model";

export class UserRepository {
  async searchBy(search?: string): Promise<UserEntity[]> {
    let query = db<UserEntity>("users").limit(50);

    if (search) {
      query = query.where(function () {
        this.whereILike("name", `%${search}%`)
          .orWhereILike("email", `%${search}%`)
          .orWhereILike("country", `%${search}%`)
          .orWhereILike("city", `%${search}%`);
      });
    }

    return await query;
  }
}
