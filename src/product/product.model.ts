import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export interface ProductModel extends Base { }


class ProductCharacteristics {
	[key: string]: string
}


export class ProductModel extends TimeStamps {

	@prop()
	image: string

	@prop()
	title: string

	@prop()
	description: string

	@prop({ type: () => [String] })
	tags: string[]

	@prop({ type: () => [String] })
	categories: string[]

	@prop()
	price: number

	@prop()
	oldPrice: number

	@prop()
	credit: string

	@prop()
	rating: number

	@prop()
	advantages: string

	@prop()
	disAdvantages: string

	@prop({ type: () => ProductCharacteristics })
	characteristics: ProductCharacteristics

}
