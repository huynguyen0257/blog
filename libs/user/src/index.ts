if (process.env.RUN_MODULE_STANDALONE) {
    require('./standAlone');
}

export * from './user.module';
export * from './entities';
export * from './app';
