

$(function() {

    update_view();

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
    // CATEGORY BUTTONS ------------------------------------------------------------------
    let categoryButtons = $('.menu-category');
    categoryButtons.on("click", function(){
        choose_category_function(this.id);
    });

    // table popup -------------------------------
    $('#confirm-table').on("click",function(e) {
        e.preventDefault();
        table = $('#table-input').val();
        $('#table_popup').hide();
        place_order();
    });

    // LOAD THE MENU ---------------------------------------------------------------------
    load_all_beverages(4);
    // start with beer showing
    $('#beer-menu').show();

    categoryButtons.css("background-color", "lightgrey").css("border-bottom", "2px solid #ccc");
    $('#beer-category').css("border-bottom",  "none").css("background-color", "#f2f2f2");




});