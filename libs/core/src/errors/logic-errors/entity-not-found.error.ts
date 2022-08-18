import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundError extends NotFoundException {
    constructor(entityName: string, entityId: string) {
        super(undefined, `Entity ${entityName} id ${entityId} not found!`);
    }
}
