import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import mongoose, { disconnect } from 'mongoose';


const testDto: CreateReviewDto = {
	title: 'title',
	name: 'name',
	description: 'description',
	rating: 5,
	productId: new mongoose.Types.ObjectId().toHexString()

}


describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review (POST)', async () => {
		return request(app.getHttpServer())
			.post('/review')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id
				expect(createdId).toBeDefined()
			})
	});

	it('/review (DELETE)', () => {
		return request(app.getHttpServer())
			.delete(`/review/` + createdId)
			.expect(202)
	})

	afterAll(() => {
		disconnect()
	})
});
