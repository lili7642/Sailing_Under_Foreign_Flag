// Function that handles the login functionality; shows popup, takes user input, either accepts or not
function show_login_popup(){
    // PREFILL THE FORM FOR TESTING
    $('#username').val('jorass');
    $('#password').val('b690bc2447d40ea8a6f78345eb979a28');

    $('#login-popup').click(function(e) {
        // IF YOU CLICK OUTSIDE THE POPUP IT WILL CLOSE
        if ($(e.target).attr('id') === 'login-popup') {
            $('#login-popup').hide();
        }
    });

    // LOGIN AS USER
    $('#login-button').on("click",function(e) {
        e.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();
        let found = login_function(username, password); // call actual login function

        if (found){
            // UPDATE LOGGED IN USER
            current_user = get_user_details(username);
            current_balance = get_balance(current_user);

            // save being logged in
            sessionStorage.setItem("current_user", current_user.username);

            load_login_content(current_user); // load user box

        }else{
            //DONT LOAD PAGE, LOGIN FAILED
            $('#login-message').text('Invalid username or password.').removeClass('success').addClass('error').show();
        }
    });

    // LOGIN AS GUEST
    $('#login_as_guest').on("click",function(){
        //LOAD WEBPAGE IN GUEST MODE, NO CREDIT
        $('#login-popup').hide();

    });
}

// ask which table to deliver to
function show_table_popup(){
    $('#table_popup').show();
}

function load_login_content(current_user){
    //LOAD USER INFO DIV
    load_user_box(current_user);
    show_different_views(current_user);
    // make menu set height to make room for order basket
    $('.menu-item-wrapper').css("height", "330px");

    //LOAD ORDER DIV
    orderTotal = 0;
    $('#menu-item-wrapper').css("height","330px");
}

function show_different_views(current_user){
    let credentials = current_user.credentials;
    // "0" : "Manager", "1" : "Bartender", "2" : "Waiter", "3" : "VIP Guest", "4" : "Guest"}
    // Manager can edit and see past transactions
    if (credentials < 3) {
        $('#switch-view').show();
        if (credentials == 1  || credentials == 2){
            $('#manager-buttons').hide();
            $('#current_order_view').css("border-bottom", "3px solid #ccc");
            $('#current_order_view').css("border-bottom-right-radius", "5px");
        }

    }
}

// Function that checks if entered username and password is correct, returns true/false
function login_function(username, password){
    // CHECK LOGIN BY LOOPING THROUGH ALL STORED USERNAMES AND PASSWORDS
    let found = false;
    for (let user of users) { // loop through all user in database
        if(user.username === username && user.password === password){ // if match is found, set found = true
            found = true;
        }
    }
    return found;
}

// Functions that logs out the user and resets all user-related variables
function logout_function(){
    // hide user stuff
    $('#user-info').hide();
    $('#not-logged-in-wrapper').show();
    $('#order').hide();
    $('#switch-view').hide();

    // reset user variables
    current_user = null;
    current_balance = null;

    // clear basket
    $('.order-item').remove();
    $('.comment').remove();
    $('#empty-order-message').show();
    $('#thank-you-order-message').hide();

    $('.menu-item-wrapper').css("height", "100%");

    sessionStorage.removeItem("current_user");
    load_different_views("menu");

}

// Function that loads the box at the top which shows relevant information about the logged in user
function load_user_box(user_info){
    // hide login form
    $('#login-popup').hide();
    $('#not-logged-in-wrapper').hide();
    // show user box and fill in relevant information
    $('#user-info').show();
    $('#name').html("<b>" + user_info.first_name + " " + user_info.last_name + ", </b>");
    $('#status').html(credentials_dict[user_info.credentials]);
    // show credit and deposit button
    $('#credit-number').text(get_balance(user_info) + " SEK");
    $('#deposit-button').show();

}

// Function that shows a popup for depositing money, takes a user amount input and updates the users credit
function show_deposit_popup(){
    // READ MONEY TO DEPOSIT
    $('#popup form').submit(function (e){
        e.preventDefault();
        let deposit_amount = $('#number-input').val();
        // fake balance, resets on reload !
        // UPDATE BALANCE AND DIV
        current_balance = (Number(current_balance) + Number(deposit_amount)).toString();
        $('#credit-number').text(current_balance + " SEK");
        $('#popup').hide();
    });

    $('#popup').click(function(e) {
        // IF YOU CLICK OUTSIDE THE POPUP IT WILL CLOSE
        if ($(e.target).attr('id') === 'popup') {
            $('#popup').hide();
        }
    });
}

