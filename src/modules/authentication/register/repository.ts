import { eq } from 'drizzle-orm';
import db from '../../../db';
import { NewUser, User, users } from '../../../db/schema/users';

export class RegisterRepository {
  getUser = async (email: string) => db.select().from(users).where(eq(users.email, email));
  createUser = async (user: NewUser) =>
    db.insert(users).values(user).returning({ uuid: users.uuid, name: users.name });
  updateUser = async (id: number, updatedUser: User) =>
    db
      .update(users)
      .set(updatedUser)
      .where(eq(users.id, id))
      .returning({ uuid: users.uuid, name: users.name });
  // ! delete user not existed yet because there is no delete user feature
}
