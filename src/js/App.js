/* global window, document, Foundation, $ */

import NotificationDispatcher from "./helpers/NotificationDispatcher";
import FoundationConfig from "./core/FoundationConfig";
import Forms from "./core/Forms";
import Supports from "./helpers/Supports";

class App {
    constructor(props) {
        this.props = props;
        this.$body = $(document.body);
        App.init();
    }

    static init() {
        $(() => {
            App.initUI();
            App.initSampleDocs();
            App.initWindowResize();

            if (Supports.touch()) {
                App.initTouch();
            }

            $(window).on("load", () => {});
        });
    }

    static initUI() {
        // Start the foundation Plugins Configuration
        FoundationConfig.setConfig();
        $(document).foundation();
        FoundationConfig.setEnhancements();

        // Start the Forms Configuration
        Forms.init();
    }

    static initSampleDocs() {
        // Start the sample Docs navigation
        const $h2s = $("#docs h2");
        const $toc = $("[data-docs-toc]");
        $h2s.each(function() {
            const text = $(this).text();
            const anchor = $(this)
                .children("a")
                .attr("href");
            $toc.append(`<li><a href="${anchor}">${text}</a></li>`);
        });
    }

    static initTouch() {}

    static initWindowResize() {
        // eslint-disable-next-line no-unused-vars
        let currentBreakpoint = Foundation.MediaQuery.current;

        $(window).on(
            "resize",
            Foundation.util.throttle(() => {
                window.SkeletonApp.notificationDispatcher.sendNotification(NotificationDispatcher.WINDOW_RESIZE);

                // re initialise the Foundation Orbit carousels
                $("[data-orbit]").each((key, element) => {
                    FoundationConfig.reInitOrbit(element);
                });
            }, 100)
        );

        // Foundation event listener for breakpoint changes
        // eslint-disable-next-line no-unused-vars
        $(window).on("changed.zf.mediaquery", (event, newSize, oldSize) => {
            currentBreakpoint = Foundation.MediaQuery.current;
        });
    }
}

export default App;
