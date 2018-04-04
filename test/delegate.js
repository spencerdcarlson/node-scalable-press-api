const API =  require("../api")
const fs = require('fs')

class SAPIDelegate {

    constructor() {
        const credentials = require('../config/credentials.json')
        this.api = new API(credentials.username, credentials.password)
        this.payloads = {
            "payload": {
                type: 'screenprint',
                sides: {
                    front: {
                        artwork: fs.createReadStream(__dirname + '/images/image.eps'),
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
        }
    }

    create_design_object(request) {
        return new Promise((resolve, reject) => {
            this.api.design.create(request).then(response => {
                resolve(JSON.parse(response).designId)
            })
        })
    }
}

module.exports = SAPIDelegate