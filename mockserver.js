require('node-ui5/factory')({
	exposeAsGlobals: true,
	resourceroots: {
		myApp: __dirname
	}
}).then( () => {
	sap.ui.require([
		"sap/ui/core/util/MockServer"
	], function(MockServer) {
		console.log("import of node-ui5 successful!");

		var ms = new MockServer({
			rootUri: "/"
		});

		console.log("\nrootUri set to " + ms.getRootUri());

		ms.simulate(sap.ui.require.toUrl('myApp/metadata.xml'), {
			sMockdataBaseUrl: sap.ui.require.toUrl('myApp/mockdata'),
			bGenerateMissingMockData: true
		});

		MockServer.config({
			autoRespond: true,
			autoRespondAfter: 10
		});

		ms.start();
		console.log("EntitySetData of Meetups");
		console.log(ms.getEntitySetData("Meetups"));
		console.log("MockServer Object:");
		console.log(ms);
		console.log("Requests of ms:");
		console.log(ms.getRequests());

		const express = require('express');
		const app = express();
		const bodyParser = require('body-parser');
		
		app.use(bodyParser.text({
			type: '*/*'
		}));
		console.log("created express-app with body-parser");

		// forward HTTP-requests to MockServer
		app.all('/*', function (req, res) {
			console.log(req.method);
			console.log(req.url);
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

		app.listen(8080, () => {
			console.log("express-app running");
		});

	});
})
