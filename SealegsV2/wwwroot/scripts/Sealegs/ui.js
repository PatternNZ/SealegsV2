function UI() {
    this.takeoverBanners = $(".item.takeover");

}

UI.prototype = {
    init: function () {

        var self = this;
        this.setScreenHeight();
        this.bindTarget();

        if (this.takeoverBanners.length > 0) {
            // seems to be ok if we just call once
            self.configureTakeOverBanner();
            //var i = 0;
            //$(window).on("resize scroll", function () {
            //    //console.log("event: " + i);
            //    //i++;
            //    self.configureTakeOverBanner();
            //});
        }

        var self = this;
        setTimeout(function () {
            self.moveWhiteCovers();
        }, 2200);
        this.setupFullWidthVideos();
        this.moveSocialIcons();
    },
    moveSocialIcons: function () {

        var socialLinks = $("#site-footer .item.footer-item.usn_pod_sociallinks");

        if (socialLinks.length > 0) {
            var ul = socialLinks.find(".inner .social ul:first-child");


            if (ul.length > 0) {
                var target = $("nav.footer-navigation").parent();


                var navWrapper = $('<nav class="social-links"></nav>');
                navWrapper.append(ul); 


                target.append(navWrapper);

                socialLinks.remove();
            }
        }

    },
    setupFullWidthVideos: function () {
        $(".full-width-image").each(function () {
            var videoUrl = $(this).data('videourl');
            var playButton = $(this).parent().find(".play-button");
            var $image = $(this);

            function playVideo() {
                var $video = $('<video>', {
                    src: videoUrl,
                    controls: true,
                    autoplay: true,
                    muted: true,
                    playsinline: true, // For better compatibility on mobile
                    loop: true,
                    onloadedmetadata: function () {
                        this.muted = true; // Ensure the video is muted
                    }
                });

                $image.replaceWith($video);
                playButton.remove();

                // Ensure the video plays after being added to the DOM
                $video[0].play().catch(function (error) {
                    console.log("Autoplay prevented: ", error);
                    // Handle the error, such as showing a play button
                });

                $video.attr('loop', 'loop');
            }

            if (videoUrl && videoUrl.trim() !== '') {
                // Create an intersection observer
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            playVideo();
                            observer.unobserve(entry.target); // Stop observing once video plays
                        }
                    });
                });

                // Observe the image
                observer.observe(this);

                // Retain click functionality
                $image.off('click').on('click', playVideo);
                playButton.off('click').on('click', playVideo);
            }
        });
    },
    moveWhiteCovers: function () {

        $(".spc.gallery").each(function () {
            var whiteCover = $(this).find(".white-cover-left");
            var slickList = $(this).find(".slick-list");

            if (whiteCover.length > 0 && slickList.length > 0) {
                //move the white cover into the slick list

                slickList.append(whiteCover.detach());
            }

        });
    },
    configureTakeOverBanner: function () {
        try {
            var vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        } catch (err) {
            // old ie?
        }
    },
    bindTarget: function () {
        // this replaces the # scroll to name and uses id to scroll to the target instead
        var self = this;

        if (window.location.hash) {
            setTimeout(function () {
                var target = window.location.hash;
                self.scrollToHash(target);
            }, 100);
        }
        self.setupALinks();
    },
    setupALinks: function () {
        var self = this;
        $("a").each(function () {
            var href = $(this).attr("href");
            if (href != 'undefined' && href != undefined && href != '' && href.indexOf("#") == 0 && $(this).data("toggle") != "tab") {
                $(this).click(function (e) {
                    self.scrollToHash(href);
                    e.preventDefault();
                    e.stopPropagation();
                });
            }
        });

    },
    decodeHtml: function (html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    },
    appendHtmlWithScripts: function (container, html) {
        var div = document.createElement('div');
        div.innerHTML = html;

        // Append all child nodes
        while (div.firstChild) {
            var child = div.firstChild;
            div.removeChild(child);

            // If the child is a script, create a new script element
            if (child.tagName && child.tagName.toLowerCase() === 'script') {
                var script = document.createElement('script');
                if (child.src) {
                    script.src = child.src;
                } else {
                    script.textContent = child.innerHTML;
                }
                container.appendChild(script);
            } else {
                container.appendChild(child);
            }
        }
    },
    scrollToHash: function (hash) {
        var self = this;
        var attachedHtml = '';

        if (window.targetHtml && window.targetHtml[hash]) {
            attachedHtml = this.decodeHtml(window.targetHtml[hash]);

        }

        var target = null;
        var hasSecondScroll = false;
        var secondScroll = '';

        if (hash.indexOf(":") > 1) {
            // 2 step scroll
            hasSecondScroll = true;
            var parts = hash.split(':');
            secondScroll = parts[1];

            target = $(parts[0]);
        } else {
            target = $(hash);
        }

        if (target.length > 0) {
        
            var isAccordion = target.hasClass("is-accordion"); // if it's an accordion then we want to open it automatically
            if (isAccordion && target.hasClass("collapsed")) {
                // open the accordion
                target.click();
            }

            if (attachedHtml + '' != '') {
                var row = target.find('.row').first();
                row.html('<span class="loading">Loading...</span>');
                setTimeout(function () {

                    
                    row.html('');
                    self.appendHtmlWithScripts(row[0], attachedHtml);

                }, 850);
            }


            $('html, body').animate({
                scrollTop: (target.offset().top - 80)
            }, {
                    duration: 500,
                    complete: function () {
  
                        if (hasSecondScroll == true) {
                            var secondScrollEl = $("a[name='" + secondScroll + "']");
                            if (secondScrollEl.length == 0) {
                                secondScrollEl = $(secondScroll);
                            }
                            if (secondScrollEl.length == 0) {
                                secondScrollEl = $("#" + secondScroll);
                            }
                            
                            if (secondScrollEl.length > 0) {

                                $('html, body').animate({ scrollTop: secondScrollEl.offset().top - 80 }, { duration: 250 });
                            }
                        }
                    }
                });
        }
    },
    setScreenHeight: function () {

        var windowH = $(window).outerHeight();
        var headerH = $("header").outerHeight();
        var footerH = $("footer .ptn-footer__links").outerHeight() + $("footer .ptn-footer__credit").outerHeight();
        $("#content").css({ 'min-height': (windowH - headerH - footerH) + 25 });
    }
};

var ui = null;
$(function () {
    ui = new UI();
    ui.init();
});