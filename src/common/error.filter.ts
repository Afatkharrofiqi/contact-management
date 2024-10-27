import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { ZodError } from "zod";

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter<Error> {
    catch(exception: Error, host: ArgumentsHost) {
        const response: Response = host.switchToHttp().getResponse();

        if (exception instanceof HttpException) {
            response.status(exception.getStatus()).json({
                errors: exception.getResponse()
            });
        } else if (exception instanceof ZodError) {
            response.status(400).json({
                errors: 'Validation error',
                // details: exception.errors.map((err) => ({
                //     path: err.path,
                //     message: err.message,
                // })),
            });
        } else {
            response.status(500).json({
                errors: exception.message
            })
        }
    }
}