declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      WS_URL: string;

    }
  }
}