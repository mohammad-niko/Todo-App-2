import { mongoose } from "mongoose";
const { connect } = mongoose;

export default async function connectDb(URI) {
  try {
    await connect(URI);
    console.log("Mongooes connected...✅");
  } catch (error) {
    console.error({
      message: "Mongooes can't connect with moongodb",
      errro: error,
    });
  }
}
