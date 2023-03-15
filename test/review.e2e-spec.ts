import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import mongoose, { disconnect } from 'mongoose';


const productId = new mongoose.Types.ObjectId().toHexString()

const testDto: CreateReviewDto = {
	title: 'title',
	name: 'name',
	description: 'description',
	rating: 5,
	productId,

}


const loginDto = {
	login: 'admin@mail.ru',
	password: 'admin'
}

describe('ReviewTest (e2e)', () => {
	let app: INestApplication;
	let createdId: string
	let token: string

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

	it('/review (POST) - succes', async () => {
		return request(app.getHttpServer())
			.post('/review')
			.send(testDto)
			.set('Authorization', 'Bearer ' + token)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id
				expect(createdId).toBeDefined()
			})
	});


	it('/review (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/review')
			.send({ ...testDto, rating: 6 })
			.set('Authorization', 'Bearer ' + token)
			.expect(400)

	});

	it('/review/byProduct/:productId (GET) - succes', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1)
			})
	});

	it('/review (DELETE)', () => {
		return request(app.getHttpServer())
			.delete(`/review/` + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(202)
	})



	afterAll(() => {
		disconnect()
	})
});
