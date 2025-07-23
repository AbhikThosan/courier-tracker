export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface JwtPayload {
  user_id: string;
  email: string;
  role: "COURIER" | "DISPATCHER" | "ADMIN";
}
