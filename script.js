

$(document).ready(function() {

    //prefill form as default
    $('#username').val('jorass');
    $('#password').val('b690bc2447d40ea8a6f78345eb979a28');

    $('#login_form').submit(function(e) {
        e.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();

        //check if login valid
        let found = false;
        let firstname, lastname;
        for (let user of users) {
            if(user.username === username && user.password === password){
                found = true;
                is_guest = false;
                firstname = user.first_name;
                lastname = user.last_name;
            }
        }

        if (found){
            $('#login-message').text("Login successful!").removeClass('error').addClass('success').show();
            $('#login_form').hide();
            $('#topnav').show();
            $('#select-category').show();
            $('#menu').show();
            $('#order').show();
            let current_user = get_user_details(username)
            load_user_box(current_user);
        }else{
            $('#login-message').text('Invalid username or password.').removeClass('success').addClass('error').show();
        }

    });

    $('#login_as_guest').click(function(){
        $('#login-message').text("Logged in as guest!").removeClass('error').addClass('success').show();
        $('#login_form').hide();
        $('#topnav').show();
        $('#select-category').show();
        $('#menu').show();
        $('#order').show();
    });


    let menuDiv = $('#menu');
    let orderDiv = $('#order');
    let orderTotal = 0;
    let optionDiv = $('#select-category');



    let drink_types = [light_beers, dark_beers, white_wines, red_wines, spirits]
    // Load the menu
    for(let drink_type of drink_types){

        for (let beverage of drink_type) {
            let menuItem = $('<div class="menu-item" draggable="true"></div>');
            let itemName = $('<span class="item-name" style="width:200px;text-align: left"></span>').text(beverage.namn);
            let typeName = $('<span class="item-type"></span>').text(beverage.varugrupp);
            let itemButton = $('<button class="item-button"></button>').text(beverage.prisinklmoms + ' SEK');


            menuItem.append(itemName);
            menuItem.append(typeName);
            menuItem.append(itemButton);
            menuDiv.append(menuItem);

            itemButton.click(function () {
                addToOrder(beverage);
            });

        }
    }

    $('#searchform').submit(function(e) {
        e.preventDefault();
        let searchterm = $('#searchfield').val();
        display_search_results(searchterm);

    });


    let search_results = {};
    function display_search_results(searchterm){
        search_results = match_search(searchterm);
        for (let each_result of search_results){
            let menuItem_search = $('<div class="menu-item" draggable="true"></div>');
            let itemName_search = $('<span class="item-name" style="width:200px;text-align: left"></span>').text(each_result.namn);
            let typeName_search = $('<span class="item-type"></span>').text(each_result.varugrupp);
            let itemButton_search = $('<button class="item-button"></button>').text(each_result.prisinklmoms + ' SEK');


            menuItem_search.append(itemName_search);
            menuItem_search.append(typeName_search);
            menuItem_search.append(itemButton_search);
            $('searchDiv').append(menuItem_search);

            itemButton_search.click(function () {
                addToOrder(each_result);
            });
        }
    }




    let order = {};
    function addToOrder(beverage) {
        let orderItem = $('<div class="order-item"></div>');
        let itemName = $('<span class="item-name"></span>').text(beverage.namn);
        let itemPrice = $('<span class="item-price"></span>').text(beverage.prisinklmoms + ' SEK');



        // row below is CHAT GPT magic
        let existingItem = orderDiv.find('.item-name:contains("'+beverage.namn+'")').first().parent('.order-item');

        if (beverage.namn in order){
            order[beverage.namn] += 1;
            existingItem.find('.item-name').text(beverage.namn + " x" + order[beverage.namn]);
            existingItem.find('.item-price').text(beverage.prisinklmoms);

        }else{
            order[beverage.namn] = 1;
            orderItem.append(itemName);
            orderItem.append(itemPrice);


            orderDiv.append(orderItem);
        }
        orderTotal += parseFloat(beverage.prisinklmoms);
        $('#order-total').text('Total: ' + orderTotal.toFixed(2) + ' SEK');

    }


    $(function(){
        orderDiv.droppable();
    });
});