// Core
import { getSession } from "next-auth/react";

// NextJS Types
import type { NextApiRequest, NextApiResponse } from "next";

// Models
import { User } from "@models";

// Global utilities
import { database } from "@utils/server";
import { Company } from "@models/Company";

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
    const companies = await Company.find();

    // Return the object
    return res.send({ companies });
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
    const company = new Company(body);

    // Store user on the Database
    await company.save();

    // Return the created user
    return res.send(company);
  }

  // End request
  return res.end();
};

export default api;
