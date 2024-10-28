import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Address, User } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { ContactService } from "src/contact/contact.service";
import { AddressResponse, CreateAddressRequest, GetAddressRequest } from "src/model/address.model";
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

        return this.toAddressResponse(address);
    }

    toAddressResponse(address: Address): AddressResponse {
        return {
            id: address.id,
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code,
        }
    }

    async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        this.logger.debug(`AddressService.get(${JSON.stringify(user)} ${JSON.stringify(request)}`)
        const getRequest: GetAddressRequest = this.validationService.validate(AddressValidation.GET, request);

        await this.contactService.checkContactMustExist(user.username, request.contact_id)

        const address = await this.prismaService.address.findFirst({
            where: {
                id: getRequest.address_id,
                contact_id: getRequest.contact_id
            }
        });

        if (!address) {
            throw new HttpException('Address is not found', 404);
        }

        return this.toAddressResponse(address);
    }
}