import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { FindTopPageDto } from './dto/find-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe'
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';
import { HttpException } from '@nestjs/common/exceptions';
import { TOP_PAGE_BY_CATEGORY_ERROR, TOP_PAGE_NOT_FOUND_ERROR } from './top-page.consts';
import { CreatePageDto } from './dto/create-page.dto';


@Controller('top-page')
export class TopPageController {
	constructor(private readonly pageService: TopPageService) { }

	@HttpCode(201)
	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() dto: CreatePageDto) {
		return this.pageService.create(dto)
	}

	@HttpCode(200)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: Pick<TopPageModel, '_id'>) {
		const page = await this.pageService.findPageById(id)

		if (!page) {
			throw new HttpException(TOP_PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
		return page
	}

	@HttpCode(200)
	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: Pick<TopPageModel, 'alias'>) {
		const pageByAlias = await this.pageService.findPageByAlias(alias)

		if (!pageByAlias) {
			throw new HttpException(TOP_PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
		return pageByAlias
	}

	@HttpCode(202)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: Pick<TopPageModel, '_id'>) {
		const deletedPage = await this.pageService.deleteById(id)

		if (!deletedPage) {
			throw new HttpException(TOP_PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
	}

	@HttpCode(200)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: Pick<TopPageModel, '_id'>, @Body() dto: TopPageModel) {
		const updatedPage = await this.pageService.updatePageById(id, dto)

		if (!updatedPage) {
			throw new HttpException(TOP_PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
		return updatedPage
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		const categoryPages = await this.pageService.findByCategory(dto.firstLevelCategory)

		if (!categoryPages) {
			throw new HttpException(TOP_PAGE_BY_CATEGORY_ERROR, HttpStatus.NOT_FOUND)
		}
		return categoryPages
	}

}