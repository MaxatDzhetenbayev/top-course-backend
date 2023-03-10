import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { AuthDto } from './dto/auth.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(@InjectModel(UserModel) private readonly usermodel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) { }


	async create(dto: AuthDto) {
		const salt = genSaltSync(10)

		const doc = new this.usermodel({
			email: dto.login,
			passwordHash: hashSync(dto.password, salt)
		})

		return doc.save()
	}

	async findUser(email: string) {
		return this.usermodel.findOne({ email }).exec()
	}

	async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(email)
		if (!user) {
			throw new HttpException(USER_NOT_FOUND_ERROR, HttpStatus.UNAUTHORIZED)
		}
		const isCorrectPassword = compareSync(password, user.passwordHash)
		if (!isCorrectPassword) {
			throw new HttpException(WRONG_PASSWORD_ERROR, HttpStatus.UNAUTHORIZED)
		}
		return { email: user.email }
	}

	async login(email: string) {
		const payload = { email }

		return {
			acces_token: await this.jwtService.sign(payload)
		}

	}


}
