const HTTP =  require("./http")

class HTTPv3 extends HTTP {

	get_options() {
	  	const options = super.get_options()
	  	options.path = '/v3'
	  	return options
	}
	
}

module.exports = HTTPv3