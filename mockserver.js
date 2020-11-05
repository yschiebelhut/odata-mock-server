"use strict";

// import module from Ardnaud
require('node-ui5/factory')({
	exposeAsGlobals: true,
	resourceroots: {
		myApp: __dirname
	}
}).then( () => {
	// pretty nasty way to keep new versoins of node from crashing
	process.on('unhandledRejection', error => {
		console.log('unhandledRejection'.red, error.message.gray);
	});

	
	sap.ui.require([
		"sap/ui/core/util/MockServer"
	], function(MockServer) {
		console.log("import of node-ui5 successful!");

		// creation of the MockServer
		var ms = new MockServer({
			rootUri: "/odata/SAP/ZEWM_ROBCO_SRV/"
		});
		
		console.log("rootUri set to " + ms.getRootUri());

		// set the data to be used by the MockServer
		ms.simulate(sap.ui.require.toUrl('myApp/metadata.xml'), {
			sMockdataBaseUrl: sap.ui.require.toUrl('myApp/mockdata'),
			bGenerateMissingMockData: true
		});

		// set the MockServer to automatically respond with a little delay
		MockServer.config({
			autoRespond: true,
			autoRespondAfter: 10
		});

		// start the MockServer
		ms.start();


		// import required frameworks for odata webservice
		const express = require('express');
		const app = express();
		const bodyParser = require('body-parser');
		const basicAuth = require('express-basic-auth');

		// parser needed for PUT and POST requests
		app.use(bodyParser.text({
			type: '*/*'
		}));
		// handle authentication
		app.use(basicAuth({
			users: { 'root': '123' }
		}));

		console.log("created express-app with body-parser and authentication");
		

		// forward HTTP-requests to MockServer
		app.all('/odata/SAP/ZEWM_ROBCO_SRV/*', function (req, res) {
			console.log(req.method + "\t" + req.url);
			window.jQuery.ajax({
				method: req.method,
				url: req.url,
				headers: req.headers,
				data: req.body,
				complete: jqXHR => {
					jqXHR.getAllResponseHeaders()
						.split('\n')
						.filter(header => header)
						.forEach(header => {
							const pos = header.indexOf(':')
							res.set(header.substr(0, pos).trim(), header.substr(pos + 1).trim())
						})
					res
						.status(jqXHR.status)
						.send(jqXHR.responseText)
				}
			})
		})

		
		// start webservice on PORT 8080
		app.listen(8080, () => {
			console.log("express-app running");
		});
		
	});
})
