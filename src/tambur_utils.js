(function (tambur, undefined) {
    "use strict";
    /*global window*/
    /*global document*/

    tambur.utils = {
        /*
         * Dynamically fetch Javascript resource and append
         * it to the head of the document. The callback is
         * fired as soon as the fetch has completed
         */
        fetch_js : function (filename, callback) {
            var script = document.createElement('script');
            filename = ('https:' === document.location.protocol ? 'https://' : 'http://') + tambur.static_url + filename;
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", filename);

            // bind onload events to the callback function
            script.onreadystatechange = callback;
            script.onload = callback;

            if (typeof script !== "undefined") {
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }
    };

}(window.tambur = window.tambur || {}));
