

$(document).ready(function() {


    // LOGIN FUNCTION -------------------------------------------------------------------
    $('#show-login-popup-button').on("click",function (){
        // SHOW THE LOGIN POPUP FORM
        $('#login-popup').show();
        show_login_popup();
    });

    // BUTTON FOR DEPOSITING MONEY ------------------------------------------------------
    $('#deposit-button').on("click",function (){
        // SHOW THE DEPOSIT POPUP FORM
        $('#popup').show();
        show_deposit_popup();
    });


    // Load the menu
    let menuDiv = $('#menu-item-wrapper');
    for (let beverage of beers) {
        // LOAD THE DIVS
        let menuItem = $('<div class="menu-item" draggable="true"></div>');
        let itemName = $('<span class="item-name"></span>').text(beverage.namn);
        let infoButton = $('<span class="info-button"></span>').html(' &#9432');
        let itemButton = $('<button class="item-button"></button>').text(beverage.prisinklmoms + ' SEK');
        let someWrapper = $('<div></div>');

        // STACK THEM
        someWrapper.append(itemName);
        someWrapper.append(infoButton);
        menuItem.append(someWrapper);
        menuItem.append(itemButton);
        menuDiv.append(menuItem);

        // ADD CLICK FUNCTIONS TO ORDER BUTTON AND INFO BUTTON
        itemButton.click(function (){add_to_order(beverage);});
        infoButton.click(function () {show_info_popup(beverage);});
    }

    // ADD CLICK FUNCTION TO ORDER BUTTON
    $('#order-button').click(function (){
        place_order();
    });





});