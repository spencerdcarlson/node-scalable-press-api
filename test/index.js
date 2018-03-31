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
	});
});

test("list 'sweatshirts' products", t => {
	return api.product.list('sweatshirts').then(response => {
		response = JSON.parse(response)
		t.is(response.type, "Garment")
		t.is(response.name, "Sweatshirts")
		t.is(response.products.length, 97)
	})
});
