// Core
import { getSession } from "next-auth/react";

// NextJS Types
import type { NextApiRequest, NextApiResponse } from "next";

// Models
import { User } from "@models";

// Global utilities
import { database } from "@utils/server";

// Vendors
import bcrypt from "bcryptjs";

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
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please login to perform the action." });
    }

    // Destructure the session object
    const {
      user: { _id },
    } = session;

    // Grab current user
    const currentUser = await User.findOne({ _id });

    // Return the object
    return res.send({ currentUser });
  }

  // Process a POST request
  if (method === "POST") {
    // If user has no access, return an error
    // if (!session) {
    //   return res
    //     .status(401)
    //     .send({ error: "Please login to perform the action." });
    // }

    const {
      body: { fullName, email, password },
    } = req;

    const isEmailTaken = Boolean(await User.findOne({ email }));

    if (isEmailTaken) {
      res.statusMessage = "Email is already used";
      return res.status(409).end();
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    const [firstName, lastName] = fullName.split(" ");

    // Create user model object
    const user = new User({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });

    // Store user on the Database
    await user.save();

    // Return the created user
    return res.send(user);
  }

  // End request
  return res.end();
};

export default api;
