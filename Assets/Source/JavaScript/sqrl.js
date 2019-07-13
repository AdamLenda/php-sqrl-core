(function (window, docReady, undefined) {
    "use strict";
    if (docReady === undefined) {
        console.error("sqrl.js requires docready function. Please see documentation.");
        return;
    }

    /* Setup the Sqrl namespace
     */
    window.Sqrl = window.Sqrl || {};

    var document = window.document;

    // var lastNut = "";
    //
    // var refreshFailed = function () {
    //
    // };
    //
    // var requestLoginStatus = function (callback) {
    //     var request = new XMLHttpRequest();
    //     request.onabort(refreshFailed());
    //     request.onerror(refreshFailed());
    //     request.ontimeout(refreshFailed());
    //     request.onload(callback);
    //     request.open("GET", "https://my-sqrl-test-site.com/sqrl/pag.sqrl?"+lastNut);
    //     request.send();
    // };
    //
    // var refresh = function () {
    //     requestLoginStatus();
    //     // document.getElementById('reloadDisplay').innerHTML = sqrlReload.countDownDesc + ' ' + countDown;
    //     // if(countDown <= 0) {
    //     //     fetch(sqrlReload.adminURL + '?action=sqrl_check_login&session=' + sqrlReload.session)
    //     //         .then((res) => {
    //     //         return res.text();
    //     // })
    //     // .then((body) => {
    //     //         if(body == 'true') {
    //     //         window.location.href = sqrlReload.adminURL + '?action=sqrl_login&session=' +
    //     //             sqrlReload.session + sqrlReload.existingUserParam;
    //     //     }
    //     // });
    //     //     countDown = 6;
    //     // }
    //     // countDown--;
    // };
    //
    // /**
    //  * Prevents duplicate start of background monitoring process
    //  * @type {boolean}
    //  */
    // var monitoringInProgress = false;
    //
    // var initializeSqrlBackgroundStatusMonitoring = function () {
    //     if (monitoringInProgress) {
    //         return;
    //     }
    //     monitoringInProgress = true;
    //     setInterval(refresh, 5000);
    //
    //     var countDown = 5;
    //
    //     setInterval(, 1000);
    //
    //     var qrcode = new QRCode(document.getElementById("sqrl-qrcode"), {
    //         text: sqrlReload.sqrlLoginURL,
    //         width: 128,
    //         height: 128,
    //         colorDark : "#000000",
    //         colorLight : "#ffffff",
    //         correctLevel : QRCode.CorrectLevel.M
    //     });
    // };

    var onDocumentReady = function () {
        console.log("Sqrl Script Running");
        // initializeSqrlBackgroundStatusMonitoring();

    };

    docReady(onDocumentReady);

})(window, docReady);