import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType, } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) { }

	async create(dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
		return this.productModel.create(dto)
	}

	async findById(id: string): Promise<DocumentType<ProductModel> | null> {
		return this.productModel.findById(id).exec()
	}

	async deleteById(id: string) {
		return this.productModel.deleteOne({ _id: id }).exec()
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async findWithReview(dto: FindProductDto) {
		return await this.productModel.aggregate([
			{
				$match: {
					categories: dto.category
				},
			},
			{
				$sort: {
					_id: 1
				}
			},
			{
				$limit: 1
			},
			{
				$lookup: {
					from: 'Review',
					localField: '_id',
					foreignField: 'productId',
					as: 'reviews'
				}
			},
			{
				$addFields: {
					reviewCount: { $size: '$reviews' },
					ratingAvg: { $avg: '$reviews.rating' }
				}
			}
		]).exec() as (ProductModel & { reviewCount: string })[]
	}
}
