import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { PRODUCT_NOT_FOUND_ERROR } from './product.consts';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService) { }

	@HttpCode(201)
	@UseGuards(JwtGuard)
	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto)
	}

	@HttpCode(200)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id)
		if (!product) {
			throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
		return product
	}

	@HttpCode(202)
	@UseGuards(JwtGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.deleteById(id)
		if (!deletedProduct) {
			throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
	}

	@HttpCode(200)
	@UseGuards(JwtGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
		const updatedProduct = await this.productService.updateById(id, dto)
		if (!updatedProduct) {
			throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
		return updatedProduct
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReview(dto)
	}

}