// Function that shows information for a given beverage in the menu
function show_info_popup(beverage){
    // showing the info popup and setting the text
    // inefficient way of doing it but it works
    $('#info-popup').show().html(
        '<form>' +
                '<label>'+beverage.namn+'</label>' +
                '<p>'+ beverage.varugrupp +'</p>' +
                '<p>'+ beverage.ursprunglandnamn +'</p>' +
                '<p>Alkoholhalt: '+ beverage.alkoholhalt +'</p>' +
                '<p>Pris: '+ beverage.prisinklmoms +' SEK</p>' +
        '</form>')
        .attr("onclick", "style='display: none;'"); // on click the box disappears
}


// Function for adding comment to an item in the order basket
function add_comment(beverage, commentDiv){

    let comment;
    // clear input field
    $('#comment-input').val(commentDiv.text());

    //show relevant popup
    let label = $('#comment-popup-label');
    label.text(label.text() + beverage.namn + ':');

    $('#comment-popup').show().click(function (e){
        if($(e.target).attr("id") !== "comment-input"){
            $(this).hide();
            $('#comment-submit').off("click");
        }
    });
    // take input from comment field
    $('#comment-submit').on("click", function (){
        comment = $('#comment-input').val();
        // add comment div in order
        commentDiv.text(comment).show();

        $(this).off("click");    // without this each comment button changes every comment,
                                    // a new function is attached to the submit comment button
                                    // every time we comment
    });
}

// Function for adding an item to the order basket
function add_to_order(beverage) {
    // IF BEVERAGE ALREADY IN ORDER, CHANGE THE DIV INSTEAD OF ADDING
    if (beverage.namn in order){
        order[beverage.namn] += 1;
        // put 'amount x price SEK' as price
        $('#' + beverage.artikelid + '-price').html(order[beverage.namn]+" &times "+beverage.prisinklmoms + " SEK");

    // ADD ORDER ITEM DIV
    }else{
        //update order variable
        order[beverage.namn] = 1;

        // hide this message since order no longer empty
        $('#empty-order-message').hide();
        $('#thank-you-order-message').hide();

        // relevant divs
        let orderDiv = $('#order-item-wrapper');
            // put drink article id as div id
        let orderItem = $('<div class="order-item" id="'+beverage.artikelid +'"></div>');
        let itemName = $('<span class="item-name" id="'+beverage.artikelid+'-name"></span>').text(beverage.namn);
        let itemPrice = $('<span class="item-price" id="'+beverage.artikelid+'-price"></span>').text(beverage.prisinklmoms + ' SEK');
        // comment button div
        let commentButton = $('<span class="comment-button" id="'+beverage.artikelid+'"></span>').html(' &#128172');

        // wrapper for name and comment button
        let someWrapper = $('<div></div>')

        // empty comment div that will be hidden;
        let someComment = $('<div class="comment" id="'+ beverage.artikelid+'-comment"></div>');

        // add the stuff
        someWrapper.append(itemName);
        someWrapper.append(commentButton);
        orderItem.append(someWrapper);
        orderItem.append(itemPrice);
        orderDiv.append(orderItem);
        orderDiv.append(someComment);

        // COMMENT BUTTON FUNCTIONALITY
        commentButton.on("click", function(){
            add_comment(beverage, someComment);
        });
    }
    // UPDATE ORDER TOTAL
    orderTotal += parseFloat(beverage.prisinklmoms);
    update_total();

    // update availabilities
    let new_quantity = beverage.kvantitet - 1;
    edit_availability(beverage.nr, new_quantity);
}

// Function for updating the order total
function update_total(){
    $('#order-total-number').text(orderTotal.toFixed(2) + ' SEK');
}


