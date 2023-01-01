import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export abstract class ModelMethods {
  async generateToken(this: any) {
    const payload = {
      _id: this._id,
      role: this.role,
    };
    return process.env.JWT_SECRET
      ? sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
      : null;
  }

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(this: any, password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
