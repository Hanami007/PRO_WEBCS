export type AccessTokenPayload = {
  id: string;
  email: string;
  name: string;
  role: string | undefined;
  sessionId: string;
};
