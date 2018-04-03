const test = require('ava').test
const Util = require('../../lib/util')

let util

test.cb.before('SETUP: Before all tests', (t) => {
    util = new Util()
    t.end()
})

test('is a simple type', t => {
    // simple types
    t.is(util.is_primitive('hello'), true)
    t.is(util.is_primitive(10), true)
    t.is(util.is_primitive(true), true)
    t.is(util.is_primitive(null), true)
    // complex types
    t.is(util.is_primitive({}), false)
    t.is(util.is_primitive([]), false)
    t.is(util.is_primitive(new Array()), false)
    t.is(util.is_primitive(new Object()), false)
})


test('convert simple object to form notation', t => {
    const object = {colors: ['blue', 'green'], name: 'spencer', age: 30, is_cool: true, brain: null}
    let result = util.to_form(object , '', {})
    t.is(result['colors[0]'], 'blue')
    t.is(result['colors[1]'], 'green')
    t.is(result['name'], 'spencer')
    t.is(result['age'], 30)
    t.is(result['is_cool'], true)
    t.is(result['brain'], null)
    // make sure there are no extra elements
    delete result['colors[0]']
    delete result['colors[1]']
    delete result['name']
    delete result['age']
    delete result['is_cool']
    delete result['brain']
    t.deepEqual(result, {})
})

test('convert nested object to form notation', t => {
    const object = { name: 'spencer', colors: [ 'blue' ], friends: { zandy: 'Alexandra', ben: 'Ben'} }
    let result = util.to_form(object , '', {})
    t.is(result['colors[0]'], 'blue')
    t.is(result['name'], 'spencer')
    t.is(result['friends[zandy]'], 'Alexandra')
    t.is(result['friends[ben]'], 'Ben')
    // make sure there are no extra elements
    delete result['colors[0]']
    delete result['name']
    delete result['friends[zandy]']
    delete result['friends[ben]']
    t.deepEqual(result, {})
})

test('convert array of objects to form notation', t => {
    const object = { name: 'spencer', colors: [ 'blue' ], friends: [{ name: 'Alexandra'},{ name: 'Ben'}] }
    let result = util.to_form(object , '', {})
    t.is(result['name'], 'spencer')
    t.is(result['colors[0]'], 'blue')
    t.is(result['friends[0][name]'], 'Alexandra')
    t.is(result['friends[1][name]'], 'Ben')
    // make sure there are no extra elements
    delete result['name']
    delete result['colors[0]']
    delete result['friends[0][name]']
    delete result['friends[1][name]']
    t.deepEqual(result, {})
})

test('convert design request object to form notation', t => {
    const object = {
        type: 'screenprint',
        sides: {
            front: {
                artwork: '/images/image.eps',
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

    let result = util.to_form(object , '', {})
    t.is(result['type'], 'screenprint')
    t.is(result['sides[front][artwork]'], '/images/image.eps')
    t.is(result['sides[front][colors][0]'], 'white')
    t.is(result['sides[front][dimensions][width]'], 5)
    t.is(result['sides[front][position][horizontal]'], 'C')
    t.is(result['sides[front][position][offset][top]'], 2.5)
    // make sure there are no extra elements
    delete result['type']
    delete result['sides[front][artwork]']
    delete result['sides[front][colors][0]']
    delete result['sides[front][dimensions][width]']
    delete result['sides[front][position][horizontal]']
    delete result['sides[front][position][offset][top]']
    t.deepEqual(result, {})
})







