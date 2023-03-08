

$(function() {
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


    // LOAD THE MENU ---------------------------------------------------------------------
    load_all_beverages();
    $('#beer-menu').show();
});