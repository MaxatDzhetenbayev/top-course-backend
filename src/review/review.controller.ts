import { Controller, HttpException, HttpStatus } from '@nestjs/common'
import { Body, Delete, Get, HttpCode, Param, Post } from '@nestjs/common/decorators';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';
import { UsePipes } from '@nestjs/common/decorators'
import { ValidationPipe } from '@nestjs/common/pipes'


@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) { }


	@UsePipes(new ValidationPipe)
	@HttpCode(201)
	@Post('')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto)
	}

	@HttpCode(202)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id)
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
	}

	@HttpCode(200)
	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId)
	}


	@Delete('byProduct/:id')
	async deleteReviewsByProductId(@Param() productId: string) {
		return this.reviewService.deleteReviewsByProductId(productId)
	}
}