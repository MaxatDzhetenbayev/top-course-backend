import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
	}
}

const getMongoString = (configService: ConfigService): string => {
	return `mongodb+srv://${configService.get('MONGO_LOGIN')}:${configService.get('MONGO_PASSWORD')}@top-course-cluster.yviqip2.mongodb.net/?retryWrites=true&w=majority`
}