import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AppModule } from '../src/app.module'
import * as request from 'supertest'
import { disconnect } from 'mongoose'

describe('AuthTeset (e2e)', () => {
	let app: INestApplication


	const loginDto = {
		login: 'admin@mail.ru',
		password: 'admin'
	}

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()


		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/auth/login (Post) - acces', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.acces_token).toBeDefined()
			})
	})

	it('/auth/login (Post) - login fail', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'ad@mail.ru', })
			.expect(HttpStatus.UNAUTHORIZED)
	})

	it('/auth/login (Post) - password fail', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: 'ad' })
			.expect(HttpStatus.UNAUTHORIZED)
	})

	afterAll(() => {
		disconnect()
	})

})