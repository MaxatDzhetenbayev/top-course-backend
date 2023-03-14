
import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {
	@prop()
	count: number

	@prop()
	juniorSalary: number

	@prop()
	middleSalary: number

	@prop()
	seniorSalary: number
}

export class PageAdvantage {
	@prop()
	title: string

	@prop()
	description: string
}

export interface TopPageModel extends Base { }


export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstLevelCategory: TopLevelCategory

	@prop()
	secondLevelCategory: string

	@prop({ unique: true })
	alias: string

	@prop()
	title: string

	@prop()
	category: string

	@prop({ type: () => HhData })
	hh?: HhData

	@prop({ type: () => [PageAdvantage] })
	advantages: PageAdvantage[]

	@prop()
	seoText: string

	@prop()
	tagsTitle: string

	@prop({ type: () => [String] })
	tags: string[]
}