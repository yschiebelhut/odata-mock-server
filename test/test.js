var assert = require('assert')
var tools = require('../tools/toolbox.js')

describe('Deleting Entities', () => {
    describe('Delete All Robots', () => {
        it('should execute drop-if-exists', async () => {
            await tools.createEntity("RobotSet", { "Lgnum": "1337", "Rsrc": "Isaac" })
            let deletion = await tools.deleteAllEntities("RobotSet", ["Lgnum", "Rsrc"])
            await tools.allPromiseWrapper(deletion)
    
            let res = await tools.getEntity("RobotSet", { })
            assert.deepStrictEqual(res.body.d.results.length === 0, true)    
        })

        it('verify that http status code is 200', async () => {
            let deletion = await tools.deleteAllEntities("RobotSet", ["Lgnum", "Rsrc"])
            await tools.allPromiseWrapper(deletion)
    
            let res = await tools.getEntity("RobotSet", { })
            assert.deepStrictEqual(res.statusCode, 200)    
        })
    })

    describe('Delete All OpenWarehouseTasks', () => {
        it('should execute drop-if-exists', async () => {
            await tools.createEntity("OpenWarehouseTaskSet", { "Lgnum": "1337", "Tanum": "12345" })
            let deletion = await tools.deleteAllEntities("OpenWarehouseTaskSet", ["Lgnum", "Tanum"])
            await tools.allPromiseWrapper(deletion)
    
            let res = await tools.getEntity("OpenWarehouseTaskSet", { })
            assert.deepStrictEqual(res.body.d.results.length === 0, true)    
        })

        it('verify that http status code is 200', async () => {
            let deletion = await tools.deleteAllEntities("OpenWarehouseTaskSet", ["Lgnum", "Tanum"])
            await tools.allPromiseWrapper(deletion)
    
            let res = await tools.getEntity("OpenWarehouseTaskSet", { })
            assert.deepStrictEqual(res.statusCode, 200)    
        })
    })

    describe('Delete All WarehouseOrders', () => {
        it('should execute drop-if-exists', async () => {
            await tools.createEntity("WarehouseOrderSet", { "Lgnum": "1337", "Who": "12345" })
            let deletion = await tools.deleteAllEntities("WarehouseOrderSet", ["Lgnum", "Who"])
            await tools.allPromiseWrapper(deletion)
    
            let res = await tools.getEntity("WarehouseOrderSet", { })
            assert.deepStrictEqual(res.body.d.results.length === 0, true)    
        })

        it('verify that http status code is 200', async () => {
            let deletion = await tools.deleteAllEntities("WarehouseOrderSet", ["Lgnum", "Who"])
            await tools.allPromiseWrapper(deletion)
    
            let res = await tools.getEntity("WarehouseOrderSet", { })
            assert.deepStrictEqual(res.statusCode, 200)    
        })
    })
})



