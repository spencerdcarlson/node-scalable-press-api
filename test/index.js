const test = require('ava').test
const API =  require("../api")

let api

test.cb.before('set up global variables', (t) => {
	const credentials = require('../config/credentials.json')
   	api = new API(credentials.username, credentials.password)
   	t.end()
})

test('list categories', t => {
	return api.product.list_categories().then(response => {
		response = JSON.parse(response)
		t.is(response.length, 36);
	})
})

test("list 'sweatshirts' products", t => {
	return api.product.list('sweatshirts').then(response => {
		response = JSON.parse(response)
		t.is(response.type, "Garment")
		t.is(response.name, "Sweatshirts")
		t.is(response.products.length, 97)
	})
})

test("list 'sweatshirts' products", t => {
	return api.product.info('gildan-sweatshirt-crew').then(response => {
		response = JSON.parse(response)
		t.is(response.type, "Garment")
		t.is(response.name, "Gildan Sweatshirt - Crew")
	})
})


test("list 'sweatshirts' products", t => {
	return api.product.item_info('gildan-sweatshirt-crew').then(response => {
		response = JSON.parse(response)
		t.is(response.statusCode, 401)
		t.is(response.message, "This API key cannot access this API")
	})
})

test("list 'sweatshirts' products", t => {
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


// api.order.place({orderToken: 'c6ae6ca449719e5237d103139255ecdd'}).then(result => {
// 	console.log("result ", result)
// })

// const order = {
// 	items: [{
// 		itemIndex: 0,
// 		address: {
// 			name: "My Customer",
// 			address1: "123 Scalable Drive",
// 			city: "West Pressfield",
// 			state: "CA",
// 			zip: "12345"
// 		}
// 	}]
// }
// api.order.reprint('1234', order).then(result => {
// 	console.log("result ", result)
// })

// api.order.get().then(result => {
// 	console.log("result ", result)
// })

// api.order.get(123).then(result => {
// 	console.log("result ", result)
// })


// const address_change = {
//   itemIndex: 0,
//   address: {
//     name: 'My Customer',
//     address1: '123 Scalable Drive',
//     city: 'West Pressfield',
//     state: 'CA',
//     zip: '12345'
//   }
// }

// api.order.change_address(123, address_change).then(result => {
//   console.log("result ", result)
// })

// api.order.cancel(123).then(result => {
//   console.log("result ", result)
// })

// const dates = { start: '2015-12-02', end: '2015-12-04' }
// api.event.get(null, dates).then(result => {
//   console.log("result ", result)
// })

// api.event.get(123).then(result => {
//   console.log("result ", result)
// })

// api.event.get().then(result => {
//   console.log("result ", result)
// })

// api.design.get(1234).then(result => {
//   console.log("result ", result)
// })

// api.design.delete(1234).then(result => {
//   console.log("result ", result)
// })

// api.custom.get().then(result => {
//   console.log("result ", result)
// })

// api.invoice.get().then(result => {
//   console.log("result ", result)
// })

// api.invoice.get(1234).then(result => {
//   console.log("result ", result)
// })

// const payInfo = {
//   transactionId: 'XXXXXXXXXXXX123',
//   amount: '2.00',
//   email: 'paypalaccount@scalablepress.com'
// }
// api.invoice.pay(1234567, payInfo).then(result => {
//   console.log("result ", result)
// })
