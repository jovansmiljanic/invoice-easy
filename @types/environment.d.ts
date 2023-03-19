namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXTAUTH_URL: string;
    SECRET: string;
    MONGODB_HOST: string;
    MONGODB_USERNAME: string;
    MONGODB_PASSWORD: string;
    MONGODB_DATABASE: string;
  }
}
