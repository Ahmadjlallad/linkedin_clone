import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { postId },
    method,
  } = req;
  const { db } = await connectToDatabase();
  if (method === "DELETE") {
    try {
      await db
        .collection("post")
        .findOneAndDelete({ _id: new ObjectId(postId as string) });
      res.status(204).json({ msg: "delete" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
