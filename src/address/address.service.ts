import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Address, User } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { ContactService } from "src/contact/contact.service";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, UpdateAddressRequest } from "src/model/address.model";
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

    async checkAddressMustExist(addressId: number, contactId: number): Promise<Address> {
        const address = await this.prismaService.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId
            }
        });

        if (!address) {
            throw new HttpException('Address is not found', 404);
        }

        return address;
    }

    async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        this.logger.debug(`AddressService.get(${JSON.stringify(user)} ${JSON.stringify(request)}`)
        const getRequest: GetAddressRequest = this.validationService.validate(AddressValidation.GET, request);

        await this.contactService.checkContactMustExist(user.username, request.contact_id)

        const address = await this.checkAddressMustExist(getRequest.address_id, getRequest.contact_id);

        return this.toAddressResponse(address);
    }

    async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest: UpdateAddressRequest = this.validationService.validate(AddressValidation.UPDATE, request);

        await this.contactService.checkContactMustExist(user.username, updateRequest.contact_id);

        let address = await this.checkAddressMustExist(updateRequest.id, updateRequest.contact_id);

        address = await this.prismaService.address.update({
            where: {
                id: address.id,
                contact_id: address.contact_id
            },
            data: updateRequest
        });

        return this.toAddressResponse(address);
    }
}