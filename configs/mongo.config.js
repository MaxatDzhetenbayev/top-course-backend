"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConfig = void 0;
const getMongoConfig = async (configService) => {
    return {
        uri: getMongoString(configService),
    };
};
exports.getMongoConfig = getMongoConfig;
const getMongoString = (configService) => {
    return `mongodb+srv://${configService.get('MONGO_LOGIN')}:${configService.get('MONGO_PASSWORD')}@top-course-cluster.yviqip2.mongodb.net/?retryWrites=true&w=majority`;
};
//# sourceMappingURL=mongo.config.js.map