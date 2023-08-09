// Core
import { getSession } from "next-auth/react";

// NextJS Types
import type { NextApiRequest, NextApiResponse } from "next";

// Models
import { User } from "@models";

// Global utilities
import { database } from "@utils/server";
import { Client } from "@models/Client";

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
    const {
      query: { limit, skip, ...query },
    } = req;

    // Restructure query based on Collection schema
    const getQuery = (query: {
      [x: string]: string | string[] | undefined;
    }) => {
      return Object.entries(query).reduce(
        (p, [key, val]) => {
          switch (key) {
            case "searchQuery":
              return {
                ...p,
                clientName: val
                  ? {
                      $regex: new RegExp(val.toString(), "i"),
                    }
                  : "",
              };

            default:
              return { ...p, [key]: val };
          }
        },
        {} // Start
      );
    };

    const length = await Client.find({
      ...getQuery(query),
      owner: session?.user._id,
    })
      .sort({ createdAt: -1 })
      .count();

    // Grab current user
    const clients = await Client.find({
      ...getQuery(query),
      owner: session?.user._id,
    })
      .skip(Number(skip) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    // Return the object
    return res.send({ items: clients, length });
  }

  // Process a POST request
  if (method === "POST") {
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please sign in to perform the action." });
    }

    const { body } = req;

    // Create user model object
    const client = new Client({ owner: session.user._id, ...body });

    // Store user on the Database
    await client.save();

    // Return the created user
    return res.send(client);
  }

  // Process a POST request
  if (method === "PUT") {
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please sign in to perform the action." });
    }

    const {
      body: { _id, ...rest },
    } = req;

    // const invoice = new Invoice(body);
    const updatedInvoice = await Client.findOneAndUpdate(
      { _id },
      { ...rest, updatedAt: new Date() },
      { new: true }
    );

    // Store user on the Database
    await updatedInvoice.save();

    // // Return the created user
    return res.send(updatedInvoice);
  }

  // Process a GET request
  if (method === "DELETE") {
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please sign in to perform the action." });
    }

    const { body } = req;

    // Grab current user
    await Client.deleteOne({ _id: body });
  }

  // End request
  return res.end();
};

export default api;
