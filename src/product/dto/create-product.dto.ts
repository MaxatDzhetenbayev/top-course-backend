import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'


class ProductCharacteristicsDto {
	@IsString()
	name: string

	@IsString()
	value: string
}


export class CreateProductDto {
	@IsString()
	image: string

	@IsString()
	title: string

	@IsString()
	description: string

	@IsArray()
	@IsString({ each: true })
	tags: string[]

	@IsArray()
	@IsString({ each: true })
	categories: string[]

	@IsNumber()
	price: number

	@IsOptional()
	@IsNumber()
	oldPrice?: number

	@IsString()
	credit: string

	@IsString()
	advantages: string

	@IsString()
	disAdvantages: string

	@IsArray()
	@ValidateNested()
	@Type(() => ProductCharacteristicsDto)
	characteristics: ProductCharacteristicsDto[]
}