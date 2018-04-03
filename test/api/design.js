const test = require('ava').test
const API =  require("../../api")
const fs = require('fs')

let api

test.cb.before('set up global variables', (t) => {
    const credentials = require('../../config/credentials.json')
    api = new API(credentials.username, credentials.password)
    t.end()
})

// DESIGN API
test('create design', t => {
	const design_object = {
		type: 'screenprint',
		sides: {
			front: {
				artwork: fs.createReadStream(__dirname + '/../images/image.eps'),
				colors: ['white'],
				dimensions: {
					width: 5
				},
				position: {
					horizontal: 'C',
					offset: {
						top: 2.5
					}
				}
			}
		}
	}

	// const design_object = {
	// 	'type': 'screenprint',
	// 	'sides[front][artwork]': fs.createReadStream(__dirname + '/images/image.eps'),
	// 	'sides[front][colors][0]': 'white',
	// 	'sides[front][dimensions][width]': 5,
	// 	'sides[front][position][horizontal]': 'C',
	// 	'sides[front][position][offset][top]': 2.5
	// }

	return api.design.create(design_object).then(response => {
		response = JSON.parse(response)
        t.truthy(response.designId.match(/[0-9a-fA-F]{24}/))
	})
})

test("", t => {
    return api.design.get('5ac32ae52d106b77576e1ff1').then(response => {
        response = JSON.parse(response)
        console.log('response ', response)
        t.is(response.statusCode, 500)
        t.is(response.message, 'Cast to ObjectId failed for value "123" at path "_id" for model "Design"')
    })
})

test("", t => {
    return api.design.delete(123).then(response => {
        response = JSON.parse(response)
        // console.log('response ', response)
        t.is(response.statusCode, 500)
        t.is(response.message, 'Cast to ObjectId failed for value "123" at path "_id" for model "Design"')
    })
})