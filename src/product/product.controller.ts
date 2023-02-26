import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {

	@HttpCode(201)
	@Post()
	async create(@Body() dto: Omit<ProductModel, '_id'>) {

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
	async patch(@Param('id') id: string, @Body() dto: ProductModel) {

	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindProductDto) {

	}

}
