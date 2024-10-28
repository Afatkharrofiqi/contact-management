import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { ContactService } from "src/contact/contact.service";
import { AddressResponse, CreateAddressRequest } from "src/model/address.model";
import { Logger } from "winston";
import { AddressValidation } from "./address.validation";

@Injectable()
export class AddressService {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private validationService: ValidationService,
        private contactService: ContactService
    ) { }

    async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        this.logger.debug(`AddressService.create(${JSON.stringify(user)} ${JSON.stringify(request)}`)
        const createRequest: CreateAddressRequest = this.validationService.validate(AddressValidation.CREATE, request);

        await this.contactService.checkContactMustExist(user.username, createRequest.contact_id);

        const address = await this.prismaService.address.create({
            data: createRequest
        });

        return {
            id: address.id,
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code,
        }
    }
}