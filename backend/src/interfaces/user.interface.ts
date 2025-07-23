export interface User {
  user_id: string;
  email: string;
  password: string;
  role: "COURIER" | "DISPATCHER" | "ADMIN";
  created_at: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: "COURIER" | "DISPATCHER" | "ADMIN";
}

export interface RegisterResponse {
  user_id: string;
  email: string;
  role: "COURIER" | "DISPATCHER" | "ADMIN";
  created_at: Date;
}

export interface UserWithoutPassword {
  user_id: string;
  email: string;
  role: "COURIER" | "DISPATCHER" | "ADMIN";
  created_at: Date;
}