describe('Creating Entities', () => {
    describe('Create Robot', () => {
        it('should return json with robot', async () => {
            let exp = {"d":{"Lgnum":"1337","Rsrc":"Isaac","__metadata":{"id":"/odata/SAP/ZEWM_ROBCO_SRV/RobotSet(Lgnum='1337',Rsrc='Isaac')","type":"ZEWM_ROBCO_SRV.Robot","uri":"/odata/SAP/ZEWM_ROBCO_SRV/RobotSet(Lgnum='1337',Rsrc='Isaac')"}},"uri":"/odata/SAP/ZEWM_ROBCO_SRV/RobotSet(Lgnum='1337',Rsrc='Isaac')"}
            let res = await tools.createEntity("RobotSet", { "Lgnum": "1337", "Rsrc": "Isaac" })
            assert.deepStrictEqual(res.body, exp)    
        })

        it('verify that http status code is 201', async() => {
            let res = await tools.createEntity("RobotSet", { "Lgnum": "1337", "Rsrc": "Asimov" })
            assert.deepStrictEqual(res.statusCode, 201)
        })
    })

    describe('Create WarehouseOrder', () => {
        it('should return json with warehouseorder', async () => {
            let exp = {"d":{"Lgnum":"1337","Who":"123456","__metadata":{"id":"/odata/SAP/ZEWM_ROBCO_SRV/WarehouseOrderSet(Lgnum='1337',Who='123456')","type":"ZEWM_ROBCO_SRV.WarehouseOrder","uri":"/odata/SAP/ZEWM_ROBCO_SRV/WarehouseOrderSet(Lgnum='1337',Who='123456')"},"OpenWarehouseTasks":{"__deferred":{"uri":"/odata/SAP/ZEWM_ROBCO_SRV/WarehouseOrderSet(Lgnum='1337',Who='123456')/OpenWarehouseTasks"}}},"uri":"/odata/SAP/ZEWM_ROBCO_SRV/WarehouseOrderSet(Lgnum='1337',Who='123456')"}
            let res = await tools.createEntity("WarehouseOrderSet", { "Lgnum": "1337", "Who": "123456" })
            assert.deepStrictEqual(res.body, exp)    
        })

        it('verify that http status code is 201', async() => {
            let res = await tools.createEntity("WarehouseOrderSet", { "Lgnum": "1337", "Who": "654321" })
            assert.deepStrictEqual(res.statusCode, 201)
        })
    })

    describe('Create WarehouseTask', () => {
        it('should return json with warehousetask', async () => {
            let exp = {"d":{"Lgnum":"1337","Tanum":"987654","__metadata":{"id":"/odata/SAP/ZEWM_ROBCO_SRV/OpenWarehouseTaskSet(Lgnum='1337',Tanum='987654')","type":"ZEWM_ROBCO_SRV.OpenWarehouseTask","uri":"/odata/SAP/ZEWM_ROBCO_SRV/OpenWarehouseTaskSet(Lgnum='1337',Tanum='987654')"}},"uri":"/odata/SAP/ZEWM_ROBCO_SRV/OpenWarehouseTaskSet(Lgnum='1337',Tanum='987654')"}
            let res = await tools.createEntity("OpenWarehouseTaskSet", { "Lgnum": "1337", "Tanum": "987654" })
            assert.deepStrictEqual(res.body, exp)    
        })

        it('verify that http status code is 201', async() => {
            let res = await tools.createEntity("OpenWarehouseTaskSet", { "Lgnum": "1337", "Tanum": "123456" })
            assert.deepStrictEqual(res.statusCode, 201)
        })
    })
})



describe('Retrieving Entities', () => {
    describe('Get Robot', () => {
        it('get robot using Lgnum and Rsrc', async () => {
            let exp = {"d":{"Lgnum":"1337","Rsrc":"Isaac","__metadata":{"id":"/odata/SAP/ZEWM_ROBCO_SRV/RobotSet(Lgnum='1337',Rsrc='Isaac')","type":"ZEWM_ROBCO_SRV.Robot","uri":"/odata/SAP/ZEWM_ROBCO_SRV/RobotSet(Lgnum='1337',Rsrc='Isaac')"}}}
            let res = await tools.getEntity("RobotSet", { "Lgnum": "1337", "Rsrc": "Isaac" })
            assert.deepStrictEqual(res.body, exp)    
        })

        it('verify that http status code is 200', async() => {
            let res = await tools.getEntity("RobotSet", { "Lgnum": "1337", "Rsrc": "Isaac" })
            assert.deepStrictEqual(res.statusCode, 200)
        })
    })

    describe('Get WarehouseOrder', () => {
        it('get warehouseorder using Lgnum and Who', async () => {
            let exp = {"d":{"Lgnum":"1337","Who":"654321","__metadata":{"id":"/odata/SAP/ZEWM_ROBCO_SRV/WarehouseOrderSet(Lgnum='1337',Who='654321')","type":"ZEWM_ROBCO_SRV.WarehouseOrder","uri":"/odata/SAP/ZEWM_ROBCO_SRV/WarehouseOrderSet(Lgnum='1337',Who='654321')"},"OpenWarehouseTasks":{"__deferred":{"uri":"/odata/SAP/ZEWM_ROBCO_SRV/WarehouseOrderSet(Lgnum='1337',Who='654321')/OpenWarehouseTasks"}}}}
            let res = await tools.getEntity("WarehouseOrderSet", { "Lgnum": "1337", "Who": "654321" })
            assert.deepStrictEqual(res.body, exp)    
        })

        it('verify that http status code is 200', async() => {
            let res = await tools.getEntity("WarehouseOrderSet", { "Lgnum": "1337", "Who": "654321" })
            assert.deepStrictEqual(res.statusCode, 200)
        })
    })

    describe('Get WarehouseTask', () => {
        it('get warehousetask using Lgnum and Tanum', async () => {
            let exp = {"d":{"Lgnum":"1337","Tanum":"123456","__metadata":{"id":"/odata/SAP/ZEWM_ROBCO_SRV/OpenWarehouseTaskSet(Lgnum='1337',Tanum='123456')","type":"ZEWM_ROBCO_SRV.OpenWarehouseTask","uri":"/odata/SAP/ZEWM_ROBCO_SRV/OpenWarehouseTaskSet(Lgnum='1337',Tanum='123456')"}}}
            let res = await tools.getEntity("OpenWarehouseTaskSet", { "Lgnum": "1337", "Tanum": "123456" })
            assert.deepStrictEqual(res.body, exp)    
        })

        it('verify that http status code is 200', async() => {
            let res = await tools.getEntity("OpenWarehouseTaskSet", { "Lgnum": "1337", "Tanum": "123456" })
            assert.deepStrictEqual(res.statusCode, 200)
        })
    })
})



