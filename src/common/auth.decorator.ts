import { createParamDecorator, ExecutionContext, HttpException } from "@nestjs/common";
import { AuthenticatedRequest } from "src/model/user.model";

export const Auth = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const user = request.user;
        if (user) {
            return user;
        } else {
            throw new HttpException('Unauthorized', 401);
        }
    }
);