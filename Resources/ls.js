var LS = {
	UI: {
		Mobile: {
				
		}
	},
	Shop: {
		Product: {
			create: function() {
				return (function() {
					var self = {};
					
					self.setLimit = function() {
						return self;
					};
					
					self.find = function(callback) {
						var c1 = Titanium.Network.createHTTPClient();
						
						c1.timeout = 100000;
						
						c1.open('GET', 'http://yourdomain.com/api/1/shop/products/details.json');
						
						c1.onerror = function(e) {
							Titanium.API.info(e.error);
						};
						
						c1.onload = function() {
							var result = eval('('+this.responseText+')');
							
							var products = result.result.response.products.product;
							
							callback(products);
						};
						
						c1.send();
						
						return self;
					};
					
					return self;
				})();
			}
		},
		Customer: {
			create: function() {
				return (function() {
					var self = {};
					
					self.setLimit = function() {
						return self;
					};
					
					self.find = function(callback) {
						var c1 = Titanium.Network.createHTTPClient();
						
						c1.timeout = 100000;
						
						c1.open('GET', 'http://yourdomain.com/api/1/shop/customers/details.json?api_username=myusername&api_password=mypassword');
						
						c1.onerror = function(e) {
							Titanium.API.info(e.error);
						};
						
						c1.onload = function() {
							var result = eval('('+this.responseText+')');
							
							var customers = result.result.response.customers.customer;
							
							callback(customers);
						};
						
						c1.send();
						
						return self;
					};
					
					return self;
				})();
			}
		}
	}
};