describe('Retrieving Entitylists', () => {
    describe('Get Robots', () => {
        it('get all robots', async () => {
            let res = await tools.getEntity("RobotSet", { })
            assert.deepStrictEqual(res.body.d.results.length >= 1, true)    
        })

        it('verify that http status code is 200', async() => {
            let res = await tools.getEntity("RobotSet", { })
            assert.deepStrictEqual(res.statusCode, 200)
        })
    })

    describe('Get WarehouseOrders', () => {
        it('get all warehouseorders', async () => {
            let res = await tools.getEntity("WarehouseOrderSet", { })
            assert.deepStrictEqual(res.body.d.results.length >= 1, true)
        })

        it('verify that http status code is 200', async() => {
            let res = await tools.getEntity("WarehouseOrderSet", { })
            assert.deepStrictEqual(res.statusCode, 200)
        })
    })

    describe('Get WarehouseTasks', () => {
        it('get all warehousetasks', async () => {
            let res = await tools.getEntity("OpenWarehouseTaskSet", { })
            assert.deepStrictEqual(res.body.d.results.length >= 1, true)
        })

        it('verify that http status code is 200', async() => {
            let res = await tools.getEntity("OpenWarehouseTaskSet", { })
            assert.deepStrictEqual(res.statusCode, 200)
        })
    })
})



describe('Update Entities', () => {
    describe('Update Robot', () => {
        it('verify that http status code is 204', async() => {
            let res = await tools.updateEntity("RobotSet", { "Lgnum": "1337", "Rsrc": "Asimov" }, { "RsrcGrp": "Uberfleet" })
            assert.deepStrictEqual(res.statusCode, 204)
        })

        it('verify that patch was correct', async() => {
            let res = await tools.getEntity("RobotSet", { "Lgnum": "1337", "Rsrc": "Asimov" })
            assert.deepStrictEqual(res.body.d.RsrcGrp, "Uberfleet")
        })
    })
})


describe('Malformed Requests', () => {
    describe('Retrieve Unknown Entity', () => {
        it('verify that http status code is 404', async() => {
            let res = await tools.getEntity("RobotSet", { "Lgnum": "13371337", "Rsrc": "Tron" })
            assert.deepStrictEqual(res.statusCode, 404)
        })
    })

    describe('Point to Illegal Entityset', () => {
        it('verify that http status code is 404', async() => {
            let res = await tools.createEntity("ProtoSet", { "abc" : "123!" })
            // TODO: can this stay like this or has the mockserver config to be changed?
            assert.deepStrictEqual(res.statusCode, 501)
        })
    })
})