// Function for placing the order, and if logged in pay with credit
async function place_order(){

    let isPaid = "no"; // will be sent to database

    // If not logged in, a bartender will be sent to table
    if(!current_user || current_user.credentials >= 4){
        $("#bartender-otw-popup").show();
    }
    // if logged in with right credentials, pay with credit
    else if(current_user.credentials < 4){
        // Pays with credit
        current_balance = (Number(current_balance) - Number(orderTotal));
        $('#credit-number').text(current_balance.toFixed(2).toString() + " SEK");
        isPaid = "yes"; // mark order as paid
    }

    let order_keys = Object.keys(order);
    let order_vals = Object.values(order);
    let dict = [];
    for (let elem in order_keys){
        let this_key = order_keys[elem];
        let this_val = order_vals[elem];
        dict.push({
            [this_key]:   this_val
        });
    }

    // Handle guests and vips differently:

    add_order_to_ordered(
        {"transaction_id": last_ordered_id()+1,
            "table": table,
            "order_dict": dict,
            "price": orderTotal.toFixed(2),
            "timestamp":Date.now(),
            "paid": isPaid
        }
    );

    // RESET ORDER TOTAL AND ORDER LIST
    let temp_total = orderTotal;
    orderTotal = 0;
    order = {};
    update_total();

    // REMOVE ITEMS FROM BASKET
    $('.order-item').remove();
    $('.comment').remove();
    // SHOW MESSAGE THAT BASKET IS EMPTY
    $('#thank-you-order-message').show();
}

function load_all_beverages(purpose){
    if (purpose == "edit"){
        load_beverages("#edit-beer-menu", beers, purpose);
        load_beverages("#edit-wine-menu", wines, purpose);
        load_beverages("#edit-spirit-menu", spirits, purpose);
    } else{
        load_beverages("#beer-menu", beers, purpose);
        load_beverages("#wine-menu", wines, purpose);
        load_beverages("#spirit-menu", spirits, purpose);
        // ADD CLICK FUNCTION TO ORDER BUTTON
        $('#order-button').on("click",function (){
            show_table_popup();
        });
    }

}

// TODO: modify based on credentials
function load_beverages(divToLoad, bevList, purpose){
    let menuDiv = $(divToLoad);
    for (let beverage of bevList) {
        // only display available
        if (beverage.kvantitet > 0){
            // LOAD THE DIVS
            let menuItem = $('<div class="menu-item" id="'+ beverage.artikelid +'-menuitem" draggable="true" ondragstart="drag(event)"></div>');
            let itemName = $('<span class="item-name"></span>').text(beverage.namn);
            let infoButton = $('<span class="info-button"></span>').html(' &#9432');
            let itemButton = $('<button class="item-button"></button>').text(beverage.prisinklmoms + ' SEK');
            let availability = $('<span class="item-availability"></span>').text(beverage.kvantitet + " in stock");
            let someWrapper = $('<div></div>');


            // STACK THEM
            someWrapper.append(itemName);
            someWrapper.append(infoButton);

            // only display availability for authorized users (Manager / Bartender / Waiter)
            if (purpose == "edit"){
                someWrapper.append(availability);
            }

            if (purpose=="menu"){
                menuItem.append(someWrapper);
                menuItem.append(itemButton);
            } else {
                // generate a form to edit the price
                let form_span = $('<span class="edit_price_span"></span>')
                let item_form = $('<form class="edit-price-form" id="'+ beverage.artikelid +'-editprice"></form>');

                let item_edit_price_button = $('<button class="edit-price-button" id="'+ beverage.artikelid +'-editbutton"> edit </button>');
                let edit_price_textfield = $('<input type="number" class="edit-price-text" id="'+ beverage.artikelid +'-pricefield" placeholder="'+beverage.prisinklmoms+'">');
                let currency_text = $('<span class="currency_span">SEK</span>');

                item_edit_price_button.click(function (e){
                    e.preventDefault();
                    // retrieve new price from form
                    let new_price = $('#' + beverage.artikelid + '-pricefield').val();
                    edit_price(beverage.artikelid,new_price);
                });

                item_form.append(edit_price_textfield);
                item_form.append(currency_text);
                item_form.append(item_edit_price_button);
                form_span.append(item_form);
                someWrapper.append(form_span);
                menuItem.append(someWrapper);
                // menuItem.append(form_span);
            }

            menuDiv.append(menuItem).hide();

            // ADD CLICK FUNCTIONS TO ORDER BUTTON AND INFO BUTTON
            itemButton.click(function (){add_to_order(beverage);});
            infoButton.click(function () {show_info_popup(beverage);});
        }
    }

}

function show_menu(type, purpose){
    if (purpose == "menu"){
        $('.menu-item-wrapper').hide();
    } else {
        $('.edit-menu-item-wrapper').hide();
    }

    $('#' + type).show();
}

