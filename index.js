var server = require('./mockserver')
server.initExpressApp()
setTimeout(server.terminateExpressApp, 15000)