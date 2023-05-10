// Core
import { getSession } from "next-auth/react";

// NextJS Types
import type { NextApiRequest, NextApiResponse } from "next";

// Models
import { MyAccount } from "@models";

// Global utilities
import { database } from "@utils/server";

// Process request
const api = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get NextAuth session to check if user is authenticated
  const session = await getSession({ req });

  // Connect to mongoDb database
  await database();

  // Ectract current rquest method
  const { method } = req;

  // Process a GET request
  if (method === "GET") {
    // Grab current user
    const myAccount = await MyAccount.find();

    // Return the object
    return res.send({ myAccount });
  }

  // Process a POST request
  if (method === "POST") {
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please login to perform the action." });
    }

    const { body } = req;

    // Create user model object
    const myAccount = new MyAccount(body);

    // Store user on the Database
    await myAccount.save();

    // Return the created user
    return res.send(myAccount);
  }

  // Process a POST request
  if (method === "PUT") {
    const { body } = req;

    const { id } = body;

    const myAccount = await MyAccount.findOneAndUpdate(
      {
        _id: id,
      },
      body
    );

    console.log(myAccount);

    // Store user on the Database
    // await myAccount.save();

    // Return the created user
    return res.send(myAccount);
  }

  // End request
  return res.end();
};

export default api;
