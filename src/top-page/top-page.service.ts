import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreatePageDto } from './dto/create-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly pageModel: ModelType<TopPageModel>) { }

	async create(dto: CreatePageDto): Promise<DocumentType<TopPageModel>> {
		return this.pageModel.create(dto)
	}

	async findPageById(id: Pick<TopPageModel, '_id'>): Promise<DocumentType<TopPageModel> | null> {
		return this.pageModel.findById(id).exec()
	}

	async findPageByAlias(alias: Pick<TopPageModel, 'alias'>): Promise<DocumentType<TopPageModel> | null> {
		return this.pageModel.findOne({ alias }).exec()
	}

	async deleteById(id: Pick<TopPageModel, '_id'>) {
		return this.pageModel.deleteOne({ _id: id }).exec()
	}

	async updatePageById(id: Pick<TopPageModel, '_id'>, dto: TopPageModel) {
		return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async findByCategory(firstLevelCategory: TopLevelCategory) {
		return this.pageModel.find({ firstLevelCategory }, { alias: 1, title: 1, secondLevelCategory: 1 }).exec()
	}

	async findByQueryText(text: string) {
		return this.pageModel.find({ $text: { $search: text, $caseSensitive: false } })
	}
}