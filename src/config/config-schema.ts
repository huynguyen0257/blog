import * as joi from 'joi';

export const ConfigSchema = joi.object({
    NODE_ENV: joi
        .string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    PORT: joi.number().default(3000),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
});
