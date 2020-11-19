process.env.LOGGING_LOGTOFILE = true
process.env.ODATA_USER = "root"
process.env.ODATA_PASSWD = "123"
var server = require('../mockserver')

var assert = require('assert')
var tools = require('../tools/toolbox.js')

before(() =>{
	server.initWithOrderroutine()
}) 

describe('Tests for Orderroutine', () => {
	

	 it('looks if WarehouseOrderSet is initial', async () => {
		let res = await tools.getEntity("WarehouseOrderSet", {})
		assert.deepStrictEqual(res.body.d.results.length === 1, true)
	})

	it('waits for intervall', function() {
		this.timeout(30000)
		assert.deepStrictEqual(true === true, true)
	})
	
	it('checks if intervall creates an order', async () => {
		let res = await tools.getEntity("WarehouseOrderSet", {})
		assert.deepStrictEqual(res.body.d.results.length > 1, true)
	})

})


after(() => {
	server.stop()
	process.exit()
})