(function (tambur, undefined) {
    "use strict";
    /*global window*/

    if (window.TAMBUR_DEBUG) {
        if (window.TAMBUR_LOGGER) {
            tambur.logger = TAMBUR_LOGGER;
        } else if (window.console && window.console.log && window.console.error) {
            // In some environments console is defined but console.log or console.error is missing.
            tambur.logger = window.console;
        } else {
            tambur.logger = {
                log : function () {},
                error : function () {},
                debug : function () {}
            };
        }
    } else {
        tambur.logger = {
            log : function () {},
            error : function () {},
            debug : function () {}
        };
    }

}(window.tambur = window.tambur || {}));
