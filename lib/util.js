class Util {

	is_primitive(object){
		return object === null ||
			typeof object === 'string' || 
			typeof object === 'number' || 
			typeof object === 'boolean' ||
			typeof object === 'symbol' ||
			typeof object === 'undefined'
	}

    omit(original) {
		const clone = JSON.parse(JSON.stringify(original))
		delete clone['sides']['front']['artwork']
		return clone
	}

	to_form(object){
		return this._to_form(object, '', {})
	}

	_to_form(object, key, hash){
		if (this.is_primitive(object)) {
			if(key) hash[key] = object
			else hash[object] = object
			return hash
		}
		for(let property in object){
			let value = object[property]
			if(Array.isArray(value)){
				let array = value
				let array_key = (key) ? '[' + property + ']' : property
				key += array_key
                for(let element in array){
                    key += '[' + element + ']'
					hash = Object.assign(hash, this._to_form(array[element], key, hash))
					key = key.replace('[' + element + ']', '')
                }
                key = key.replace(array_key, '')
			}
			else if (this.is_primitive(value)) {
				let primitive = value
				let primitive_key = (key) ? key + '[' + property + ']' :property
				hash = Object.assign(hash, this._to_form(primitive, primitive_key, hash))
			}
			else if(typeof value === 'object'){
                let obj = value
				let nested_key = (key) ? key + '['+ property + ']' : property
                hash = Object.assign(hash, this._to_form(obj, nested_key, hash))
			}
		}
		return hash
	}
}

module.exports = Util