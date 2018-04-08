# NodeJS Scaleable Press API

## Install
`npm i -s @spencerdcarlson/scalable-pres`

## Usage
1. Register to use the [Scalable Press API](https://scalablepress.com/auth/register)

```javascript
const API = require('@spencerdcarlson/scalable-pres')

const credentials = {
	"username": null,
	"password": "test_XCocculgRiOcWddEZBciPw" // test api key - https://scalablepress.com/manager/v2/settings/api
}

const api = new API(credentials.username, credentials.password)


api.product.list('sweatshirts').then(response => {
	console.log(response)
})
```

### More Examples
See the [test](test/api) files for more api usage examples

## API Documentation
[API documentation](https://scalablepress.com/docs/)