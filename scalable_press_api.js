const HTTP =  require("./http")

class API {
	constructor() {
		this.http = new HTTP(null, 'test_XCCcCuLgPEOcWOGEZBWiPw')
		

		// bind methods
		this.product_list_categories = this.product_list_categories.bind(this)
		this.product_list = this.product_list.bind(this)
		this.product_information = this.product_information.bind(this)
		this.product_availability = this.product_availability.bind(this)
		this.product_item_information = this.product_item_information.bind(this)

		this.quote_ready = this.quote_ready.bind(this)
		this.quote_bulk = this.quote_bulk.bind(this)

		this.order_place = this.order_place.bind(this)
		this.order_reprint = this.order_reprint.bind(this)
		this.order_get = this.order_get.bind(this)
		
		this.product = { 
			list_categories: this.product_list_categories,
			list: this.product_list,
			info: this.product_information,
			availability: this.product_availability,
			item_info: this.product_item_information
		}

		this.quote = {
			get: this.quote_ready,
			bulk: this.quote_bulk
		}

		this.order = {
			place: this.order_place,
			reprint: this.order_reprint,
			get: this.order_get
		}
	}

	// api wraping methods

	product_list_categories(){
		return this.http.get('/categories')
	}

	product_list(categoryId) {
		return this.http.get('/categories/' + categoryId)
	}

	product_information(productId) {
		return this.http.get('/products/' + productId)
	}

	product_availability(productId){
		return this.http.get('/products/' + productId + '/availability')
	}

	product_item_information(productId){
		return this.http.get('/products/' + productId + '/items')
	}

	quote_ready(order){
		return this.http.post('/quote', order)
	}

	quote_bulk(order){
		return this.http.post('/quote/bulk', order)
	}

	order_place(orderToken){
		return this.http.post('/order', orderToken)
	}

	order_reprint(orderId, order){
		return this.http.post('/order/' + orderId + '/reprint', order)
	}

	order_get(orderId){
		if(orderId) return this.http.get('/order/' + orderId)
		else return this.http.get('/order')
	}
}

module.exports = API