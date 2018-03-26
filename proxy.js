const https = require('https')
const querystring = require('querystring')

class Proxy {
	Proxy() {
		const username = NaN
		const password = 'test_XCCcCuLgPEOcWOGEZBWiPw'
	}

	auth(username, password, api_path) {
	  	return {
	   		host: 'api.scalablepress.com',
	   		port: 443,
	   		path: '/v2' + api_path,
	   		// authentication headers
	   		headers: {
	      		'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
	   		}   
		}
	}

	get(options) {
		return new Promise((resolve, reject) => {
			console.log('HEADERS: ' + JSON.stringify(options.headers))
			let request = https.get(options, (res) => {
				let body = "";
				res.on('data', (data) => { body += data })
				res.on('end', () => { resolve(body) })
				res.on('error', (e) => { reject(e) })
			})
		})
	}

	post(options, post_data) {
		// post_data = querystring.stringify(post_data);
		post_data = JSON.stringify(post_data);
		options.method = 'POST'
		options.headers['Content-Type'] = 'application/json'
		options.headers['Content-Length'] = Buffer.byteLength(post_data)

		console.log('HEADERS: ' + JSON.stringify(options.headers))
     

		var req = https.request(options, (res) => {
			let body = "";
			res.on('data', (data) => { body += data; console.log('POST DATA') })
			res.on('end', () => { console.log(body) })
		});
		// req.write(post_data)
		req.end(post_data);
	}

	simplePost() {
		// curl "https://api.scalablepress.com/v2/quote" -u ":test_XCCcCuLgPEOcWOGEZBWiPw" -d "type=dtg" -d "products[0][id]=gildan-sweatshirt-crew" -d "products[0][color]=ash" -d "products[0][quantity]=12" -d "products[0][size]=lrg" -d "address[name]=My Customer" -d "address[address1]=123 Scalable Drive" -d "address[city]=West Pressfield" -d "address[state]=CA" -d "address[zip]=12345" -d "designId=53ed3a23b3730f0e27a6651"
		console.log('simple post');
		const data = {
			'type':'dtg',
			'products[0][id]': 'gildan-sweatshirt-crew',
			'products[0][color]' : 'ash',
			'products[0][quantity]': 12,
			'products[0][size]': 'lrg',
			'address[name]': 'My Customer',
			'address[address1]': '123 Scalable Drive',
			'address[city]': 'West Pressfield',
			'address[state]': 'CA',
			'address[zip]': '12345',
			'designId': '53ed3a23b3730f0e27a6651'
		}
		this.post(this.auth(this.username, this.password, '/quote'), data)
	}

	simpleGet(){
		// curl "https://api.scalablepress.com/v2/categories" -u ":test_XCCcCuLgPEOcWOGEZBWiPw"
		console.log('simple get');
		this.get(this.auth(this.username, this.password, '/categories')).then(result => {
			console.log('############################' + result)
		})
	}

  
}

module.exports = Proxy



