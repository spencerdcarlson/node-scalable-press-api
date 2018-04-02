class Util {

	constructor(){
		// let result = this.to_h( { colors: [ 'blue', 'green' ], name: 'spencer', age: 30, is_cool: true, brain: null }, '', {})
		// let result = this.to_h( { name: 'spencer', colors: [ 'blue' ], friends: { zandy: 'Alexandra', ben: 'Ben'} }, '', {})
		// let result = this.to_h( { name: 'spencer', colors: [ 'blue' ], friends: [{ name: 'Alexandra'},{ name: 'Ben'}] }, '', {})
		// console.log(result)

        // const design_object = {
        //     type: 'screenprint',
        //     sides: {
        //         front: {
        //             artwork: '/images/image.eps',
        //             colors: ['white'],
        //             dimensions: {
        //                 width: 5
        //             },
        //             position: {
        //                 horizontal: 'C',
        //                 offset: {
        //                     top: 2.5
        //                 }
        //             }
        //         }
        //     }
        // }
        // let result = this.to_h( design_object, '', {})
        // console.log(result)
	}

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
				let array = object[property]
				for(let element in array){
					let array_key
					if(key)
                        array_key = key + '[' + property + '][' + element + ']'
					else
                        array_key = property + '[' + element + ']'
					// console.log('key: ', key, ' value: ', array[element], ' hash: ', hash)
					hash = Object.assign(hash, this.to_h(array[element], array_key, hash))
					if(this.is_last_property(element, array)){
                        key = key.replace('['+ property + ']', '')
					}
				}
			}
			else if (this.is_primitive(object[property])) {
				if(key){
                    hash = Object.assign(hash, this.to_h(object[property], key, hash))
                    key = key.replace('['+ property + ']', '')
				}
				else
					hash = Object.assign(hash, this.to_h(object[property], property, hash))
			}
			else if(typeof object[property] === 'object'){
				let nested_object = object[property]
				for(let nested_property in nested_object){
                    let nested_key
					if (key)
                        nested_key = key + '['+ nested_property + ']'
					else
						nested_key = property + '[' + nested_property + ']'
					// console.log('key: ', key)
					hash = Object.assign(hash, this.to_h(nested_object, nested_key, hash))
                    if(this.is_last_property(nested_property, nested_object)){
                        key = key.replace('['+ nested_property + ']', '')
						return hash
                    }

				}
			}
			// last loop?
			if(this.is_last_property(property, object)){
                return hash
			}
			// const keys = Object.keys(object)
			// const last_property = keys[keys.length-1]
			// if(property === last_property){
			// 	return hash
			// }
		}
	}

	is_last_property(property, object){
        const keys = Object.keys(object)
        const last_property = keys[keys.length-1]
		return property == last_property
	}
}

module.exports = Util