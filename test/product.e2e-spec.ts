import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest'


describe('ProductTest (e2e)', () => {
	let app: INestApplication;
	let token: string
	let productId: string

	const loginDto = {
		login: 'admin@mail.ru',
		password: 'admin'
	}

	const porudctDto = {
		image: 'image_1',
		title: 'title',
		description: 'description',
		tags: ['product_1'],
		categories: ['test'],
		price: 4990,
		oldPrice: 7000,
		credit: '6',
		advantages: 'advantages',
		disAdvantages: 'disAdvantages',
		characteristics: [
			{ name: 'char_1', value: 'vlaue_1' },
			{ name: 'char_2', value: 'vlaue_2' }
		]
	}


	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
		token = body.acces_token
	});


	it('/product (POST) - access', () => {
		return request(app.getHttpServer())
			.post('/product')
			.set('Authorization', 'Bearer ' + token)
			.send(porudctDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				productId = body._id
			})
	});

	it('/product/:id (GET) - access', () => {
		return request(app.getHttpServer())
			.get('/product/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined()
			})
	});

	it('/product/:id (PATCH) - access', () => {
		return request(app.getHttpServer())
			.patch('/product/' + productId)
			.set('Authorization', 'Bearer ' + token)
			.send({ ...porudctDto, title: 'testNew' })
			.expect(200)
	});

	it('/product/:id (DELETE) - acces', () => {
		return request(app.getHttpServer())
			.delete('/product/' + productId)
			.set('Authorization', 'Bearer ' + token)
			.expect(202)
	});


	afterAll(() => {
		disconnect()
	})
});
