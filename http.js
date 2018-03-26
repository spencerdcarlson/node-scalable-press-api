const https = require('https')

class HTTP {
	
	constructor(username, password) {
		this.username = username
		this.password = password
		// this.password = 'test_XCCcCuLgPEOcWOGEZBWiPw'
	}

	get_options() {
	  	return {
	   		host: 'api.scalablepress.com',
	   		port: 443,
	   		path: '/v2',
	   		headers: {
	      		'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.password).toString('base64')
	   		}   
		}
	}

	get(path) {
		return new Promise((resolve, reject) => {
			const options = this.get_options()
			options.path += path
			let request = https.get(options, (res) => {
				let body = "";
				res.on('data', (data) => { body += data })
				res.on('end', () => { resolve(body) })
				res.on('error', (e) => { reject(e) })
			})
		})
	}

	post(path, data) {
		return new Promise((resolve, reject) => {
			const options = this.get_options()
			data = JSON.stringify(data)
			options.path += path
			options.method = 'POST'
			options.headers['Content-Type'] = 'application/json'
			if(data) options.headers['Content-Length'] = Buffer.byteLength(data)
			const req = https.request(options, (res) => {
				let body = "";
				res.on('data', (chunk) => { body += chunk; })
				res.on('end', () => { resolve(body) })
			});
			req.on('error', (e) => { reject(e) })
			if(data) req.write(data)
			req.end()
		})
	}

	delete(path, data){
		return new Promise((resolve, reject) => {
			const options = this.get_options()
			data = JSON.stringify(data)
			options.path += path
			options.method = 'DELETE'
			options.headers['Content-Type'] = 'application/json'
			if(data) options.headers['Content-Length'] = Buffer.byteLength(data)
			const req = https.request(options, (res) => {
				let body = "";
				res.on('data', (chunk) => { body += chunk; })
				res.on('end', () => { resolve(body) })
			});
			req.on('error', (e) => { reject(e) })
			if(data) req.write(data)
			req.end()
		})
	}

	simplePost() {
		// curl -X POST "https://api.scalablepress.com/v2/quote" -u ":test_XCCcCuLgPEOcWOGEZBWiPw" -d "type=dtg" -d "products[0][id]=gildan-sweatshirt-crew" -d "products[0][color]=ash" -d "products[0][quantity]=12" -d "products[0][size]=lrg" -d "address[name]=My Customer" -d "address[address1]=123 Scalable Drive" -d "address[city]=West Pressfield" -d "address[state]=CA" -d "address[zip]=12345" -d "designId=53ed3a23b3730f0e27a6651"
		const data = {
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

		this.post('/quote', data).then(result => {
			console.log('############################' + result)
		})
	}

	simpleGet(){
		// curl "https://api.scalablepress.com/v2/categories" -u ":test_XCCcCuLgPEOcWOGEZBWiPw"
		this.get('/categories').then(result => {
			console.log('############################' + (result == null))
		})
	}

	simpleDelete(){
		this.delete('/order/{orderId}').then(result => {
			console.log('############################' + result)
		})
	}

  
}

module.exports = HTTP



