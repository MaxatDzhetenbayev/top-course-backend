import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { FintTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';


@Controller('top-page')
export class TopPageController {

	@HttpCode(201)
	@Post()
	async create(@Body() dto: Omit<TopPageModel, '_id'>) {

	}

	@HttpCode(200)
	@Get(':id')
	async get(@Param('id') id: string) {

	}

	@HttpCode(202)
	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@HttpCode(200)
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: TopPageModel) {

	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FintTopPageDto) {

	}



}