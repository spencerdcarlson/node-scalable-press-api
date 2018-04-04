const HTTP =  require("./http")
const https = require('https')
const FormData = require('form-data')
const Util = require('./util')
const util  = new Util()

class HTTPForm extends HTTP {

	post(path, data) {
		return new Promise((resolve, reject) => {
			const options = super.get_options()
			options.path += path
			options.method = 'POST'

			// clone data and delete files
			let { art, clone } = util.stash_art(data)
			const form_data = util.to_form(clone)
            const form = new FormData()
			for(let property in form_data){
				form.append(property, form_data[property])
			}
			// add files to form data
			for(let side in art){
                form.append('sides[' + side + '][artwork]', art[side])
			}

			// add content headers 
			options.headers['content-type'] = form.getHeaders()['content-type']			
			// build post request
			const req = https.request(options)
			form.pipe(req);

			req.on('response', (response) => {
			  	let body = ''
			  	response.on('data', (chunk) => { body += chunk; })
				response.on('end', () => { resolve(body) })
			})
			req.on('error', (e) => { reject(e) })
		})
	}
	
}

module.exports = HTTPForm