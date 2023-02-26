export class ProductModel {
	_id: string
	image: string
	title: string
	description: string
	tags: string
	categories: string[]
	price: number
	oldPrice: number
	credit: string
	rating: number
	advantages: string
	disAdvantages: string
	characteristics: {
		[key: string]: string
	}

}
