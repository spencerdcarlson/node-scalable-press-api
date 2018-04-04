const test = require('ava').test
const SAPIDelegate =  require('../delegate')

let delegate
let api
test.cb.before('set up global variables and call the ', (t) => {
    delegate = new SAPIDelegate()
    api = delegate.api
    t.end()
})

// QUOTE API
test('Get a quote', t => {
    return delegate.create_design_object(delegate.payloads.payload).then(id => {

        const order = {
            "type":"screenprint",
            "products": [{
                "id": "gildan-sweatshirt-crew",
                "color": "ash",
                "quantity": 12,
                "size": "lrg"
            }],
            address: {
                "name": "My Customer",
                "address1": "123 Scalable Drive",
                "city": "West Pressfield",
                "state": "CA",
                "zip": "12345"
            },
            "designId": id
        }

        return api.quote.get(order).then(response => {
            response = JSON.parse(response)
            t.is(response.breakdown.length, 1)
        })
    })

})