const test = require('ava').test
const API =  require("../api")

let api

test.cb.before('set up global variables', (t) => {
	const credentials = require('../config/credentials.json')
   	api = new API(credentials.username, credentials.password)
   	t.end()
})


// PRODUCT API
test('List product categories', t => {
	return api.product.list_categories().then(response => {
		response = JSON.parse(response)
		t.is(response.length, 36);
	})
})

test('List products', t => {
	return api.product.list('sweatshirts').then(response => {
		response = JSON.parse(response)
		t.is(response.type, "Garment")
		t.is(response.name, "Sweatshirts")
		t.is(response.products.length, 97)
	})
})

test('List product information', t => {
	return api.product.info('gildan-sweatshirt-crew').then(response => {
		response = JSON.parse(response)
		t.is(response.type, "Garment")
		t.is(response.name, "Gildan Sweatshirt - Crew")
	})
})

test('List product availability', t => {
	return api.product.availability('gildan-sweatshirt-crew').then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.truthy(response)
		t.is(response['antique sapphire'].sml, 272)
	})
})


test('List detailed item information', t => {
	return api.product.detail('gildan-sweatshirt-crew').then(response => {
		response = JSON.parse(response)
		t.is(response.statusCode, 401)
		t.is(response.message, "This API key cannot access this API")
	})
})

// QUOTE API
test('Get a quote', t => {
	const order = {
		"type":"dtg",
		"products": [{
			"id": "gildan-sweatshirt-crew",
			"color": "ash",
			"quantity": 12,
			"size": "lrg"
		}],
		address: {
			"name": "My Customer",
			"address1": "123 Scalable Drive",
			"city": "West Pressfield",
			"state": "CA",
			"zip": "12345"
		},
		"designId": "53ed3a23b3730f0e27a6651"
	}

	return api.quote.get(order).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 400)
		t.is(response.issues[0].message, "Invalid design id: \'53ed3a23b3730f0e27a6651\'")
	})
})

// ORDER API
test("", t => {
	// 1. make a design => designId
	// 2. get a qote => orderToken
	// 3. make an order witth the Order token
	const order = {
		items: [{
			itemIndex: 0,
			address: {
				name: "My Customer",
				address1: "123 Scalable Drive",
				city: "West Pressfield",
				state: "CA",
				zip: "12345"
			}
		}]
	}

	return api.order.reprint('53ed3a23b3730f0e27a6651', order).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 500)
		t.is(response.message, 'Cast to ObjectId failed for value "53ed3a23b3730f0e27a6651" at path "_id" for model "Order"')
	})
})

test("", t => {
	return api.order.place({orderToken: 'c6ae6ca449719e5237d103139255ecdd'}).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 404)
		t.is(response.message, "Could not find quote with order token \'c6ae6ca449719e5237d103139255ecdd\'.")
	})
})

test("", t => {
	const order = {
		items: [{
			itemIndex: 0,
			address: {
				name: "My Customer",
				address1: "123 Scalable Drive",
				city: "West Pressfield",
				state: "CA",
				zip: "12345"
			}
		}]
	}
	return api.order.reprint('1234', order).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 500)
		t.is(response.message, 'Cast to ObjectId failed for value "1234" at path "_id" for model "Order"')
	})
})

// HANGS
// test("", t => {
// 	return api.order.get().then(response => {
// 		response = JSON.parse(response)
// 		console.log('response ', response)
// 		t.is(response.statusCode, 404)
// 		t.is(response.message, "Could not find quote with order token \'c6ae6ca449719e5237d103139255ecdd\'.")
// 	})
// })

test("", t => {
	return api.order.get(123).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 500)
		t.is(response.message, 'Cast to ObjectId failed for value "123" at path "_id" for model "Order"')
	})
})

test("", t => {
	const address_change = {
		itemIndex: 0,
		address: {
			name: 'My Customer',
			address1: '123 Scalable Drive',
			city: 'West Pressfield',
			state: 'CA',
			zip: '12345'
		}
	}

	return api.order.change_address(123, address_change).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 500)
		t.is(response.message, 'Cast to ObjectId failed for value "123" at path "_id" for model "Order"')
	})
})


test("", t => {
	return api.order.cancel(123).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 500)
		t.is(response.message, 'Cast to ObjectId failed for value "123" at path "_id" for model "Order"')
	})
})

// EVENT API
test("", t => {
	const dates = { start: '2015-12-02', end: '2015-12-04' }
	return api.event.get(null, dates).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 400)
		t.is(response.message, 'Please provide date in ISO 8601 format')
	})
})

test("", t => {
	return api.event.get().then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.deepEqual(response, [])
	})
})

// DESIGN API
test("", t => {
	return api.design.get(123).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 500)
		t.is(response.message, 'Cast to ObjectId failed for value "123" at path "_id" for model "Design"')
	})
})

test("", t => {
	return api.design.delete(123).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 500)
		t.is(response.message, 'Cast to ObjectId failed for value "123" at path "_id" for model "Design"')
	})
})

test("", t => {
	return api.custom.get().then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.deepEqual(response, [])
	})
})

test("", t => {
	return api.invoice.get().then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 400)
		t.is(response.message, 'Billing API not available in test mode')
	})
})

test("", t => {
	return api.invoice.get(123).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 400)
		t.is(response.message, 'Billing API not available in test mode')
	})
})

test("", t => {
	const payInfo = {
		transactionId: 'XXXXXXXXXXXX123',
		amount: '2.00',
		email: 'paypalaccount@scalablepress.com'
	}

	return api.invoice.pay(123, payInfo).then(response => {
		response = JSON.parse(response)
		// console.log('response ', response)
		t.is(response.statusCode, 503)
		t.is(response.message, 'Cannot make payment until billing2 transition complete')
	})
})

