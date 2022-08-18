import { NotImplementedException } from '@nestjs/common';

export class FunctionNotImplement extends NotImplementedException {
    constructor(functionName: string) {
        super(undefined, `Function ${functionName} is not implement`);
    }
}
