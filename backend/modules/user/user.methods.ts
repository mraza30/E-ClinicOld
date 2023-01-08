import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export abstract class UerMethods {
  async generateToken(this: any) {
    const payload = {
      _id: this._id,
      role: this.role,
      active: this.active,
    };
    return process.env.JWT_SECRET
      ? sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
      : null;
  }

  static async hashPassword(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async comparePassword(this: any, password: string) {
    return await compare(password, this.password);
  }
}
