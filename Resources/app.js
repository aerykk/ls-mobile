Ti.include('ls.js');

var tabGroup = Titanium.UI.createTabGroup();
 
// First tab, main window
 
var mainWinTab1 = Titanium.UI.createWindow({
    title: 'LemonStand',
    backgroundColor: '#fff'
});

var data = [{title: 'Statistics'}, {title: 'Sign Out'}];

var table = Titanium.UI.createTableView({
    data: data,
    style: Ti.UI.iPhone.TableViewStyle.GROUPED
}); 

mainWinTab1.add(table);
 
// First tab, navigator
 
var navTab1 = Titanium.UI.iPhone.createNavigationGroup({
    window: mainWinTab1
});

var baseWinTab1 = Titanium.UI.createWindow({
    navBarHidden: true,
    backgroundColor: '#fff'
});

baseWinTab1.add(navTab1);
 
// First tab, subwindow
 
table.addEventListener('click', function(e) {
    tabGroup.animate({bottom: -50, duration: 0});
 
    var subWinTab1 = Titanium.UI.createWindow({
        title: e.row.title,
        backgroundColor: '#fff'
    });
    
    navTab1.open(subWinTab1);
 
    subWinTab1.addEventListener('close', function(e) {
        tabGroup.animate({bottom: 0, duration: 100});
    });
});
 
// Second tab, main window
 
var mainWinTab2 = Titanium.UI.createWindow({
    title: 'Shop'
});

// Second tab, navigator
 
var navTab2 = Titanium.UI.iPhone.createNavigationGroup({
    window: mainWinTab2
});
 
var baseWinTab2 = Titanium.UI.createWindow({
    navBarHidden: true
});

baseWinTab2.add(navTab2);
 
// Second tab, subwindow

var data = [
	{code: 'categories', title: 'Categories'}, 
	{code: 'products', title: 'Products'}, 
	{code: 'orders', title: 'Orders'}, 
	{code: 'customers', title: 'Customers'}, 
	{code: 'tax_classes', title: 'Tax Classes'}, 
	{code: 'shipping_options', title: 'Shipping Options'}, 
	{code: 'payment_methods', title: 'Payment Methods'}, 
	{code: 'catalog', title: 'Catalog Price Rules'}, 
	{code: 'discounts', title: 'Discounts'}
];

var rows = [];

for(var i = 0, l = data.length; i < l; ++i) {
	var row = Ti.UI.createTableViewRow({
		title: data[i].title,
		height: 40,
		hasChild: true,
		code: data[i].code
	});
	
	rows.push(row);
}

var table = Titanium.UI.createTableView({
    data: rows,
    style: Ti.UI.iPhone.TableViewStyle.GROUPED
});

table.addEventListener('click', function(e) {
    var subWinTab2 = Titanium.UI.createWindow({
        title: 'Loading',
        backgroundColor: '#fff'
    });
    
    var section2 = Titanium.UI.createTableViewSection({
		data: data,
		headerTitle: "Please wait..."
	});

	var table3 = Titanium.UI.createTableView({
	    data: [section2],
	    style: Ti.UI.iPhone.TableViewStyle.GROUPED
	}); 
	
	subWinTab2.add(table3);

    //subWinTab2.open();//{fullscreen: true});
	if(e.row.code === 'products') {
		LS.Shop.Product.create().setLimit(10).find(function(products) {
		 	var rowArray = [];
		 	
			for(var i = 0, l = products.length; i < l; ++i) {
				rowArray[i] = Titanium.UI.createTableViewRow({
					hasChild: false,
					height: 'auto'
				});
				
				rowArray[i].add(
					Titanium.UI.createLabel({
						text: products[i].name,
						height: 'auto',
						width: 'auto',
						textAlign: 'left',
						left: 0,
						top: 10,
						touchEnabled: false,
						highlightedColor: '#9EC5F1',
						backgroundColor: '#fff'
					})
				);
			}
			
			var table = Titanium.UI.createTableView({
				data: rowArray,
				style: Ti.UI.iPhone.TableViewStyle.GROUPED
			});
			
		    var subWinTab3 = Titanium.UI.createWindow({
		        title: e.row.title
		    });
		    
			subWinTab3.add(table);
			subWinTab2.close();
			
			//subWinTab2.addEventListener('close', function() {
		    	navTab2.open(subWinTab3);
			//});
		});
	}
	else if(e.row.code === 'customers') {
		LS.Shop.Customer.create().setLimit(10).find(function(customers) {
		 	var rowArray = [];
		 	
			for(var i = 0, l = customers.length; i < l; ++i) {
				rowArray[i] = Titanium.UI.createTableViewRow({
					hasChild: false,
					height: 'auto'
				});
				
				rowArray[i].add(
					Titanium.UI.createLabel({
						text: customers[i].first_name + ' ' + customers[i].last_name,
						height: 'auto',
						width: 'auto',
						textAlign: 'left',
						left: 0,
						top: 10,
						touchEnabled: false,
						highlightedColor: '#9EC5F1',
						backgroundColor: '#fff'
					})
				);
			}
			
			var table = Titanium.UI.createTableView({
				data: rowArray,
				style: Ti.UI.iPhone.TableViewStyle.GROUPED
			});
			
		    var subWinTab3 = Titanium.UI.createWindow({
		        title: e.row.title
		    });
		    
			subWinTab3.add(table);
			subWinTab2.close();
			
			//subWinTab2.addEventListener('close', function() {
		    	navTab2.open(subWinTab3);
			//});
		});
	}
});

mainWinTab2.add(table);


// Tab group
 
var tab1 = Titanium.UI.createTab({  
    icon: 'KS_nav_ui.png',
    title: 'LemonStand',
    window: baseWinTab1
});

tabGroup.addTab(tab1);  
 
var tab2 = Titanium.UI.createTab({  
    icon: 'KS_nav_views.png',
    title: 'Shop',
    window: baseWinTab2
});

tabGroup.addTab(tab2);  


tabGroup.open({
	transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
});
