const test = require('ava').test
const TestUtil =  require('../test_util')
const fs = require('fs')

let api
let util

const payload = {
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

test.cb.before('set up global variables and call the ', (t) => {
	util = new TestUtil()
	api = util.api
    t.end()
})


// DESIGN API
test("design.create api - https://scalablepress.com/docs/#create-design-object", t => {
    return util.create_design_object(payload).then(id => {
        t.truthy(id.match(/[0-9a-fA-F]{24}/))
    })
})

test("design.get - https://scalablepress.com/docs/#retrieve-design-object", t => {
    return util.create_design_object(payload).then(id => {
      return api.design.get(id).then(response => {
          response = JSON.parse(response)
          t.is(response.type, payload.type)
          t.is(response.designId, id)
      })
    })
})

test("design.delete - https://scalablepress.com/docs/#delete-design", t => {
    return util.create_design_object(payload).then(id => {
        return api.design.delete(id).then(response => {
            response = JSON.parse(response)
            t.is(response.designId, id)
            t.truthy(response.deletedAt)
            t.is(new Date(response.deletedAt).toDateString(), new Date().toDateString())
        })
    })
})




