const API =  require("./scalable_press_api")

const api = new API()

// api.product.list_categories().then(result => {
// 	console.log("result ", result)
// })

// api.product.list('sweatshirts').then(result => {
// 	console.log("result ", result)
// })

// api.product.info('gildan-sweatshirt-crew').then(result => {
// 	console.log("result ", result)
// })

// api.product.availability('gildan-sweatshirt-crew').then(result => {
// 	console.log("result ", result)
// })

// api.product.item_info('gildan-sweatshirt-crew').then(result => {
// 	console.log("result ", result)
// })


// const order = {
// 	"type":"dtg",
// 	"products": [{
// 		"id": "gildan-sweatshirt-crew",
// 		"color": "ash",
// 		"quantity": 12,
// 		"size": "lrg"
// 	}],
// 	address: {
// 		"name": "My Customer",
// 		"address1": "123 Scalable Drive",
// 		"city": "West Pressfield",
// 		"state": "CA",
// 		"zip": "12345"
// 	},
// 	"designId": "53ed3a23b3730f0e27a6651"
// }
// api.quote.get(order).then(result => {
// 	console.log("result ", result)
// })

// const orders = {
// 	items: [
// 	{
// 		"type":"dtg",
// 		"designId": "53ed3a23b3730f0e27a66513",
// 		"products": [{
// 			"id": "gildan-sweatshirt-crew",
// 			"color": "ash",
// 			"quantity": 12,
// 			"size": "med"
// 		}],
// 		address: {
// 			"name": "My Customer",
// 			"address1": "123 Scalable Drive",
// 			"city": "West Pressfield",
// 			"state": "CA",
// 			"zip": "12345"
// 		}
// 	}, 
// 	{
// 		"type":"dtg",
// 		"designId": "53ed3a23b3730f0e27a66513",
// 		"products": [{
// 			"id": "gildan-sweatshirt-crew",
// 			"color": "ash",
// 			"quantity": 12,
// 			"size": "lrg"	
// 		}],
// 		address: {
// 			"name": "My Customer",
// 			"address1": "123 Scalable Drive",
// 			"city": "West Pressfield",
// 			"state": "CA",
// 			"zip": "12345"
// 		}
// 	}]
// }

// api.quote.bulk(orders).then(result => {
// 	console.log("result ", result)
// })

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


