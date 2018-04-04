class Util {

	is_primitive(object){
		return object === null ||
			typeof object === 'string' || 
			typeof object === 'number' || 
			typeof object === 'boolean' ||
			typeof object === 'symbol' ||
			typeof object === 'undefined'
	}

    /**
	 * Extracts any fileStream objects and returns a mutated version of original and an object with the fileStreams
     * @param original designObject to remove fileStream objects from
     * @returns {{art, clone: any}} art object with the fileStream objects, cloned object with the fileStreams removed
     */
	stash_art(original) {
		const clone = JSON.parse(JSON.stringify(original))
		const art = this._stash_art(original)
		for(let property in art){
            delete clone['sides'][property]['artwork']
		}
		return { art, clone }
	}

	_stash_art(designObject){
        const art = {}
        const sides = ['front', 'back', 'left', 'right']
        for(let i in sides){
            const side = sides[i]
            const value = this._safe(['sides', side, 'artwork'], designObject)
            if (value)
                if(typeof value != 'string')
                    art[side] = value
        }
        return art
	}

    /**
	 * Safely access nested attributes
     * @param path array of the nested path
     * @param object object to attempt to access
     * @returns {*} null if there is nothing in the object, or the value at the given path depth
     * @private
     */
    _safe(path, object) {
        return path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, object)
    }

	to_form(object){
		return this._to_form(object, '', {})
	}

	_to_form(object, key, hash){
		if (this.is_primitive(object)) {
			hash[key] = object
			return hash
			// if(key) hash[key] = object
			// else hash[object] = object
			// return hash
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