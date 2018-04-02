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

	to_h(object, key, hash){
		if (this.is_primitive(object)) {
			// console.log('key: ', key)
			// console.log('string: ', object)
			if(key) hash[key] = object
			else hash[object] = object
			// console.log('return ', hash)
			return hash
		}
		for(let property in object){
			if(Array.isArray(object[property])){

				// let array = object[property]
                // for(let element in array){
					// let array_key
					// if(key)
                //         array_key = key + '[' + property + '][' + element + ']'
					// else
                //         array_key = property + '[' + element + ']'
					// // console.log('key: ', key, ' value: ', array[element], ' hash: ', hash)
					// hash = Object.assign(hash, this.to_h(array[element], array_key, hash))
                // }
                // key = key.replace('['+ property + ']', '')
			}
			else if (this.is_primitive(object[property])) {
				if(key){
					key = key + '[' + property + ']'
                    hash = Object.assign(hash, this.to_h(object[property], key, hash))
                    key = key.replace('['+ property + ']', '')
				}
				else
					hash = Object.assign(hash, this.to_h(object[property], property, hash))
			}
			else if(typeof object[property] === 'object'){
                let nested_key
				if (key)
                    nested_key = key + '['+ property + ']'
                else
                    nested_key = property
                hash = Object.assign(hash, this.to_h(object[property], nested_key, hash))
				return hash
			}
		}
		return hash
	}

	is_last_property(property, object){
        const keys = Object.keys(object)
        const last_property = keys[keys.length-1]
		return property == last_property
	}
}

module.exports = Util