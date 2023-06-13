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
    // Grab current user
    const users = await User.find();

    // Return the object
    return res.send({ users });
  }

  // Process a POST request
  if (method === "POST") {
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

  // Process a POST request
  if (method === "PUT") {
    const {
      body: { id, ...rest },
    } = req;

    const user = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...rest,
        updatedAt: new Date(),
      },
      { new: true }
    );

    // Store user on the Database
    await user.save();

    // Return the created user
    return res.send(user);
  }

  // End request
  return res.end();
};

export default api;
