export function GeneralConfig() {
    return {
        port: parseInt(process.env.PORT, 10) || 3000,
        api_prefix: process.env.API_PREFIX || '',
    };
}