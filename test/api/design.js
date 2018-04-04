const test = require('ava').test
const SAPIDelegate =  require('../delegate')

let api
let delegate

test.cb.before('set up global variables and call the ', (t) => {
    delegate = new SAPIDelegate()
	api = delegate.api
    t.end()
})

// DESIGN API
test("design.create api - https://scalablepress.com/docs/#create-design-object", t => {
    return delegate.create_design_object(delegate.payloads.payload).then(id => {
        t.truthy(id.match(/[0-9a-fA-F]{24}/))
    })
})

test("design.get - https://scalablepress.com/docs/#retrieve-design-object", t => {
    return delegate.create_design_object(delegate.payloads.payload).then(id => {
      return api.design.get(id).then(response => {
          response = JSON.parse(response)
          t.is(response.type, delegate.payloads.payload.type)
          t.is(response.designId, id)
      })
    })
})

test("design.delete - https://scalablepress.com/docs/#delete-design", t => {
    return delegate.create_design_object(delegate.payloads.payload).then(id => {
        return api.design.delete(id).then(response => {
            response = JSON.parse(response)
            t.is(response.designId, id)
            t.truthy(response.deletedAt)
            t.is(new Date(response.deletedAt).toDateString(), new Date().toDateString())
        })
    })
})