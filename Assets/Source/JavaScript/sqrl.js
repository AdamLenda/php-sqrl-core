"use strict";
/*
 * Initialize SQRL Configuration Defaults
 */
var configuration = {
    sspApiUri: null,
    loginLinkAnchorTagId: null,
    loginQrCodeImageTagId: null
};

/*
 * Initialize SQRL Configuration Interface
 */

function setSspApiUri(sspApiUri) {
    configuration.sspApiUri = sspApiUri;
}

function getSspApiUri() {
    if (!configuration.sspApiUri) {
        console.warn("SQRL: SSP API URI is empty.");
    }
    return configuration.sspApiUri;
}

function setLoginLinkAnchorTagId(loginLinkAnchorTagId) {
    configuration.loginLinkAnchorTagId = loginLinkAnchorTagId;
}

function getLoginLinkAnchorTagId() {
    if (!configuration.loginLinkAnchorTagId) {
        console.warn("SQRL: login link anchor tag id is empty.");
    }
    return configuration.loginLinkAnchorTagId;
}

function setLoginQrCodeImageTagId(loginQrCodeImageTagId) {
    configuration.loginQrCodeImageTagId = loginQrCodeImageTagId;
}

function getLoginQrCodeImageTagId() {
    if (!configuration.loginQrCodeImageTagId) {
        console.warn("SQRL: login QR Code image tag id is empty.");
    }
    return configuration.loginQrCodeImageTagId;
}

/*
 * Initialize SQRL State
 */
var state = {
    nut: null,
    loginUri: null,
    loginImage: null,
    window: null,
    document: null
};

/*
 * Define the request objects we will use for contacting the server
 */
/** @type XMLHttpRequest|ActiveXObject */
var syncQuery1 = null;
/** @type XMLHttpRequest|ActiveXObject */
var syncQuery2 = null;

/*
 * Private Members and Functions
 */
function updateLoginUriAnchorTag (loginUri) {
    var elementId = getLoginLinkAnchorTagId();
    if (!elementId()) {
        return false;
    }
    var element = state.document.getElementById(elementId);
    if (!element) {
        console.warn("SQRL: Failed to locate login anchor tag using id value: ", elementId);
        return false;
    }
    element.href = loginUri;
    return true;
}

function updateLoginQrCodeImageTag (loginImage) {
    var elementId = getLoginQrCodeImageTagId;
    if (!elementId()) {
        return false;
    }
    var element = state.document.getElementById(elementId);
    if (!element) {
        console.warn("SQRL: Failed to locate login QR Code image tag using id value: ", elementId);
        return false;
    }
    element.href = loginImage;
    return true;
}

function onNutRequestStateChange () {
    if (syncQuery2.readyState !== 4) {
        return;
    }
    if (syncQuery2.status !== 200) {
        // if our request for a /nut.sqrl fails, wait 100 milliseconds and retry
        setTimeout(getNut, 100);
        return;
    }
    // since we are now certain that syncQuery2.status === 200
    state.nut = syncQuery2.responseText;
    state.loginUri = getSspApiUri().replace("https:", "sqrl:") + "/cli.sqrl?" + state.nut;
    // trim for just the 'nut={...}'
    state.nut = state.nut.substr(state.nut.indexOf("nut="), 16);
    state.loginImage = getSspApiUri() + "/png.sqrl?" + state.nut;
    if (!updateLoginUriAnchorTag(state.loginUri)) {
        console.error("SQRL: Failed to update login anchor tag with login uri.");
    }
    if (!updateLoginQrCodeImageTag(state.loginImage)) {
        console.error("SQRL: Failed to update login anchor tag with login uri.");
    }
    // start our next page checking
    pollForNextPage();
}

function onPollForNextPageReadyStateChange () {
    if (syncQuery1.readyState !== 4) {
        return;
    }

    if (syncQuery1.status !== 200) {
        // if we do not obtain a /pag.sqrl, wait 1/2 second and retry
        setTimeout(pollForNextPage, 500);
        return;
    }

    // since we are now certain that syncQuery1.status === 200
    state.document.location.href = syncQuery1.responseText;
}

function getNut () {
    // the page's DOM is loaded
    syncQuery2.open("GET", getSspApiUri() + "/nut.sqrl");
    syncQuery2.onreadystatechange = onNutRequestStateChange;
    syncQuery2.send(); // initiate the query to obtain the page's SQRL nut
}

function pollForNextPage () {
    // before probing for any page change, we check to
    // see whether the page is visible. If the user is
    if (state.document.hidden) {
        // not viewing the page, check again in 5 seconds.
        setTimeout(pollForNextPage, 500);
        return;
    }

    // since the page is visible, let's check for any update
    syncQuery1.open("GET", getSspApiUri() + "/pag.sqrl?" + state.nut);
    syncQuery1.onreadystatechange = onPollForNextPageReadyStateChange;
    syncQuery1.send(); // initiate the query to the 'sync.txt' object.
}

function initialize (window) {
    if (window === undefined) {
        console.error(
            "SQRL: window to be defined globally."
        );
        return;
    }

    if (!state.document) {
        console.error("SQRL: window parameter does not define a document property.");
        return;
    }
    state.window = window;
    state.document = window.document;
    if (window.XMLHttpRequest) {
        syncQuery1 = new window.XMLHttpRequest();
        syncQuery2 = new window.XMLHttpRequest();
    } else {
        syncQuery1 = new ActiveXObject("MSXML2.XMLHTTP.3.0");
        syncQuery2 = new ActiveXObject("MSXML2.XMLHTTP.3.0");
    }

    // var sqrl = window.Sqrl || {};
}

/*
 * Public Functions
 */
var SQRL = {
    setSspApiUri: setSspApiUri,
    setLoginLinkAnchorTagId: setLoginLinkAnchorTagId,
    setLoginQrCodeImageTagId: setLoginQrCodeImageTagId,
    initialize: initialize
};

module.exports = SQRL;