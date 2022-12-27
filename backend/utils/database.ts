import { connect, set } from "mongoose";

export async function ConnectDatabase() {
  try {
    set("strictQuery", true);
    await connect(`${process.env.DATABASE_URL}`, { dbName: "e-clinic" });
    console.log(`🚀 database connection established`);
  } catch (error) {
    console.log(`error connecting with database`);
    process.exit();
  }
}
