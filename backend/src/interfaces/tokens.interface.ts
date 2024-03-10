import { User } from "./users.interface";

export interface Token {
  id?: number;
  purpose: string;
  expires_in: Date;
  value: string;
  userId: User;
}
