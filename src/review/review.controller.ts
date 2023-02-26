import { Controller } from '@nestjs/common'
import { Body, Delete, Get, HttpCode, Param, Post } from '@nestjs/common/decorators';
import { ReviewModel } from './review.model';


@Controller('review')
export class ReviewController {

	@HttpCode(201)
	@Post()
	async create(@Body() dto: Omit<ReviewModel, '_id'>) {

	}

	@HttpCode(202)
	@Delete(':id')
	async delete(@Param() id: string) {

	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {

	}
}