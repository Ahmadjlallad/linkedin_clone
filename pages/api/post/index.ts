import { Long, Timestamp } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  const { db } = await connectToDatabase();
  (await db.collections()).forEach((collection) => {
    console.log(collection.namespace);
  });

  if (method === "GET") {
    try {
      const posts = await db
        .collection("post")
        .find()
        .sort({ timestamp: -1 })
        .toArray(); // convert to array thats will make it as Promise
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const post = await db
        .collection("post")
        .insertOne({ ...body, timestamp: new Timestamp(new Long()) });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
