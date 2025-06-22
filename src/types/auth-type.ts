export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export type AuthLoginForm = {
  email?: string;
  username?: string;
  password: string;
};
