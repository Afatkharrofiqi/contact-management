import { Injectable, NestMiddleware } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Response } from "express";
import { AuthenticatedRequest } from "src/model/user.model";

@Injectable()
export class AuthMiddleware implements NestMiddleware<AuthenticatedRequest, Response> {
    constructor(private prismaService: PrismaService) { }

    async use(req: AuthenticatedRequest, res: Response, next: (error?: Error | any) => void) {        
        const token = req.headers['authorization'] as string;
        if (token) {
            const user = await this.prismaService.user.findFirst({
                where: {
                    token: token
                }
            });

            if (user) {
                req.user = user;
            }
        }

        next();
    }
}