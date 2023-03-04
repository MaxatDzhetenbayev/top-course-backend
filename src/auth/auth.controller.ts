import { Controller, HttpException, HttpStatus, UsePipes } from '@nestjs/common';
import { Body, HttpCode, Post } from '@nestjs/common/decorators';
import { AuthDto } from './dto/auth.dto';
import { ValidationPipe } from '@nestjs/common/pipes'
import { AuthService } from './auth.service';
import { USER_EXISTS_ERROR } from './auth.constants';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('register')
	async register(@Body() dto: AuthDto) {

		const user = await this.authService.findUser(dto.login)

		if (user) {
			throw new HttpException(USER_EXISTS_ERROR, HttpStatus.BAD_REQUEST)
		}

		return this.authService.create(dto)
	}


	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		const { email } = await this.authService.validateUser(login, password)

		return await this.authService.login(email)
	}

}
