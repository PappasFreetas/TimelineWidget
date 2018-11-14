define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "dojo/text!TimelineJS/widget/template/TimelineJS.html",
    "https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"

], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, 
    dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, widgetTemplate, tlJS) {
    "use strict";

    return declare("TimelineJS.widget.TimelineJS", [ _WidgetBase, _TemplatedMixin ], {

        templateString: widgetTemplate,

        // Internal variables.
        _handles: null,
        _contextObj: null,
        timeline: null,

        constructor: function () {
            this._handles = [];
            this.timeline = null;
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
            this._initializeTimeline(this.sheetsURL);
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._updateRendering(callback);
            callback();
        },

        resize: function (box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            
        },

        
        _initializeTimeline: function(sheetURL) {
            console.log("_initializeTimeline")

            // user selected advanced, so we need to pass config options to the timeline
            if (this.devMode === "advanced") {
                try {
                    // convert json string to json object
                    var jsonString = this.configOptions;
                    var jsonObj = JSON.parse(jsonString);

                    console.log(jsonString, "JSON String");
                    console.log(jsonObj, "JSON Object");

                    this.timeline = new TL.Timeline('timeline-embed', sheetURL, jsonObj);

                } catch(e) {
                    console.log(e);

                    // If the try fails for some reason then we will create timeline without options
                    this.timeline = new TL.Timeline('timeline-embed', sheetURL);
                }
            } else {
                // user selected basic, so we create timeline without options
                this.timeline = new TL.Timeline('timeline-embed', sheetURL);
            }
            
        },

        // Shorthand for running a microflow
        _execMf: function (mf, guid, cb) {
            logger.debug(this.id + "._execMf");
            if (mf && guid) {
                mx.ui.action(mf, {
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    callback: lang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["TimelineJS/widget/TimelineJS"]);