function choose_category_function(divId, purpose){
    let thisDiv = $('#'+divId);
    let otherDivs;
    if (purpose=="menu"){
        otherDivs = $('.menu-category');
    }  else {
        otherDivs = $('.edit-menu-category');
    }


    otherDivs.css("background-color", "lightgrey").css("border-bottom", "2px solid #ccc");
    thisDiv.css("border-bottom",  "none").css("background-color", "#f2f2f2");

    if (purpose == "menu"){
        if(divId === "beer-category"){
            show_menu('beer-menu', "menu");
        }else if(divId === "wine-category"){
            show_menu('wine-menu', "menu");
        }else if(divId === "spirit-category"){
            show_menu('spirit-menu', "menu");
        }
    } else {
        if(divId === "edit-beer-category"){
            show_menu('edit-beer-menu', "edit");
        }else if(divId === "edit-wine-category"){
            show_menu('edit-wine-menu', "edit");
        }else if(divId === "edit-spirit-category"){
            show_menu('edit-spirit-menu', "edit");
        }
    }

}

function load_different_views(view){
    if (view == "menu"){
        $('#menu').show();
        $('#order').show();
        $('#to_deliver').hide();
        $('#edit_menu_div').hide();
    }
    else if (view == "edit_menu"){
        $('#menu').hide();
        $('#order').hide();
        $('#to_deliver').hide();
        $('#edit_menu_div').show();
        // only generate the first time
        if ($("#gen_edit_menu_div").html() === ""){
            display_edit_menu();
        } else {
            $("#gen_edit_menu_div").empty();
            display_edit_menu();
        }
    }
    else if (view == "curr"){
        $('#menu').hide();
        $('#order').hide();
        $('#edit_menu_div').hide();
        $('#to_deliver').show();
        // only generate the first time
        if ($("#gen_to_deliver").html() === ""){
            retrieve_orders();
        } else {
            $("#gen_to_deliver").empty();
            retrieve_orders();
        }

    }
    else if (view == "past") {
        $('#menu').hide();
        $('#order').hide();
        $('#to_deliver').hide();
        $('#edit_menu_div').hide();
    }
}

// display all items to be able to modify them
function display_edit_menu(){
    load_all_beverages("edit");
    // start with beer showing
    $('#edit-beer-menu').show();
    let editCategoryButtons = $('.edit-menu-category');
    editCategoryButtons.css("background-color", "lightgrey").css("border-bottom", "2px solid #ccc");
    $('#beer-category').css("border-bottom",  "none").css("background-color", "#f2f2f2");
}


// display all outstanding orders
function retrieve_orders(){
    let orderDiv = $('#gen_to_deliver');

    let orderItem = $('<div class="outstanding_order-item"></div>');

    let someWrapper = $('<div></div>');
    for (let order of DB.ordered){
        // retrieve from database:
        // table, ordered items, price, paid yes / no
        let simpleSpan = $('<span class="outstanding_order-table"></span>');
        let tableNr = $('<span class="text_table"></span>').text("Table " + order.table + ":");
        let this_id = order.transaction_id;
        let price = $('<span class="text_price"></span>').text("Price: " + order.price);

        let ordered_items =  $('<span class="ordered-spirit"></span>');
        // retrieve all items and amounts
        for (let i = 0; i < order.order_dict.length; i++){

            let keys = Object.keys(order.order_dict[i]);
            let values = Object.values(order.order_dict[i]);
            for(let index in keys){
                let each_entry = $('<span class="spirit_entry"></span>');
                let item_entry = $('<span class="spirit_name_entry"></span>').text(keys[index] + ": ");
                let amount_entry = $('<span class="spirit_name_entry"></span>').text(values[index] + " ");
                each_entry.append(item_entry);
                each_entry.append(amount_entry);
                ordered_items.append(each_entry);

            }
       }
        // stack them
        let has_paid = order.paid;
        let hasPaidButton;
        if (has_paid == "yes"){
            hasPaidButton = $('<button class="pay-button" id="' + this_id + '" style="background-color: #3e8e41"></button>').text("paid");
        } else {
            hasPaidButton = $('<button class="pay-button" id="' + this_id + '" style="background-color: #cc504a" onclick="confirm_payment(id) "></button>').text("paid");
        }


        simpleSpan.append(tableNr);
        simpleSpan.append(ordered_items);
        simpleSpan.append(price);
        simpleSpan.append(hasPaidButton);
        orderItem.append(simpleSpan);
        // orderItem.append(hasPaidButton);
        orderDiv.append(orderItem);
    }
}

function edit_price(beverage, new_price){
    // edit price of database item
    for (i = 0; i < DB2.spirits.length; i++) {
        if(DB2.spirits[i].artikelid === beverage){
            DB2.spirits[i].prisinklmoms = new_price;
        }
    }
}