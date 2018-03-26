const https = require('https')

let username = NaN
let password = 'test_XCCcCuLgPEOcWOGEZBWiPw'

let post_data = JSON.stringify({
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
})

let options = {
	host: 'api.scalablepress.com',
	port: 443,
	path: '/v2/quote',
	method: 'POST',
	headers: {
		'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64'),
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(post_data)
	}   
}

var req = https.request(options, (res) => {
	let body = "";
	res.on('data', (data) => { body += data; })
	res.on('end', () => { console.log(body) })
});

req.on('error', (e) => { console.error(`problem with request: ${e.message}`) })
req.write(post_data)
req.end()