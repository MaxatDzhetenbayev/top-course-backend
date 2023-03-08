import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserModel } from 'src/auth/user.model'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate(email: Pick<UserModel, 'email'>) {
		return email
	}

}