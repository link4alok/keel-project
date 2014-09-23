require(
	[
	  'app/domain/Repository',
	  'app/framework/Services'
	],
	function (Repository, Services) {
 describe("services", function () {
          
            var server;
                service = new Services();
                beforeEach(function () { 
                    server = sinon.fakeServer.create();
                });

                afterEach(function () {
                    server.restore();
                });
          
            it("should make a GET request", function () {
            	var statusG = false,
            		callback = function(){
            		statusG = true;
                    expect(statusG).to.be.true;
            	};
                service.makeRequest('GET', '', callback);
            });

            it("should make a POST request", function () {
                var statusP = false,
		            dummyorder = {
		            		"side" : "Buy",
							"symbol" : "AAPL",
							"quantity": 10000,
							"limitPrice" : 426.24,
							"traderId": "AM"
						},
                    callback = function(){
                    	statusP = true;
                    	expect(statusP).to.be.true;
                    };
                service.makeRequest('POST', JSON.stringify(dummyorder), callback);
            });

             it("should make a DELETE request", function () {
                var statusD = false,
                    callback = function(){
                    statusD = true;
                    expect(statusD).to.be.true;
                    };
                service.makeRequest('DELETE', '', callback);
            });
        });
});