// src/lib/server/types.ts
export interface User {
    id: number;
    email: string;
    password: string;
  }
  
  export interface Session {
    userId: number;
    sessionToken: string;
    expiresAt: string;
  }
  