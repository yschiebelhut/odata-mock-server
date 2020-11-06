"use strict";

require('node-ui5/factory')({
	exposeAsGlobals: true,
	resourceroots: {
		myApp: __dirname
	}
}).then( () => {
	process.on('unhandledRejection', error => {
		console.log('unhandledRejection'.red, error.message.gray)
		//console.log(error)
		//console.log(error.stack)
	});
	sap.ui.require([
		"sap/ui/core/util/MockServer",
		"jquery.sap.global"
	], function(MockServer, jQuery) {
		console.log("import of node-ui5 successful!");


		// Begin of function imports
		var GetRobotWarehouseOrders = function (oXhr, sUrlParams) {
			console.log("invoking GetRobotWarehouseOrders")
			// Expected parameters: Lgnum, Rsrc
			console.log("sUrlParams: " + sUrlParams)
			// Expected parameters: Lgnum, Rsrc, Who
			var oUrlParams = sUrlParams.split("&").reduce(function(prev, curr, i, arr) {
				var p = curr.split("=")
				prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]).replace(/\'/g, '')
				return prev
			}, {})  
			console.log("oUrlParams: " + JSON.stringify(oUrlParams))
			var uri = ""
			var abort = false

			// 1. Check if the robot resource exists in EWM
			// yes: continue
			// no: return business_error: ROBOT_NOT_FOUND
			uri = "/RobotSet(Lgnum='" + oUrlParams.Lgnum + "',Rsrc='" + oUrlParams.Rsrc + "')"
			console.log("checking if robot resource exists at: " + uri)
			jQuery.ajax({
				url: uri,
				dataType : 'json',
				async: false,
				success : function(res) {
					console.log("found that robot resource " + oUrlParams.Rsrc + " exists")
				}, error : function(err) {
					console.log(JSON.stringify(err))
					console.log("robot resource " + oUrlParams.Rsrc + " does not exist")
					oXhr.respondJSON(400, {}, { "error": { "code": "ROBOT_NOT_FOUND" } })	
					abort = true
				}
			})
			if(abort)
				return true

			// 2. Check if a warehouse order is assigned to the robot
			// yes: return warehouse order of type WarehouseOrder
			// no: return business_error: NO_ORDER_FOUND
			uri = "/WarehouseOrderSet?$filter=Rsrc eq '" + oUrlParams.Rsrc + "' and Status eq 'D'"
			console.log("checking if unconfirmed warehouseorder is assigned to robot: " + uri)	
			jQuery.ajax({
				url: uri,
				dataType : 'json',
				async: false,
				success : function(res) {
					if(res.d.results.length > 0) {
						console.log("found incomplete warehouseorders linked to robot " + oUrlParams.Rsrc)
						oXhr.respondJSON(200, {}, res)
						abort = true
					} else {
						oXhr.respondJSON(400, {}, { "error": { "code": "NO_ORDER_FOUND" } })
					}
				}, error : function(err) {
					console.log(JSON.stringify(err))
					oXhr.respondJSON(400, {}, { "error": { "code": "NO_ORDER_FOUND" } })
					abort = true
				}
			})

			return true
		};

		// End of function imports




		// creation of the MockServer
		var ms = new MockServer({
			rootUri: "/odata/SAP/ZEWM_ROBCO_SRV/"
		});
		
		console.log("rootUri set to " + ms.getRootUri());

		// set the MockServer to automatically respond with a little delay
		MockServer.config({
			autoRespond: true,
			autoRespondAfter: 10
		});

		// set the data to be used by the MockServer
		ms.simulate(sap.ui.require.toUrl('myApp/metadata.xml'), {
			sMockdataBaseUrl: sap.ui.require.toUrl('myApp/mockdata'),
			bGenerateMissingMockData: true
		});

		var aRequests = ms.getRequests();
		console.log(aRequests);
		console.log(aRequests[105].path);
		let reg = /GetRobotWarehouseOrders\\?(.*)/;
		aRequests.push({
			method: "GET",
			// path: new RegExp('(GetRobotWarehouseOrders)\\?(.*)').toString(),
			// path: new RegExp("(GetRobotWarehouseOrders)\\?(.*)"),
			path: String(new RegExp('(ResourceGroupDescriptionSet)\\(([^/\\?#]+)\\)/?(.*)?')),
			// path: aRequests[105].path,
			// path: 'GetRobotWarehouseOrders', // String will not be an option -> parameters...
			// String with RegEx as content doesn't work either
			response: function (oXhr) {
				oXhr.respond(200, {
					'Content-Type': 'application/json;charset=utf-8'
				}, JSON.stringify({
					d: {}
				}))
				return true
			}
		});
		aRequests[105].path = 'aölksdjfajf'
		const util = require('util');
		console.log("path " + aRequests[106].path);
		console.log("type of path " + typeof(aRequests[106].path));
		console.log(util.inspect(aRequests[106].path, false, null, true));
		console.log("raw regex " + new RegExp('(GetRobotWarehouseOrders)\\?(.*)'))
		console.log("type of raw regex " + typeof(new RegExp('(GetRobotWarehouseOrders)\\?(.*)')))
		console.log("path and regex equal " + (String(new RegExp('(ResourceGroupDescriptionSet)\\(([^/\\?#]+)\\)/?(.*)?')) == String(aRequests[105].path)))
		console.log("path and regex equal " + (String(new RegExp('(ResourceGroupDescriptionSet)\\(([^/\\?#]+)\\)/?(.*)?')) === String(aRequests[105].path)))
		console.log(String(new RegExp('(ResourceGroupDescriptionSet)\\(([^/\\?#]+)\\)/?(.*)?')))
		console.log(String(aRequests[105].path))
		console.log("path and regex equal " + ((new RegExp('(ResourceGroupDescriptionSet)\\(([^/\\?#]+)\\)/?(.*)?')).toString() === (aRequests[105].path).toString()))
		console.log((new RegExp('(GetRobotWarehouseOrders)\\?(.*)')) === (new RegExp('(GetRobotWarehouseOrders)\\?(.*)')))
		console.log((new RegExp('(GetRobotWarehouseOrders)\\?(.*)')).toString() === (new RegExp('(GetRobotWarehouseOrders)\\?(.*)')).toString())
		console.log(util.inspect(new RegExp('(GetRobotWarehouseOrders)\\?(.*)'), false, null, true));
		console.log(aRequests);
		console.log("----------------------------");
		ms.setRequests(aRequests);
		console.log(ms.getRequests());


		// start the MockServer
		// (also log some debug information)
		setTimeout( () => {
			ms.start()
		}, 5000);
		//console.log("EntitySetData of Meetups");
		//console.log(ms.getEntitySetData("Meetups"));
		//console.log("MockServer Object:");
		//console.log(ms);
		//console.log("Requests of ms:");
		console.log("ms running");
		console.log(ms.getRequests());

		// import required frameworks for webservice
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
