// Next-Auth Core
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

// Local types
import { User } from "./users";

/** Extend the built-in session types */
declare module "next-auth" {
  export interface Session {
    user: User;
  }
}

/** Extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {}
}
