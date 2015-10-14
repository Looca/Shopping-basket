'use strict';


var controllers = angular.module('app.controllers', []);

/*
 * Product/hompage controller
 */

controllers.controller('ProductsCtrl', ['appResponse', function(appResponse){
	var productsCtrl = this;
	
	productsCtrl.miniCart = [];

	appResponse.getData('products').then(function(response) {
		productsCtrl.list = response.data.ProductsList;
	});

}]);

/*
 * Cart page controller
 */

controllers.controller('CartCtrl', ['appResponse', function(appResponse){
	var cartCtrl = this;

	cartCtrl.total = 0;
	cartCtrl.discount = 0;
	cartCtrl.voucherSuccess = false;
	cartCtrl.vouchererror = false;

	function getTotal(itemsList){
		var total = 0;
		angular.forEach(itemsList, function(item) {
			total += item.Qty * item.Price;
		})
		return total;
	}

	appResponse.getData('cart').then(function(response) {
		cartCtrl.list = response.data.CartItems;
		cartCtrl.total = getTotal(cartCtrl.list);
		cartCtrl.vouchers = response.data.Vouchers;
	});

	cartCtrl.removeItem = function(index) {
		cartCtrl.list.splice(index, 1);
		cartCtrl.total = getTotal(cartCtrl.list);
		// Reset applied discounts
		cartCtrl.discount = 0;
		cartCtrl.voucherSuccess = false;
		cartCtrl.vouchererror = false;
	}

	cartCtrl.reedemVoucher = function(value){
		var reedemValue = value.toUpperCase(),
			catReq = 0;
		// Check if cart contains 'fotwear' keyword in category column
		$('.table tbody tr').each(function() {
    		if($(this).find('.category-name')){
    			var checkCat = $(this).find('.category-name').html();
    			if (checkCat.toUpperCase().indexOf("FOOTWEAR") >= 0){
					catReq ++;
    			}
    		}
 		});
 		
		// Check Vouchers code
		if(reedemValue == "VOUCHER1"){
			cartCtrl.discount = 5.00;
			cartCtrl.voucherSuccess = true;
		} else if((reedemValue == "VOUCHER2") && (cartCtrl.total > 50.00)){
				cartCtrl.discount = 10.00;
				cartCtrl.voucherSuccess = true;
		} else if((reedemValue == "VOUCHER3") && (cartCtrl.total > 75.00) && (catReq > 0)){
			cartCtrl.discount = 15.00;
			cartCtrl.voucherSuccess = true;
		} else {
			cartCtrl.discount = 0.00;
			cartCtrl.voucherError = true;
		}

	}

}]);