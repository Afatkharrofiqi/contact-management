import { User } from "@prisma/client";
import { Request } from "express";

export class RegisterUserRequest {
    username: string;
    password: string;
    name: string
}

export class UserResponse {
    username: string;
    name: string;
    token?: string;
}

export class LoginUserRequest {
    username: string;
    password: string;
}

export interface AuthenticatedRequest extends Request {
    user?: User;
}

export class UpdateUserRequest {
    name?: string;
    password?: string;
}