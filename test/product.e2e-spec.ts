import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import mongoose, { disconnect } from 'mongoose'
import { AppModule } from 'src/app.module'


describe('AppController', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('')


	afterAll(() => [
		disconnect()
	])
})