process.env.LOGGING_LOGTOFILE = true
process.env.ODATA_USER = "root"
process.env.ODATA_PASSWD = "123"
const mockserver = require('./mockserver')

const ROBOT_TEMPLATE = {
    "ActualBin": "GR-YDI1",
    "ActQueue": "",
    "Lgnum": "1710",
    "Rsrc": "LOCAL-ROBOT",
    "RsrcType": "RB01",
    "RsrcGrp": "RB02",
    "ExccodeOverall": ""
}

const WAREHOUSEORDER_TEMPLATE = {
    "Lgnum": "1710",
    "Who": "",
    "Status": "",
    "Areawho": "WDF4",
    "Lgtyp": "",
    "Lgpla": "",
    "Queue": "LOCAL-ROBOT",
    "Rsrc": "",
    "Lsd": "0",
    "Topwhoid": "0000000000",
    "Refwhoid": "0000000000",
    "Flgwho": false,
    "Flgto": true
}

const TASKS = [
    {
        "Lgnum": "1710",
        "Tanum": "",
        "Flghuto": true,
        "Tostat": "",
        "Priority": 0,
        "Meins": "PC",
        "Vsolm": "1",
        "Weight": "4.000",
        "UnitW": "KG",
        "Volum": "3.000",
        "UnitV": "L",
        "Vltyp": "Y021",
        "Vlber": "YS01",
        "Vlpla": "GR-YDI1",
        "Vlenr": "",
        "Nltyp": "Y920",
        "Nlber": "YO01",
        "Nlpla": "GI-YDO1",
        "Nlenr": "",
        "Who": ""
    }, {
        "Lgnum": "1710",
        "Tanum": "",
        "Flghuto": true,
        "Tostat": "",
        "Priority": 0,
        "Meins": "PC",
        "Vsolm": "1",
        "Weight": "4.000",
        "UnitW": "KG",
        "Volum": "3.000",
        "UnitV": "L",
        "Vltyp": "Y910",
        "Vlber": "YI00",
        "Vlpla": "GI-YDO1",
        "Vlenr": "112345678000000001",
        "Nltyp": "Y011",
        "Nlber": "YS02",
        "Nlpla": "GR-YDI1",
        "Nlenr": "112345678000000001",
        "Who": ""
    }
]

      mockserver.init()

      var tools = require('./tools/toolbox.js')

        var id = 1
        var taskIndex = 0

        setTimeout(async () => {
            await tools.createEntity("RobotSet", ROBOT_TEMPLATE)
        }, 1)

        // Create Order + Task
        setTimeout(async () => {
            let order = WAREHOUSEORDER_TEMPLATE
            let task = TASKS[taskIndex]

            order.Who = "" + (10000000 + id)
            task.Who = order.Who
            task.Tanum = "" + (20000000 + id)

            taskIndex += 1
            if (taskIndex == TASKS.length) {
                taskIndex = 0
            }

            await tools.createEntity("WarehouseOrderSet", order)
            await tools.createEntity("OpenWarehouseTaskSet", task)
            id += 1
        }, 100)

        // Create Order + Task
        setInterval(async () => {
            let order = WAREHOUSEORDER_TEMPLATE
            let task = TASKS[taskIndex]

            order.Who = "" + (10000000 + id)
            task.Who = order.Who
            task.Tanum = "" + (20000000 + id)

            taskIndex += 1
            if (taskIndex == TASKS.length) {
                taskIndex = 0
            }

            await tools.createEntity("WarehouseOrderSet", order)
            await tools.createEntity("OpenWarehouseTaskSet", task)
            id += 1
        }, 5000)