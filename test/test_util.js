const API =  require("../api")

class TestUtil {

    constructor() {
        const credentials = require('../config/credentials.json')
        this.api = new API(credentials.username, credentials.password)
    }

    create_design_object(request) {
        return new Promise((resolve, reject) => {
            this.api.design.create(request).then(response => {
                resolve(JSON.parse(response).designId)
            })
        })
    }
}

module.exports = TestUtil