import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { disconnect } from 'mongoose'
import { AppModule } from '../src/app.module'
import { CreatePageDto } from 'src/top-page/dto/create-page.dto'
import * as request from 'supertest'


describe('PageTest (e2e)', () => {

	let app: INestApplication
	let token: string
	let pageId: string
	let alias: string
	let queryText: string

	const loginDto = {
		login: 'admin@mail.ru',
		password: 'admin'
	}

	const createPage: CreatePageDto = {
		firstLevelCategory: 0,
		secondLevelCategory: "Web Programming",
		alias: "Typescript",
		title: "Web",
		category: "web",
		advantages: [],
		seoText: "seo text",
		tagsTitle: "test tag",
		tags: ["typescript", "courses", "javascript"]
	}

	const updatePage: CreatePageDto = {
		firstLevelCategory: 0,
		secondLevelCategory: "Web Programming",
		alias: "Typescript",
		title: "Web 2.0",
		category: "Web",
		advantages: [],
		seoText: "seo text new",
		tagsTitle: "test tag new",
		tags: ["javascript", "typescript", "courses"]
	}

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()

		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
		token = body.acces_token

	})

	it('/top-page (POST) - access', async () => {
		return request(app.getHttpServer())
			.post('/top-page')
			.set('Authorization', 'Bearer ' + token)
			.send(createPage)
			.expect(201)
			.then(({ body }: request.Response) => {
				pageId = body._id
				alias = body.alias
				queryText = body.seoText
			})
	})

	it('top-page/:id (GET) - access', async () => {
		return request(app.getHttpServer())
			.get('/top-page/' + pageId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined()
			})
	})

	it('top-page/byAlias/:alias (GET) - access', () => {
		return request(app.getHttpServer())
			.get('/top-page/byAlias/' + alias)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined()
			})
	})

	it('top-page/:id (PATCH) - access', () => {
		return request(app.getHttpServer())
			.patch('/top-page/' + pageId)
			.set('Authorization', 'Bearer ' + token)
			.send(updatePage)
			.expect(200)
	})

	it('top-page/:id (DELETE) - access', () => {
		return request(app.getHttpServer())
			.delete('/top-page/' + pageId)
			.set('Authorization', 'Bearer ' + token)
			.expect(202)
	})

	it('top-page/query/:text (GET) - acces', () => {
		return request(app.getHttpServer())
			.get('/top-page/query/' + queryText)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined()
			})
	})


	afterAll(() => {
		disconnect()
	})
})