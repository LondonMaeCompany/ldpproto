(function ($, ba) {
    "use strict";
    $.fn.extend({
        youSlider: function (U) {
            var i;
            var objRotator;
            var V = {
                startWidth: 1170,
                startHeight: 500,
                autoPlay: true,
                playOnce: false,
                selectOnHover: false,
                randomize: false,
                delay: 5000,
                transition: "random",
                easing: "",
                velocity: 1,
                showButton: true,
                showNumber: false,
                showPlayPauseButton: true,
                showPreviousNextArrow: false,
                showCenterPreviousNextArrow: true,
                showButtonOnHover: false,
                buttonAlign: "BR",
                buttonWidth: 20,
                buttonHeight: 20,
                buttonBorderRadius: 2,
                buttonMargin: 1,
                buttonOffsetHorizontal: 10,
                buttonOffsetVertical: 10,
                touchEnabled: true,
                showThumb: false,
                thumbWidth: 72,
                thumbHeight: 54,
                showTimer: true,
                timerType: "clock",
                timerArcSize: 2,
                timerAlign: "top",
                pauseOnHover: false,
                shadow: 0,
                showTooltip: true,
                tooltipType: "image",
                hideCaptionAtResolution: 0,
                captionEasing: "easeOutQuint",
                lazyLoad: false,
                currentItem: 0,
                scrollMouseWheel: true,
                fullWidth: false,
                fullScreen: false,
                fullScreenOffsetContainer: "",
                videoJsPath: "videojs/"
            };
            var U = $.extend({}, V, U);
            var W = {
                "TL": 0,
                "TC": 1,
                "TR": 2,
                "BL": 3,
                "BC": 4,
                "BR": 5,
                "LT": 6,
                "LC": 7,
                "LB": 8,
                "RT": 9,
                "RC": 10,
                "RB": 11
            };
            var X = 0;
            var Y = {
                "block": X++,
                "cube": X++,
                "cubeRandom": X++,
                "cubeShow": X++,
                "cubeStop": X++,
                "cubeStopRandom": X++,
                "cubeHide": X++,
                "cubeSize": X++,
                "cubeSpread": X++,
                "horizontal": X++,
                "showBars": X++,
                "showBarsRandom": X++,
                "tube": X++,
                "fade": X++,
                "fadeFour": X++,
                "parallel": X++,
                "blind": X++,
                "blindHeight": X++,
                "blindWidth": X++,
                "directionTop": X++,
                "directionBottom": X++,
                "directionRight": X++,
                "directionLeft": X++,
                "glassCube": X++,
                "glassBlock": X++,
                "circles": X++,
                "circlesInside": X++,
                "circlesRotate": X++,
                "upBars": X++,
                "downBars": X++,
                "hideBars": X++,
                "swapBars": X++,
                "swapBarsBack": X++,
                "swapBlocks": X++,
                "cut": X++,
                "random": X++
            };

            function youSlider(a, b) {
                this.container = a;
                this.cap = this.container.parent();
                this.currentli;
                this.oldli;
                this.fulloff = 0;
                this.httpprefix = location.protocol === "https:" ? "https:" : "http:";
                this.opt = b;
                this.opt.container = this.container;
                this.opt.button = "next";
                this.opt.oldItem = 0;
                this.buttons = $('<div class="buttons">									<div class="previous-btn"></div>									<div class="play-btn"></div>									<div class="next-btn"></div>								</div>');
                this.playBtn;
                this.previousBtn;
                this.nextBtn;
                this.cPreviousBtn;
                this.cNextBtn;
                this.bullets;
                this.tooltip;
                this.verticalButtonAlign = false;
                this.listItems;
                this.preloader = $('<div class="preloader"></div>');
                this.timer = $('<div class="timer"></div>');
                this.clockTimerHolder = $('<div class="clock-timer-holder"></div>');
                this.clockTimer = $('<canvas class="clock-timer"></canvas>');
                this.clockContext;
                this.timerId = null;
                this.delay = 0;
                this.paused = false;
                this.opt.ie = false;
                this.opt.ie9 = false;
                this.opt.videoPlaying = false;
                this.opt.videoStarted = false;
                this.opt.videoStopped = false;
                this.init()
            }
            youSlider.prototype = {
                init: function () {
                    var b = this;
                    this.container.data("opt", this.opt);
                    if (this.container.attr('id') == ba) this.container.attr('id', "banner-slider-" + Math.round(Math.random() * 1000 + 5));
                    this.checkBrowser();
                    this.checkJQueryVersion();
                    if (!$.support.transition) {
                        $.fn.transition = $.fn.animate
                    }
                    $.cssEase['bounce'] = 'cubic-bezier(0,1,0.5,1.3)';
                    this.loadYouTubeAPI();
                    this.loadVimeoAPI();
                    this.loadVideoJSAPI();
                    if (this.opt.randomize) {
                        this.randomizeSlides()
                    }
                    this.listItems = this.container.find('>ul:first >li');
                    if (this.isTouchDevice()) {
                        this.opt.showButtonOnHover = this.opt.pauseOnHover = this.opt.selectOnHover = false
                    }
                    this.opt.slideCount = this.listItems.length;
                    if (this.opt.slideCount <= 1) {
                        this.opt.autoPlay = this.opt.showButton = this.opt.showPlayPauseButton = this.opt.showPreviousNextArrow = this.opt.showCenterPreviousNextArrow = this.opt.showTimer = this.opt.scrollMouseWheel = false
                    }
                    if (this.opt.showCenterPreviousNextArrow) {
                        this.opt.showPreviousNextArrow = false
                    }
                    if (this.opt.showThumb) {
                        this.opt.showNumber = false;
                        if (this.opt.tooltipType == "image") {
                            this.opt.tooltipType = "none"
                        }
                    }
                    this.container.append(this.preloader);
                    this.createTimer();
                    this.opt.oldItem = this.opt.currentItem - 1;
                    if (this.opt.oldItem == -1) {
                        this.opt.oldItem = this.opt.slideCount - 1
                    }
                    if (this.container.height() == 0) this.container.height(this.opt.startHeight);
                    if (this.opt.startWidth == 0) this.opt.startWidth = this.container.width();
                    if (this.opt.startHeight == 0) this.opt.startHeight = this.container.height();
                    this.opt.width = this.container.width();
                    this.opt.height = this.container.height();
                    this.opt.bw = this.opt.startWidth / this.container.width();
                    this.opt.bh = this.opt.startHeight / this.container.height();
                    if (this.opt.width != this.opt.startWidth) {
                        this.opt.height = Math.round(this.opt.startHeight * (this.opt.width / this.opt.startWidth));
                        this.container.height(this.opt.height)
                    }
                    if (this.opt.velocity >= 2) this.opt.velocity = 1.3;
                    if (this.opt.velocity <= 0) this.opt.velocity = 1;
                    this.createShadow();
                    if (!this.opt.lazyLoad) {
                        this.container.waitForImages(function () {
                            b.container.waitForImages(function () {
                                b.preloader.fadeOut(600);
                                setTimeout(function () {
                                    b.prepareSlides();
                                    b.createButtons();
                                    b.swapSlide();
                                    b.container.trigger('banner_rotator.onloaded')
                                }, 600)
                            })
                        })
                    } else {
                        var c = this.container.find('ul >li >img').first();
                        if (c.data('lazyload') != ba) c.attr('src', c.data('lazyload'));
                        c.data('lazydone', 1);
                        c.parent().waitForImages(function () {
                            c.parent().waitForImages(function () {
                                b.preloader.fadeOut(600);
                                setTimeout(function () {
                                    b.prepareSlides();
                                    b.createButtons();
                                    b.swapSlide();
                                    b.container.trigger('banner_rotator.onloaded')
                                }, 600)
                            })
                        })
                    }
                    $(window).resize(function () {
                        if ($("body").find(b.container) != 0) {
                            if (b.container.outerWidth(true) != b.opt.width) {
                                b.containerResized()
                            }
                        }
                    });
                    this.container.find('.scrollbelowslider').on('click', function () {
                        var a = 0;
                        try {
                            a = $('body').find(b.opt.fullScreenOffsetContainer).height()
                        } catch (e) { }
                        try {
                            a -= $(this).data('scrolloffset')
                        } catch (e) { }
                        $('body,html').animate({
                            scrollTop: (b.container.offset().top + (b.container.find('>ul >li').height()) - a) + "px"
                        }, {
                            duration: 400
                        })
                    })
                },
                checkBrowser: function () {
                    this.opt.ie = !$.support.opacity;
                    this.opt.ie9 = (document.documentMode == 9)
                },
                checkJQueryVersion: function () {
                    var a = $.fn.jquery.split('.'),
                        versionTop = parseFloat(a[0]),
                        versionMinor = parseFloat(a[1]),
                        versionIncrement = parseFloat(a[2] || '0');
                    if (versionTop == 1 && versionMinor < 7) {
                        alert("jQuery version is " + a + ". Please, update it to 1.7 or later.")
                    }
                },
                isTouchDevice: function () {
                    return (("ontouchstart" in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
                },
                loadYouTubeAPI: function () {
                    var d = this;
                    var f = false;
                    this.container.find('.caption iframe').each(function () {
                        try {
                            if ($(this).attr('src').indexOf('you') > 0 && !f) {
                                f = true;
                                var a = d.httpprefix + "//www.youtube.com/iframe_api";
                                var s = document.createElement("script");
                                s.src = a;
                                var b = document.getElementsByTagName("script")[0];
                                var c = true;
                                $('head').find('*').each(function () {
                                    if ($(this).attr('src') == a) {
                                        c = false
                                    }
                                });
                                if (c) {
                                    b.parentNode.insertBefore(s, b)
                                }
                            }
                        } catch (e) { }
                    })
                },
                loadVimeoAPI: function () {
                    var d = this;
                    var g = false;
                    this.container.find('.caption iframe').each(function () {
                        try {
                            var a = d.httpprefix + "//a.vimeocdn.com/js/froogaloop2.min.js";
                            if ($(this).attr('src').indexOf('vim') > 0 && !g) {
                                g = true;
                                var f = document.createElement("script");
                                f.src = a;
                                var b = document.getElementsByTagName("script")[0];
                                var c = true;
                                $('head').find('*').each(function () {
                                    if ($(this).attr('src') == a) {
                                        c = false
                                    }
                                });
                                if (c) {
                                    b.parentNode.insertBefore(f, b)
                                }
                            }
                            if ($(this).attr('src').indexOf('vim') > 0) {
                                var f = document.createElement("script");
                                f.src = a;
                                var b = document.getElementsByTagName("script")[0];
                                b.parentNode.insertBefore(f, b)
                            }
                        } catch (e) { }
                    })
                },
                loadVideoJSAPI: function () {
                    var d = this;
                    var g = false;
                    this.container.find('.caption video').each(function (i) {
                        try {
                            if ($(this).hasClass('video-js') && !g) {
                                g = true;
                                var a = d.opt.videoJsPath + "video.js";
                                var f = document.createElement("script");
                                f.src = a;
                                var b = document.getElementsByTagName("script")[0];
                                var c = true;
                                $('head').find('*').each(function () {
                                    if ($(this).attr('src') == a) {
                                        c = false
                                    }
                                });
                                if (c) {
                                    b.parentNode.insertBefore(f, b);
                                    $('head').append('<link rel="stylesheet" type="text/css" href="' + d.opt.videoJsPath + 'video-js.min.css" media="screen" />');
                                    $('head').append('<script> videojs.options.flash.swf = "' + d.opt.videoJsPath + 'video-js.swf";</script>')
                                }
                            }
                        } catch (e) { }
                    })
                },
                randomizeSlides: function () {
                    var a = this.container.find('>ul:first-child >li').length;
                    var b = new Array(a);
                    var i = 0;
                    for (i = 0; i < a; i++) {
                        b[i] = this.container.find('>ul:first-child >li:eq(' + i + ')').clone(true)
                    }
                    for (i = 0; i < a; i++) {
                        var c = Math.floor(Math.random() * a);
                        var d = b[i];
                        b[i] = b[c];
                        b[c] = d
                    }
                    for (i = 0; i < a; i++) {
                        this.container.find('>ul:first-child >li:eq(' + i + ')').replaceWith(b[i])
                    }
                },
                randomizeArray: function (a) {
                    var b = a.length;
                    for (var i = 0; i < b; i++) {
                        var c = Math.floor(Math.random() * b);
                        var d = a[i];
                        a[i] = a[c];
                        a[c] = d
                    }
                },
                preventDefault: function () {
                    return false
                },
                prepareSlides: function () {
                    var d = this;
                    this.container.find('.caption').each(function () {
                        $(this).addClass($(this).data('transition'));
                        $(this).addClass('start')
                    });
                    this.container.find('>ul:first').css({
                        overflow: 'hidden',
                        width: '100%',
                        height: '100%',
                        maxHeight: this.cap.css('maxHeight')
                    });
                    this.listItems.each(function () {
                        var a = $(this);
                        a.css({
                            'width': '100%',
                            'height': '100%',
                            'overflow': 'hidden'
                        });
                        if (a.data('link') != ba) {
                            var b = a.data('link');
                            var c = "_self";
                            if (a.data('target') != ba) c = a.data('target');
                            a.prepend('<div class="caption sft slidelink" data-x="0" data-y="0" data-start="0"><a target="' + c + '" href="' + b + '"><div></div></a></div>')
                        }
                    });
                    this.listItems.find(">img").each(function () {
                        var a = $(this);
                        a.addClass("defaultimg");
                        if (a.data('lazyload') == ba) {
                            d.setSize(a);
                            d.setSize(a)
                        }
                    });
                    this.cap.css({
                        'overflow': 'visible'
                    })
                },
                createShadow: function () {
                    if (this.opt.shadow) {
                        this.cap.append('<div class="banner-slider-shadow banner-slider-shadow' + this.opt.shadow + '"></div>');
                        this.cap.find('.banner-slider-shadow').css({
                            'width': this.opt.width
                        })
                    }
                },
                createButtons: function () {                    
                    this.cap.append(this.buttons);
                    this.buttons.find("div").css({
                        width: this.opt.buttonWidth,
                        height: this.opt.buttonHeight
                    }).mousedown(this.preventDefault());
                    this.verticalButtonAlign = W[this.opt.buttonAlign] >= W["LT"] ? true : false;
                    if (this.opt.showButton) {
                        if (this.opt.showThumb) {
                            var a = "",
                                item, thumb;
                            for (i = 0; i < this.opt.slideCount; i++) {
                                item = $(this.listItems.get(i));
                                thumb = item.data("thumb");
                                a += '<div class="thumb" data-index="' + i + '">												<img src="' + thumb + '" width="' + this.opt.thumbWidth + '" height="' + this.opt.thumbHeight + '" data-index="' + i + '" />										    </div>'
                            }
                            this.bullets = $(a);
                            this.bullets.css({
                                width: this.opt.thumbWidth,
                                height: this.opt.thumbHeight
                            }).mousedown(this.preventDefault())
                        } else {
                            var a = "";
                            for (i = 0; i < this.opt.slideCount; i++) {
                                a += '<div class="bullet" data-index="' + i + '">' + (this.opt.showNumber ? (i + 1) : "") + '</div>'
                            }
                            this.bullets = $(a);
                            this.bullets.css({
                                width: this.opt.buttonWidth,
                                height: this.opt.buttonHeight,
                                "line-height": this.opt.buttonHeight + "px"
                            }).mousedown(this.preventDefault())
                        }
                        this.buttons.prepend(this.bullets);
                        if (this.opt.selectOnHover) {
                            this.bullets.bind("mouseover", {
                                elem: this
                            }, this.selectItem)
                        } else {
                            this.bullets.bind("click", {
                                elem: this
                            }, this.selectItem)
                        }
                        if (this.verticalButtonAlign) {
                            this.buttons.find("div").addClass("vertical").css("margin-bottom", this.opt.buttonMargin);
                            this.buttons.find("div:last-child").css("margin-bottom", "0")
                        } else {
                            this.buttons.find("div").css("margin-right", this.opt.buttonMargin);
                            this.buttons.find("div:last-child").css("margin-right", "0")
                        }
                        this.setButtonAlign();
                        this.createTooltip()
                    }
                    this.buttons.find("div").css({
                        "border-radius": this.opt.buttonBorderRadius
                    });
                    this.playBtn = this.buttons.find(".play-btn");
                    this.previousBtn = this.buttons.find(".previous-btn");
                    this.nextBtn = this.buttons.find(".next-btn");
                    this.playBtn.toggleClass("pause", this.opt.autoPlay).bind("click", {
                        elem: this
                    }, this.togglePlay);
                    if (!this.opt.showPlayPauseButton) {
                        this.playBtn.hide()
                    }
                    this.previousBtn.bind("click", {
                        elem: this
                    }, this.previousItem);
                    this.nextBtn.bind("click", {
                        elem: this
                    }, this.nextItem);
                    if (!this.opt.showPreviousNextArrow) {
                        this.previousBtn.hide();
                        this.nextBtn.hide()
                    }
                    this.pauseOnHoverBind();
                    if (this.opt.showCenterPreviousNextArrow) {
                        this.container.append('<div class="s-prev"></div><div class="s-next"></div>');
                        this.cPreviousBtn = this.container.find(".s-prev");
                        this.cNextBtn = this.container.find(".s-next");
                        this.cPreviousBtn.bind("click", {
                            elem: this
                        }, this.previousItem).mousedown(this.preventDefault());
                        this.cNextBtn.bind("click", {
                            elem: this
                        }, this.nextItem).mousedown(this.preventDefault());
                        if (this.opt.showButtonOnHover) {
                            this.cPreviousBtn.css("opacity", 0);
                            this.cNextBtn.css("opacity", 0)
                        }
                    }
                    if (this.opt.showButtonOnHover) {
                        this.buttons.css("opacity", 0);
                        this.container.bind("mouseenter", {
                            elem: this
                        }, this.showSideButtons).bind("mouseleave", {
                            elem: this
                        }, this.hideSideButtons);
                        this.buttons.bind("mouseenter", {
                            elem: this
                        }, this.showSideButtons).bind("mouseleave", {
                            elem: this
                        }, this.hideSideButtons)
                    }
                    this.swipeAction();
                    if (this.opt.scrollMouseWheel) {
                        try {
                            this.container.bind("mousewheel", {
                                elem: this
                            }, this.mouseScroll).bind("DOMMouseScroll", {
                                elem: this
                            }, this.mouseScroll)
                        } catch (ex) { }
                    }
                    this.buttons.css("visibility", "visible")
                },
                setButtonAlign: function () {
                    switch (W[this.opt.buttonAlign]) {
                        case W["BL"]:
                            this.setHPanel("left");
                            this.setInsideHP("bottom");
                            break;
                        case W["BC"]:
                            this.setHPanel("center");
                            this.setInsideHP("bottom");
                            break;
                        case W["BR"]:
                            this.setHPanel("right");
                            this.setInsideHP("bottom");
                            break;
                        case W["TL"]:
                            this.setHPanel("left");
                            this.setInsideHP("top");
                            break;
                        case W["TC"]:
                            this.setHPanel("center");
                            this.setInsideHP("top");
                            break;
                        case W["TR"]:
                            this.setHPanel("right");
                            this.setInsideHP("top");
                            break;
                        case W["LT"]:
                            this.setVPanel("top");
                            this.setInsideVP("left");
                            break;
                        case W["LC"]:
                            this.setVPanel("center");
                            this.setInsideVP("left");
                            break;
                        case W["LB"]:
                            this.setVPanel("bottom");
                            this.setInsideVP("left");
                            break;
                        case W["RT"]:
                            this.setVPanel("top");
                            this.setInsideVP("right");
                            break;
                        case W["RC"]:
                            this.setVPanel("center");
                            this.setInsideVP("right");
                            break;
                        case W["RB"]:
                            this.setVPanel("bottom");
                            this.setInsideVP("right");
                            break
                    }
                },
                setHPanel: function (a) {
                    var b, padding;
                    if (a == "center") {
                        b = Math.round(this.buttons.width() / 2);
                        this.buttons.css({
                            "left": "50%",
                            "margin-left": "-" + b + "px"
                        })
                    } else if (a == "left") {
                        padding = parseInt(this.cap.css("padding-left"));
                        this.buttons.css({
                            "left": (this.opt.buttonOffsetHorizontal + padding) + "px"
                        })
                    } else {
                        padding = parseInt(this.cap.css("padding-right"));
                        this.buttons.css({
                            "right": (this.opt.buttonOffsetHorizontal + padding) + "px"
                        })
                    }
                },
                setVPanel: function (a) {
                    var b, padding;
                    if (a == "center") {
                        b = Math.round(this.buttons.height() / 2);
                        this.buttons.css({
                            "top": "50%",
                            "margin-top": "-" + b + "px"
                        })
                    } else if (a == "top") {
                        padding = parseInt(this.cap.css("padding-top"));
                        this.buttons.css({
                            "top": (this.opt.buttonOffsetVertical + padding) + "px"
                        })
                    } else {
                        padding = parseInt(this.cap.css("padding-bottom"));
                        this.buttons.css({
                            "bottom": (this.opt.buttonOffsetVertical + padding) + "px"
                        })
                    }
                },
                setInsideHP: function (a) {
                    var b;
                    if (a == "top") {
                        b = parseInt(this.cap.css("padding-top"));
                        this.buttons.css({
                            "top": (this.opt.buttonOffsetVertical + b) + "px"
                        })
                    } else {
                        b = parseInt(this.cap.css("padding-bottom"));
                        this.buttons.css({
                            "bottom": (this.opt.buttonOffsetVertical + b) + "px"
                        })
                    }
                },
                setInsideVP: function (a) {
                    var b;
                    if (a == "left") {
                        b = parseInt(this.cap.css("padding-left"));
                        this.buttons.css({
                            "left": (this.opt.buttonOffsetHorizontal + b) + "px"
                        })
                    } else {
                        b = parseInt(this.cap.css("padding-right"));
                        this.buttons.css({
                            "right": (this.opt.buttonOffsetHorizontal + b) + "px"
                        })
                    }
                },
                swipeAction: function () {
                    var a = this;
                    if (this.opt.touchEnabled) {
                        this.container.swipe({
                            data: a.container,
                            swipeRight: function () {
                                a.opt.button = "previous";
                                a.resetTimer();
                                a.opt.oldItem = a.opt.currentItem;
                                a.opt.currentItem = a.opt.currentItem > 0 ? (a.opt.currentItem - 1) : (a.opt.slideCount - 1);
                                a.swapSlide()
                            },
                            swipeLeft: function () {
                                a.opt.button = "next";
                                a.resetTimer();
                                a.opt.oldItem = a.opt.currentItem;
                                a.opt.currentItem = a.opt.currentItem < (a.opt.slideCount - 1) ? (a.opt.currentItem + 1) : 0;
                                a.swapSlide()
                            },
                            allowPageScroll: "auto"
                        })
                    }
                },
                mouseScroll: function (e) {
                    var a = e.data.elem;
                    var b = (typeof e.originalEvent.wheelDelta == "undefined") ? -e.originalEvent.detail : e.originalEvent.wheelDelta;
                    b > 0 ? a.previousItem() : a.nextItem();
                    return false
                },
                createTooltip: function () {
                    if (this.opt.showTooltip) {
                        if (this.opt.tooltipType == "text") {
                            $("body").append("<div id='rotator-tooltip'><div class='arrow'></div><div class='tt-txt'></div></div>");
                            this.tooltip = $("body").find("#rotator-tooltip");
                            this.bullets.bind("mouseover", {
                                elem: this
                            }, this.showTooltip).bind("mouseout", {
                                elem: this
                            }, this.hideTooltip).bind("mousemove", {
                                elem: this
                            }, this.moveTooltip);
                            switch (W[this.opt.buttonAlign]) {
                                case W["TL"]:
                                case W["TC"]:
                                case W["TR"]:
                                    this.tooltip.data("bottom", true).addClass("txt-down");
                                    break;
                                default:
                                    this.tooltip.data("bottom", false).addClass("txt-up")
                            }
                        } else if (this.opt.tooltipType == "image") {
                            var a = '<div id="rotator-tooltip"><div class="arrow"></div>';
                            for (var i = 0; i < this.opt.slideCount; i++) {
                                var b = $(this.listItems.get(i)).data("thumb");
                                if (b != ba) {
                                    a += '<img src="' + b + '" />'
                                } else {
                                    a += '<img/>'
                                }
                            }
                            a += '</div>';
                            $("body").append(a);
                            this.tooltip = $("body").find("#rotator-tooltip");
                            this.tooltip.css({
                                opacity: 0,
                                "-moz-opacity": 0,
                                "filter": "alpha(opacity=0)"
                            });
                            switch (W[this.opt.buttonAlign]) {
                                case W["TL"]:
                                case W["TC"]:
                                case W["TR"]:
                                    this.bullets.bind("mouseover", {
                                        elem: this
                                    }, this.showHImgTooltip);
                                    this.tooltip.data("bottom", true).addClass("img-down");
                                    break;
                                case W["LT"]:
                                case W["LC"]:
                                case W["LB"]:
                                    this.bullets.bind("mouseover", {
                                        elem: this
                                    }, this.showVImgTooltip);
                                    this.tooltip.data("right", true).addClass("img-right");
                                    break;
                                case W["RT"]:
                                case W["RC"]:
                                case W["RB"]:
                                    this.bullets.bind("mouseover", {
                                        elem: this
                                    }, this.showVImgTooltip);
                                    this.tooltip.data("right", false).addClass("img-left");
                                    break;
                                default:
                                    this.bullets.bind("mouseover", {
                                        elem: this
                                    }, this.showHImgTooltip);
                                    this.tooltip.data("bottom", false).addClass("img-up")
                            }
                            this.bullets.bind("mouseout", {
                                elem: this
                            }, this.hideImgTooltip)
                        }
                    }
                },
                showHImgTooltip: function (e) {
                    var a = e.data.elem;
                    var b = a.tooltip.find(">img").eq($(this).index());
                    if (b.attr("src")) {
                        a.tooltip.find(">img").hide();
                        b.show();
                        if (b[0].complete || b[0].readyState == "complete") {
                            var c = a.tooltip.data("bottom") ? $(this).outerHeight() : -a.tooltip.outerHeight();
                            var d = $(this).offset();
                            var f = d.top + c;
                            var g = a.tooltip.data("bottom") ? -5 : 5;
                            a.tooltip.stop(true, true).css({
                                display: "block",
                                top: f + g,
                                left: d.left + (($(this).outerWidth() - a.tooltip.outerWidth()) / 2)
                            }).delay(300).animate({
                                top: f,
                                opacity: 1
                            }, 500)
                        }
                    }
                },
                showVImgTooltip: function (e) {
                    var a = e.data.elem;
                    var b = a.tooltip.find(">img").eq($(this).index());
                    if (b.attr("src")) {
                        a.tooltip.find(">img").hide();
                        b.show();
                        if (b[0].complete || b[0].readyState == "complete") {
                            var c = a.tooltip.data("right") ? $(this).outerWidth() : -a.tooltip.outerWidth();
                            var d = $(this).offset();
                            var f = d.left + c;
                            var g = a.tooltip.data("right") ? -5 : 5;
                            a.tooltip.stop(true, true).css({
                                display: "block",
                                top: d.top + (($(this).outerHeight() - a.tooltip.outerHeight()) / 2),
                                left: f + g
                            }).delay(300).animate({
                                left: f,
                                opacity: 1
                            }, 500)
                        }
                    }
                },
                hideImgTooltip: function (e) {
                    var a = (typeof e != "undefined") ? e.data.elem : this;
                    if (a.opt.showTooltip) {
                        a.tooltip.stop(true, true).animate({
                            opacity: 0
                        }, 500, "linear", function () {
                            a.tooltip.css({
                                display: "none"
                            })
                        })
                    }
                },
                showTooltip: function (e) {
                    var a = e.data.elem;
                    var i = $(this).data("index");
                    var b = $(a.listItems.get(i));
                    var c = b.data("title");
                    if (c != "") {
                        a.tooltip.find(">div.tt-txt").html(c);
                        var d = a.tooltip.data("bottom") ? 20 : -a.tooltip.outerHeight(true);
                        var f = a.tooltip.data("bottom") ? 9 : 13;
                        a.tooltip.css({
                            top: e.pageY + d,
                            left: e.pageX - f
                        }).stop(true, true).delay(300).fadeIn(500)
                    }
                },
                moveTooltip: function (e) {
                    var a = e.data.elem;
                    var b = a.tooltip.data("bottom") ? 20 : -a.tooltip.outerHeight(true);
                    var c = a.tooltip.data("bottom") ? 9 : 13;
                    a.tooltip.css({
                        top: e.pageY + b,
                        left: e.pageX - c
                    })
                },
                hideTooltip: function (e) {
                    var a = (typeof e != "undefined") ? e.data.elem : this;
                    if (a.opt.showTooltip && a.tooltip != ba) {
                        a.tooltip.stop(true, true).hide()
                    }
                },
                togglePlay: function (e) {
                    var a = e.data.elem;
                    a.opt.autoPlay = !a.opt.autoPlay;
                    if (a.container.data('play') != ba) {
                        a.opt.autoPlay = a.container.data('play');
                        a.container.removeData('play')
                    }
                    a.playBtn.toggleClass("pause", a.opt.autoPlay);
                    a.opt.autoPlay ? a.startTimer() : a.pauseTimer();
                    return false
                },
                play: function (e) {
                    var a = e.data.elem;
                    if (!a.opt.videoPlaying) {
                        a.paused = false;
                        a.opt.autoPlay = true;
                        a.playBtn.addClass("pause");
                        a.startTimer()
                    }
                },
                pause: function (e) {
                    var a = e.data.elem;
                    a.paused = true;
                    a.opt.autoPlay = false;
                    a.playBtn.removeClass("pause");
                    a.pauseTimer()
                },
                pauseLast: function () {
                    if (this.opt.currentItem == (this.opt.slideCount - 1)) {
                        this.opt.autoPlay = false;
                        this.playBtn.removeClass("pause");
                        this.container.trigger('banner_rotator.onstop')
                    }
                },
                pauseOnHoverBind: function () {
                    if (this.opt.autoPlay && this.opt.pauseOnHover) {
                        this.container.bind("mouseenter", {
                            elem: this
                        }, this.pause).bind("mouseleave", {
                            elem: this
                        }, this.play)
                    }
                },
                pauseOnHoverUnBind: function () {
                    if (this.opt.pauseOnHover) {
                        this.container.unbind("mouseenter");
                        this.container.unbind("mouseleave")
                    }
                },
                previousItem: function (e) {
                    var a = (typeof e != "undefined") ? e.data.elem : this;
                    a.opt.button = "previous";
                    a.resetTimer();
                    a.opt.oldItem = a.opt.currentItem;
                    a.opt.currentItem = a.opt.currentItem > 0 ? (a.opt.currentItem - 1) : (a.opt.slideCount - 1);
                    a.swapSlide();
                    return false
                },
                nextItem: function (e) {
                    var a = (typeof e != "undefined") ? e.data.elem : this;
                    a.opt.button = "next";
                    a.resetTimer();
                    a.opt.oldItem = a.opt.currentItem;
                    a.opt.currentItem = a.opt.currentItem < (a.opt.slideCount - 1) ? (a.opt.currentItem + 1) : 0;
                    if (a.container.data('showslide') != ba) {
                        a.opt.currentItem = a.container.data('showslide') - 1;
                        a.container.removeData('showslide')
                    }
                    a.swapSlide();
                    return false
                },
                selectItem: function (e) {
                    var a = e.data.elem;
                    var b = $(e.target);
                    var i = b.data("index");
                    if (i >= 0 && i != a.opt.currentItem) {
                        a.opt.button = i < a.opt.currentItem ? "previous" : "next";
                        a.resetTimer();
                        a.opt.oldItem = a.opt.currentItem;
                        a.opt.currentItem = i;
                        a.swapSlide();
                        a.hideTooltip()
                    }
                    return false
                },
                showSideButtons: function (e) {
                    var a = e.data.elem;
                    a.buttons.stop().animate({
                        "opacity": 1
                    }, 500, "linear");
                    if (a.opt.showCenterPreviousNextArrow) {
                        a.cPreviousBtn.stop().animate({
                            "opacity": 0.3
                        }, 500, "linear");
                        a.cNextBtn.stop().animate({
                            "opacity": 0.3
                        }, 500, "linear")
                    }
                },
                hideSideButtons: function (e) {
                    var a = e.data.elem;
                    a.buttons.stop().animate({
                        "opacity": 0
                    }, 500, "linear");
                    if (a.opt.showCenterPreviousNextArrow) {
                        a.cPreviousBtn.stop().animate({
                            "opacity": 0
                        }, 500, "linear");
                        a.cNextBtn.stop().animate({
                            "opacity": 0
                        }, 500, "linear")
                    }
                },
                createTimer: function () {
                    this.container.append(this.timer);
                    this.timer.data("pct", 1).css("width", "0%");
                    var a = document.createElement("canvas").getContext;
                    if (!a) {
                        this.opt.timerType = "line"
                    }
                    if (this.opt.showTimer) {
                        if (this.opt.timerType == "clock") {
                            this.clockTimerHolder.css({
                                width: this.opt.buttonWidth,
                                height: this.opt.buttonHeight
                            });
                            this.buttons.append(this.clockTimerHolder);
                            this.clockTimerHolder.append(this.clockTimer);
                            this.clockContext = this.clockTimer[0].getContext("2d");
                            this.clockContext.lineWidth = this.opt.timerArcSize;
                            this.clockContext.lineCap = "round";
                            this.clockTimerContext(this, 0, 1, true)
                        } else {
                            this.timer.addClass("timer-" + this.opt.timerAlign)
                        }
                    } else {
                        this.timer.hide()
                    }
                },
                clockTimerContext: function (a, b, c, d) {
                    var y;
                    var x = y = a.opt.buttonWidth / 2;
                    var r = x - a.opt.buttonWidth / 10;
                    a.clockContext.clearRect(0, 0, this.opt.buttonWidth, this.opt.buttonHeight);
                    a.clockContext.strokeStyle = "rgba(255, 255, 255, .4)";
                    a.clockContext.beginPath();
                    a.clockContext.arc(x, y, r, 0, Math.PI * 2, true);
                    a.clockContext.stroke();
                    a.clockContext.closePath();
                    if (d == null) {
                        a.clockContext.strokeStyle = "rgba(255, 255, 255, .85)";
                        a.clockContext.beginPath();
                        a.clockContext.arc(x, y, r, (Math.PI * 2 * (b / c)) - (Math.PI / 2), -Math.PI / 2, true);
                        a.clockContext.stroke();
                        a.clockContext.closePath()
                    }
                },
                startTimer: function () {
                    if (this.opt.autoPlay && !this.opt.videoPlaying && this.timerId == null) {
                        var c = this;
                        var d = Math.round(this.timer.data("pct") * this.delay);
                        if (this.opt.showTimer) {
                            if (this.opt.timerType == "clock") {
                                var f = 780;
                                this.timer.animate({
                                    "left": f + "px"
                                }, {
                                    easing: "linear",
                                    duration: d,
                                    queue: false,
                                    step: function (a, b) {
                                        $(this).data("pct", 1 - a / f);
                                        c.clockTimerContext(c, a, f)
                                    }
                                })
                            } else {
                                this.timer.animate({
                                    width: (this.opt.width + 1)
                                }, d, "linear")
                            }
                        }
                        this.timerId = setTimeout(function (e) {
                            c.resetTimer();
                            c.opt.button = "next";
                            c.opt.oldItem = c.opt.currentItem;
                            c.opt.currentItem = c.opt.currentItem < (c.opt.slideCount - 1) ? (c.opt.currentItem + 1) : 0;
                            c.swapSlide()
                        }, d);
                        this.container.trigger('banner_rotator.onresume');
                        if (c.opt.videoStarted) {
                            c.container.trigger('banner_rotator.onvideoplay');
                            c.opt.videoStarted = false
                        }
                        if (c.opt.videoStopped) {
                            c.container.trigger('banner_rotator.onvideostop');
                            c.opt.videoStopped = false
                        }
                    }
                },
                resetTimer: function () {
                    clearTimeout(this.timerId);
                    this.timerId = null;
                    this.timer.stop(true).data("pct", 1);
                    if (this.opt.showTimer) {
                        if (this.opt.timerType == "clock") {
                            this.timer.css("left", "0px");
                            this.clockTimerContext(this, 0, 1, true)
                        } else {
                            this.timer.width(0)
                        }
                    }
                },
                pauseTimer: function () {
                    clearTimeout(this.timerId);
                    this.timerId = null;
                    this.timer.stop(true);
                    if (this.opt.showTimer && this.opt.timerType == "line") {
                        this.timer.data("pct", 1 - (this.timer.width() / (this.opt.width + 1)))
                    }
                    this.container.trigger('banner_rotator.onpause')
                },
                containerResized: function () {
                    var a = this;
                    this.listItems.find(".defaultimg").each(function (i) {
                        a.setSize($(this));
                        a.opt.height = Math.round(a.opt.startHeight * (a.opt.width / a.opt.startWidth));
                        a.container.height(a.opt.height);
                        a.setSize($(this));
                        try {
                            a.container.parent().find('.banner-slider-shadow').css({
                                'width': a.opt.width
                            })
                        } catch (e) { }
                    });
                    this.setCaptionPosition();
                    this.container.find('.caption').each(function () {
                        $(this).stop(true, true)
                    });
                    this.showCaption(this.currentli);
                    this.resetTimer();
                    this.startTimer()
                },
                setSize: function (c) {
                    this.opt.width = parseInt(this.container.width(), 0);
                    this.opt.height = parseInt(this.container.height(), 0);
                    this.opt.bw = this.opt.width / this.opt.startWidth;
                    this.opt.bh = this.opt.height / this.opt.startHeight;
                    if (this.opt.fullScreen) {
                        this.opt.height = this.opt.bw * this.opt.startHeight
                    }
                    if (this.opt.bh > 1) {
                        this.opt.bw = 1;
                        this.opt.bh = 1
                    }
                    if ((c.data('lazyload') != ba && c.data('lazydone') == 1) || c.data('lazyload') == ba) {
                        if (c.data('orgw') != ba && c.data('orgw') != 0) {
                            c.width(c.data('orgw'));
                            c.height(c.data('orgh'))
                        }
                    }
                    var d = this.opt.width / c.width();
                    var f = this.opt.height / c.height();
                    this.opt.fw = d;
                    this.opt.fh = f;
                    if ((c.data('lazyload') != ba && c.data('lazydone') == 1) || c.data('lazyload') == ba) {
                        if (c.data('orgw') == ba || c.data('orgw') == 0) {
                            c.data('orgw', c.width());
                            c.data('orgh', c.height())
                        }
                    }
                    if (this.opt.fullWidth && !this.opt.fullScreen) {
                        var g = this.cap.width();
                        var h = this.cap.height();
                        var i = g / c.data('orgw');
                        var j = h / c.data('orgh');
                        if ((c.data('lazyload') != ba && c.data('lazydone') == 1) || c.data('lazyload') == ba) {
                            c.width(c.width() * j);
                            c.height(h)
                        }
                        if (c.width() < g) {
                            c.width(g + 50);
                            i = c.width() / c.data('orgw');
                            c.height(c.data('orgh') * i)
                        }
                        if (c.width() > g) {
                            c.data("fxof", (g - c.width()) / 2);
                            c.css({
                                'position': 'absolute',
                                'left': c.data('fxof') + 'px'
                            })
                        }
                        if (c.height() <= h) {
                            c.data('fyof', 0);
                            c.data("fxof", (g - c.width()) / 2);
                            c.css({
                                'position': 'absolute',
                                'top': c.data('fyof') + "px",
                                'left': c.data('fxof') + "px"
                            })
                        }
                        if (c.height() > h && c.data('fullwidthcentering') == true) {
                            c.data('fyof', (h - c.height()) / 2);
                            c.data("fxof", (g - c.width()) / 2);
                            c.css({
                                'position': 'absolute',
                                'top': c.data('fyof') + "px",
                                'left': c.data('fxof') + "px"
                            })
                        }
                    } else if (this.opt.fullScreen) {
                        var g = this.cap.width();
                        var h = $(window).height();
                        var k = (h - (this.opt.startHeight * this.opt.bh)) / 2;
                        if (k < 0) h = this.opt.startHeight * this.opt.bh;
                        if (this.opt.fullScreenOffsetContainer != ba) {
                            try {
                                var l = this.opt.fullScreenOffsetContainer.split(",");
                                $.each(l, function (a, b) {
                                    h -= $(b).outerHeight(true)
                                })
                            } catch (e) { }
                        }
                        this.container.parent().height(h);
                        this.container.css({
                            'height': '100%'
                        });
                        this.opt.height = h;
                        var j = h / c.data('orgh');
                        var i = g / c.data('orgw');
                        if ((c.data('lazyload') != ba && c.data('lazydone') == 1) || c.data('lazyload') === ba) {
                            c.width(c.width() * j);
                            c.height(h)
                        }
                        if (c.width() < g) {
                            c.width(g + 50);
                            var i = c.width() / c.data('orgw');
                            c.height(c.data('orgh') * i)
                        }
                        if (c.width() > g) {
                            c.data("fxof", (g - c.width()) / 2);
                            c.css({
                                'position': 'absolute',
                                'left': c.data('fxof') + "px"
                            })
                        }
                        if (c.height() <= h) {
                            c.data('fyof', 0);
                            c.data("fxof", (g - c.width()) / 2);
                            c.css({
                                'position': 'absolute',
                                'top': c.data('fyof') + "px",
                                'left': c.data('fxof') + "px"
                            })
                        }
                        if (c.height() > h && c.data('fullwidthcentering') == true) {
                            c.data('fyof', (h - c.height()) / 2);
                            c.data("fxof", (g - c.width()) / 2);
                            c.css({
                                'position': 'absolute',
                                'top': c.data('fyof') + "px",
                                'left': c.data('fxof') + "px"
                            })
                        }
                    } else {
                        if ((c.data('lazyload') != ba && c.data('lazydone') == 1) || c.data('lazyload') == ba) {
                            c.width(this.opt.width);
                            c.height(c.height() * d)
                        }
                        if (c.height() < this.opt.height && c.height() != 0 && c.height() != null) {
                            if ((c.data('lazyload') != ba && c.data('lazydone') == 1) || c.data('lazyload') == ba) {
                                c.height(this.opt.height);
                                c.width(c.data('orgw') * f)
                            }
                        }
                    }
                    c.data('neww', c.width());
                    c.data('newh', c.height())
                },
                getPosNumber: function (a, b) {
                    if (!isNaN(a) && a > 0) {
                        return a
                    }
                    return b
                },
                getBoolean: function (a, b) {
                    if (a != ba) {
                        return a.toString() == "true"
                    }
                    return b
                },
                getRandom: function (i) {
                    return Math.floor(Math.random() * i)
                },
                getBannerClone: function (a) {
                    if (!a) {
                        a = this.currentli.find(".defaultimg")
                    }
                    this.fulloff = a.data("fxof");
                    if (this.fulloff == ba) this.fulloff = 0;
                    var b = a.clone();
                    var c = $('<div class="banner-clone"></div>');
                    c.append(b);
                    return c
                },
                getBannerCloneBackground: function (a) {
                    var b = $('<div class="banner-clone"></div>');
                    b.css({
                        'left': a.left,
                        'top': a.top,
                        'width': a.width,
                        'height': a.height,
                        'background-image': 'url(' + a.image + ')',
                        'background-position': a.position.left + 'px ' + a.position.top + 'px'
                    });
                    return b
                },
                addBannerClone: function (a) {
                    this.container.append(a)
                },
                swapSlide: function () {
                    var a = this;
                    this.oldli = $(this.listItems.get(this.opt.oldItem));
                    this.currentli = $(this.listItems.get(this.opt.currentItem));
                    var b = this.currentli.find('.defaultimg');
                    if (b.data('lazyload') != ba && b.data('lazydone') != 1) {
                        b.attr('src', b.data('lazyload')), b.data('lazydone', 1);
                        b.data('orgw', 0);
                        var c = setInterval(function () {
                            if (b.attr('src') == b.data('lazyload')) {
                                clearInterval(c);
                                a.preloader.fadeIn(300);
                                setTimeout(function () {
                                    a.resetTimer()
                                }, 180);
                                a.currentli.waitForImages(function () {
                                    setTimeout(function () {
                                        a.startTimer()
                                    }, 190);
                                    a.preloader.fadeOut(600);
                                    a.setSize(b);
                                    a.swapSlideProgress()
                                })
                            }
                        }, 100)
                    } else {
                        this.swapSlideProgress()
                    }
                },
                swapSlideProgress: function () {
                    var b = this;
                    if (this.opt.playOnce) {
                        this.pauseLast()
                    }
                    this.container.trigger('banner_rotator.onbeforeswap');
                    this.opt.transitionStarted = true;
                    this.opt.videoPlaying = false;
                    this.showListItem();
                    this.oldli.css({
                        "z-index": 1
                    });
                    this.currentli.css({
                        "z-index": 2
                    });
                    this.delay = this.getPosNumber(this.currentli.data("delay"), this.opt.delay);
                    var c = Y[this.currentli.data("transition")];
                    if (c == ba) {
                        c = Y[this.opt.transition]
                    }
                    if (c == Y["random"]) {
                        c = Math.floor(Math.random() * (X - 1))
                    }
                    this.listItems.each(function () {
                        var a = $(this);
                        if (a.index() != b.opt.oldItem) {
                            a.css("visibility", "hidden")
                        }
                        if (a.index() != b.opt.currentItem) {
                            a.css({
                                "z-index": 1
                            })
                        }
                    });
                    this.removeCaption(this.oldli);
                    if (this.opt.showButton) {
                        this.buttons.find("div.curr-thumb").removeClass("curr-thumb");
                        this.buttons.find(">div:eq(" + this.opt.currentItem + ")").addClass("curr-thumb")
                    }
                    switch (c) {
                        case Y["block"]:
                            this.animationBlock();
                            break;
                        case Y["cube"]:
                            this.animationCube();
                            break;
                        case Y["cubeRandom"]:
                            this.animationCube({
                                random: true
                            });
                            break;
                        case Y["cubeShow"]:
                            this.animationCubeShow();
                            break;
                        case Y["cubeStop"]:
                            this.animationCubeStop();
                            break;
                        case Y["cubeStopRandom"]:
                            this.animationCubeStop({
                                random: true
                            });
                            break;
                        case Y["cubeHide"]:
                            this.animationCubeHide();
                            break;
                        case Y["cubeSize"]:
                            this.animationCubeSize();
                            break;
                        case Y["cubeSpread"]:
                            this.animationCubeSpread();
                            break;
                        case Y["horizontal"]:
                            this.animationHorizontal();
                            break;
                        case Y["showBars"]:
                            this.animationShowBars();
                            break;
                        case Y["showBarsRandom"]:
                            this.animationShowBars({
                                random: true
                            });
                            break;
                        case Y["tube"]:
                            this.animationTube();
                            break;
                        case Y["fade"]:
                            this.animationFade();
                            break;
                        case Y["fadeFour"]:
                            this.animationFadeFour();
                            break;
                        case Y["parallel"]:
                            this.animationParallel();
                            break;
                        case Y["blind"]:
                            this.animationBlind();
                            break;
                        case Y["blindHeight"]:
                            this.animationBlindDimension({
                                height: true
                            });
                            break;
                        case Y["blindWidth"]:
                            this.animationBlindDimension({
                                height: false,
                                speed: 400,
                                delay: 50
                            });
                            break;
                        case Y["directionTop"]:
                            this.animationDirection({
                                direction: "top"
                            });
                            break;
                        case Y["directionBottom"]:
                            this.animationDirection({
                                direction: "bottom"
                            });
                            break;
                        case Y["directionRight"]:
                            this.animationDirection({
                                direction: "right",
                                total: 5
                            });
                            break;
                        case Y["directionLeft"]:
                            this.animationDirection({
                                direction: "left",
                                total: 5
                            });
                            break;
                        case Y["glassCube"]:
                            this.animationGlassCube();
                            break;
                        case Y["glassBlock"]:
                            this.animationGlassBlock();
                            break;
                        case Y["circles"]:
                            this.animationCircles();
                            break;
                        case Y["circlesInside"]:
                            this.animationCirclesInside();
                            break;
                        case Y["circlesRotate"]:
                            this.animationCirclesRotate();
                            break;
                        case Y["upBars"]:
                            this.animationDirectionBars({
                                direction: "top"
                            });
                            break;
                        case Y["downBars"]:
                            this.animationDirectionBars({
                                direction: "bottom"
                            });
                            break;
                        case Y["hideBars"]:
                            this.animationHideBars();
                            break;
                        case Y["swapBars"]:
                            this.animationSwapBars();
                            break;
                        case Y["swapBarsBack"]:
                            this.animationSwapBars({
                                easing: "easeOutBack"
                            });
                            break;
                        case Y["swapBlocks"]:
                            this.animationSwapBlocks();
                            break;
                        case Y["cut"]:
                            this.animationCut();
                            break
                    }
                    var d = {};
                    d.currentItem = this.opt.currentItem + 1;
                    this.container.trigger('banner_rotator.onchange', d)
                },
                finishAnimation: function () {
                    this.opt.transitionStarted = false;
                    this.container.trigger('banner_rotator.onafterswap');
                    this.showListItem();
                    this.showCaption(this.currentli);
                    this.startTimer()
                },
                showListItem: function () {
                    this.container.find(".banner-clone").stop().remove();
                    if (this.currentli) {
                        this.currentli.css("visibility", "visible")
                    }
                },
                animationBlock: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easing;
                    var c = 500 / this.opt.velocity;
                    var d = 15;
                    var e = this.opt.width / d;
                    var f = this.opt.height;
                    var i = 0;
                    for (i = 0; i < d; i++) {
                        var g = e * i;
                        var h = 0;
                        var j = this.getBannerClone();
                        var k = j.find("img");
                        j.css({
                            left: (this.opt.width + 100),
                            top: 0,
                            width: e,
                            height: f
                        });
                        k.css({
                            left: this.fulloff - (e * i)
                        });
                        this.addBannerClone(j);
                        var l = 80 * i;
                        j.show().delay(l).animate({
                            top: h,
                            left: g
                        }, c, b);
                        var m = (i == (d - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        j.find("img").hide().delay(l + 100).animate({
                            opacity: 'show'
                        }, c + 300, b, m)
                    }
                },
                animationCube: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        random: false
                    }, a || {});
                    var c = (this.opt.easing == "") ? "easeOutExpo" : this.opt.easing;
                    var d = 700 / this.opt.velocity;
                    var e = 8;
                    var f = 3;
                    var g = e * f;
                    var h = Math.ceil(this.opt.width / e);
                    var j = Math.ceil(this.opt.height / f);
                    var k = this.opt.height + 200;
                    var l = this.opt.height + 200;
                    var m = 0;
                    var n = 0;
                    for (i = 0; i < g; i++) {
                        k = (i % 2 == 0) ? k : -k;
                        l = (i % 2 == 0) ? l : -l;
                        var o = k + (j * m) + (m * 150);
                        var p = -this.opt.width;
                        var q = -(j * m);
                        var r = -(h * n);
                        var s = (j * m);
                        var t = (h * n);
                        var u = this.getBannerClone();
                        u.hide();
                        var v = 50 * (i);
                        if (a.random) {
                            v = 40 * (n);
                            u.css({
                                left: p + 'px',
                                top: o + 'px',
                                width: h,
                                height: j
                            })
                        } else {
                            d = 500;
                            u.css({
                                left: (this.opt.width + (h * i)),
                                top: (this.opt.height + (j * i)),
                                width: h,
                                height: j
                            })
                        }
                        this.addBannerClone(u);
                        var w = (i == (g - 1)) ? function () {
                            b.finishAnimation()
                        } : "";
                        u.show().delay(v).animate({
                            top: s + 'px',
                            left: t + 'px'
                        }, d, c, w);
                        if (a.random) {
                            u.find('img').css({
                                left: this.fulloff + r + 100,
                                top: q + 50
                            });
                            u.find('img').delay(v + (d / 2)).animate({
                                left: this.fulloff + r,
                                top: q
                            }, 1000, 'easeOutBack')
                        } else {
                            u.find('img').css({
                                left: this.fulloff + r,
                                top: q
                            });
                            u.find('img').delay(v + (d / 2)).fadeTo(100, 0.5).fadeTo(300, 1)
                        }
                        m++;
                        if (m == f) {
                            m = 0;
                            n++
                        }
                    }
                },
                animationCubeShow: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easin;
                    var c = 400 / this.opt.velocity;
                    var d = 8;
                    var e = 4;
                    var f = d * e;
                    var g = Math.ceil(this.opt.width / d);
                    var h = Math.ceil(this.opt.height / e);
                    var j = false;
                    var k = 0;
                    var l = 0;
                    var m = 0;
                    var n = 0;
                    for (i = 0; i < f; i++) {
                        k = h * m;
                        l = g * n;
                        var o = 30 * i;
                        var p = this.getBannerClone();
                        p.css({
                            left: l,
                            top: k,
                            width: g,
                            height: h
                        }).hide();
                        p.find('img').css({
                            left: this.fulloff - l,
                            top: -k
                        });
                        this.addBannerClone(p);
                        var q = (i == (f - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        p.delay(o).animate({
                            width: "show",
                            height: "show"
                        }, c, b, q);
                        m++;
                        if (m == e) {
                            m = 0;
                            n++
                        }
                    }
                },
                animationCubeStop: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        random: false
                    }, a || {});
                    var c = (this.opt.easing == "") ? "easeInQuad" : this.opt.easing;
                    var d = 300 / this.opt.velocity;
                    var e = this.oldli.find(".defaultimg");
                    this.currentli.css("visibility", "visible");
                    var f = 8;
                    var g = Math.ceil(this.opt.height / (this.opt.width / 8));
                    var h = f * g;
                    var j = Math.ceil(this.opt.width / f);
                    var k = Math.ceil(this.opt.height / g);
                    var l = 0;
                    var m = 0;
                    var n = 0;
                    var o = 0;
                    var p = this.opt.width / 16;
                    for (i = 0; i < h; i++) {
                        l = (i % 2 == 0) ? l : -l;
                        m = (i % 2 == 0) ? m : -m;
                        var q = l + (k * n);
                        var r = m + (j * o);
                        var s = -(k * n);
                        var t = -(j * o);
                        var u = q - p;
                        var v = r - p;
                        var w = this.getBannerClone(e);
                        w.css({
                            left: r + 'px',
                            top: q + 'px',
                            width: j,
                            height: k
                        });
                        w.find('img').css({
                            left: this.fulloff + t,
                            top: s
                        });
                        this.addBannerClone(w);
                        w.show();
                        var x = 50 * i;
                        if (a.random) {
                            d = (400 * (this.getRandom(2) + 1)) / this.opt.velocity;
                            u = q;
                            v = r;
                            x = Math.ceil(30 * this.getRandom(30))
                        }
                        if (a.random && i == (h - 1)) {
                            d = 400 * 3;
                            x = 30 * 30
                        }
                        var y = (i == (h - 1)) ? function () {
                            b.finishAnimation()
                        } : "";
                        w.delay(x).animate({
                            opacity: 'hide',
                            top: u + 'px',
                            left: v + 'px'
                        }, d, c, y);
                        n++;
                        if (n == g) {
                            n = 0;
                            o++
                        }
                    }
                },
                animationCubeHide: function (a) {
                    var b = this;
                    var c = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easing;
                    var d = 500 / this.opt.velocity;
                    var e = this.oldli.find(".defaultimg");
                    this.currentli.css("visibility", "visible");
                    var f = 8;
                    var g = 3;
                    var h = f * g;
                    var j = Math.ceil(this.opt.width / f);
                    var k = Math.ceil(this.opt.height / g);
                    var l = 0;
                    var m = 0;
                    var n = 0;
                    var o = 0;
                    for (i = 0; i < h; i++) {
                        l = (i % 2 == 0) ? l : -l;
                        m = (i % 2 == 0) ? m : -m;
                        var p = l + (k * n);
                        var q = (m + (j * o));
                        var r = -(k * n);
                        var s = -(j * o);
                        var t = p - 50;
                        var u = q - 50;
                        var v = this.getBannerClone(e);
                        v.css({
                            left: q + 'px',
                            top: p + 'px',
                            width: j,
                            height: k
                        });
                        v.find('img').css({
                            left: this.fulloff + s,
                            top: r
                        });
                        this.addBannerClone(v);
                        v.show();
                        var w = 50 * i;
                        w = (i == (h - 1)) ? (h * 50) : w;
                        var x = (i == (h - 1)) ? function () {
                            b.finishAnimation()
                        } : "";
                        v.delay(w).animate({
                            opacity: 'hide'
                        }, d, c, x);
                        n++;
                        if (n == g) {
                            n = 0;
                            o++
                        }
                    }
                },
                animationCubeSize: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeInOutQuad" : this.opt.easing;
                    var c = 600 / this.opt.velocity;
                    var d = this.oldli.find(".defaultimg");
                    this.currentli.css("visibility", "visible");
                    var e = 8;
                    var f = 3;
                    var g = e * f;
                    var h = Math.ceil(this.opt.width / e);
                    var j = Math.ceil(this.opt.height / f);
                    var k = 0;
                    var l = 0;
                    var m = 0;
                    var n = 0;
                    var o = Math.ceil(this.opt.width / 6);
                    for (i = 0; i < g; i++) {
                        k = (i % 2 == 0) ? k : -k;
                        l = (i % 2 == 0) ? l : -l;
                        var p = k + (j * m);
                        var q = (l + (h * n));
                        var r = -(j * m);
                        var s = -(h * n);
                        var t = p - o;
                        var u = q - o;
                        var v = this.getBannerClone(d);
                        v.css({
                            left: q,
                            top: p,
                            width: h,
                            height: j
                        });
                        v.find('img').css({
                            left: this.fulloff + s,
                            top: r
                        });
                        this.addBannerClone(v);
                        v.show();
                        var w = 50 * i;
                        var x = (i == (g - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        v.delay(w).animate({
                            opacity: "hide",
                            width: "hide",
                            height: "hide",
                            top: p + (h * 1.5),
                            left: q + (j * 1.5)
                        }, c, b, x);
                        m++;
                        if (m == f) {
                            m = 0;
                            n++
                        }
                    }
                },
                animationCubeSpread: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easing;
                    var c = 700 / this.opt.velocity;
                    var d = 8;
                    var e = Math.ceil(this.opt.height / (this.opt.width / 8));
                    var f = d * e;
                    var g = Math.ceil(this.opt.width / d);
                    var h = Math.ceil(this.opt.height / e);
                    var j = 0;
                    var k = 0;
                    var l = 0;
                    var m = 0;
                    var n = new Array;
                    var o = new Array;
                    for (i = 0; i < f; i++) {
                        j = (i % 2 == 0) ? j : -j;
                        k = (i % 2 == 0) ? k : -k;
                        var p = j + (h * l);
                        var q = k + (g * m);
                        n[i] = [p, q];
                        l++;
                        if (l == e) {
                            l = 0;
                            m++
                        }
                    }
                    l = 0;
                    m = 0;
                    for (i = 0; i < f; i++) {
                        o[i] = i
                    };
                    this.randomizeArray(o);
                    for (i = 0; i < f; i++) {
                        j = (i % 2 == 0) ? j : -j;
                        k = (i % 2 == 0) ? k : -k;
                        var p = j + (h * l);
                        var q = k + (g * m);
                        var r = -(h * l);
                        var s = -(g * m);
                        var t = p;
                        var u = q;
                        p = n[o[i]][0];
                        q = n[o[i]][1];
                        var v = this.getBannerClone();
                        v.css({
                            left: q + 'px',
                            top: p + 'px',
                            width: g,
                            height: h
                        });
                        v.find('img').css({
                            left: this.fulloff + s,
                            top: r
                        });
                        this.addBannerClone(v);
                        var w = 30 * (Math.random() * 30);
                        if (i == (f - 1)) w = 30 * 30;
                        var x = (i == (f - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        v.delay(w).animate({
                            opacity: 'show',
                            top: t + 'px',
                            left: u + 'px'
                        }, c, b, x);
                        l++;
                        if (l == e) {
                            l = 0;
                            m++
                        }
                    }
                },
                animationHorizontal: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutExpo" : this.opt.easing;
                    var c = 700 / this.opt.velocity;
                    var d = 7;
                    var e = (this.opt.width);
                    var f = Math.ceil(this.opt.height / d);
                    for (i = 0; i < d; i++) {
                        var g = e;
                        var h = i * f;
                        var j = this.getBannerClone();
                        j.css({
                            left: g + 'px',
                            top: h + 'px',
                            width: e,
                            height: f
                        });
                        j.find('img').css({
                            left: this.fulloff,
                            top: -h
                        });
                        this.addBannerClone(j);
                        var k = 90 * i;
                        var l = (i == (d - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        j.delay(k).animate({
                            opacity: 'show',
                            top: h,
                            left: 0
                        }, c, b, l)
                    }
                },
                animationShowBars: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        random: false
                    }, a || {});
                    var c = (this.opt.easing == "") ? 'easeOutQuad' : this.opt.easing;
                    var d = 400 / this.opt.velocity;
                    var e = 10;
                    var f = Math.ceil(this.opt.width / e);
                    var g = (this.opt.height);
                    for (i = 0; i < e; i++) {
                        var h = f * i;
                        var j = 0;
                        var k = this.getBannerClone();
                        k.css({
                            left: h,
                            top: (j - 50),
                            width: f,
                            height: g
                        });
                        k.find('img').css({
                            left: this.fulloff - (f * i),
                            top: 0
                        });
                        this.addBannerClone(k);
                        if (a.random) {
                            var l = this.getRandom(e);
                            var m = 50 * l;
                            m = (i == (e - 1)) ? (50 * e) : m
                        } else {
                            var m = 70 * i;
                            d = d - (i * 2)
                        }
                        var n = (i == (e - 1)) ? function () {
                            b.finishAnimation()
                        } : "";
                        k.delay(m).animate({
                            opacity: 'show',
                            top: j + 'px',
                            left: h + 'px'
                        }, d, c, n)
                    }
                },
                animationTube: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutElastic" : this.opt.easing;
                    var c = 600 / this.opt.velocity;
                    var d = 10;
                    var e = Math.ceil(this.opt.width / d);
                    var f = this.opt.height;
                    for (i = 0; i < d; i++) {
                        var g = 0;
                        var h = f;
                        var j = e * i;
                        var k = this.getBannerClone();
                        k.css({
                            left: j,
                            top: h,
                            height: f,
                            width: e
                        });
                        k.find('img').css({
                            left: this.fulloff - (j)
                        });
                        this.addBannerClone(k);
                        var l = this.getRandom(d);
                        var m = 30 * l;
                        var n = (i == (d - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        k.show().delay(m).animate({
                            top: g
                        }, c, b, n)
                    }
                },
                animationFade: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easing;
                    var c = 800 / this.opt.velocity;
                    var d = this.opt.width;
                    var e = this.opt.height;
                    var f = 0;
                    var g = 0;
                    var h = this.getBannerClone();
                    h.css({
                        left: f,
                        top: g,
                        width: d,
                        height: e
                    });
                    this.addBannerClone(h);
                    var i = function () {
                        a.finishAnimation()
                    };
                    h.animate({
                        opacity: "show",
                        left: 0,
                        top: 0
                    }, c, b, i)
                },
                animationFadeFour: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easing;
                    var c = 500 / this.opt.velocity;
                    var d = this.opt.width;
                    var e = this.opt.height;
                    var f = 4;
                    var g, vleft;
                    for (i = 0; i < f; i++) {
                        switch (i) {
                            case 0:
                                g = '-100px';
                                vleft = '-100px';
                                break;
                            case 1:
                                g = '-100px';
                                vleft = '100px';
                                break;
                            case 2:
                                g = '100px';
                                vleft = '-100px';
                                break;
                            case 3:
                                g = '100px';
                                vleft = '100px';
                                break
                        }
                        var h = this.getBannerClone();
                        h.css({
                            left: vleft,
                            top: g,
                            width: d,
                            height: e
                        });
                        this.addBannerClone(h);
                        var j = (i == (f - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        h.animate({
                            opacity: "show",
                            left: 0,
                            top: 0
                        }, c, b, j)
                    }
                },
                animationParallel: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easing;
                    var c = 400 / this.opt.velocity;
                    var d = 16;
                    var e = Math.ceil(this.opt.width / d);
                    var f = this.opt.height;
                    for (i = 0; i < d; i++) {
                        var g = e * i;
                        var h = 0;
                        var j = this.getBannerClone();
                        j.css({
                            left: g,
                            top: h - this.opt.height,
                            width: e,
                            height: f
                        });
                        j.find('img').css({
                            left: this.fulloff - (e * i),
                            top: 0
                        });
                        this.addBannerClone(j);
                        var k;
                        if (i <= ((d / 2) - 1)) {
                            k = 1400 - (i * 200)
                        } else if (i > ((d / 2) - 1)) {
                            k = ((i - (d / 2)) * 200)
                        }
                        k = k / 2.5;
                        var l = (i == (d - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        j.delay(k).animate({
                            top: h + 'px',
                            left: g + 'px',
                            opacity: 'show'
                        }, c, b, l)
                    }
                },
                animationBlind: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        height: false
                    }, a || {});
                    var c = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easing;
                    var d = 400 / this.opt.velocity;
                    var e = 16;
                    var f = Math.ceil(this.opt.width / e);
                    var g = this.opt.height;
                    var h;
                    for (i = 0; i < e; i++) {
                        var j = f * i;
                        var k = 0;
                        var l = this.getBannerClone();
                        l.css({
                            left: j,
                            top: k,
                            width: f,
                            height: g
                        });
                        l.find('img').css({
                            left: this.fulloff - (f * i),
                            top: 0
                        });
                        this.addBannerClone(l);
                        if (!a.height) {
                            if (i <= ((e / 2) - 1)) {
                                h = 1400 - (i * 200)
                            } else if (i > ((e / 2) - 1)) {
                                h = ((i - (e / 2)) * 200)
                            }
                            var m = (i == (e - 1)) ? function () {
                                b.finishAnimation()
                            } : ""
                        } else {
                            if (i <= ((e / 2) - 1)) {
                                h = 200 + (i * 200)
                            } else if (i > ((e / 2) - 1)) {
                                h = (((e / 2) - i) * 200) + (e * 100)
                            }
                            var m = (i == (e / 2)) ? function () {
                                b.finishAnimation()
                            } : ""
                        }
                        h = h / 2.5;
                        if (!a.height) {
                            l.delay(h).animate({
                                opacity: 'show',
                                top: k + 'px',
                                left: j + 'px',
                                width: 'show'
                            }, d, c, m)
                        } else {
                            d += i * 2;
                            var c = 'easeOutQuad';
                            l.delay(h).animate({
                                opacity: 'show',
                                top: k + 'px',
                                left: j + 'px',
                                height: 'show'
                            }, d, c, m)
                        }
                    }
                },
                animationBlindDimension: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        height: true,
                        speed: 500,
                        delay: 100
                    }, a || {});
                    var c = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easing;
                    var d = a.speed / this.opt.velocity;
                    var e = 16;
                    var f = Math.ceil(this.opt.width / e);
                    var g = this.opt.height;
                    for (i = 0; i < e; i++) {
                        var h = f * i;
                        var j = 0;
                        var k = this.getBannerClone();
                        k.css({
                            left: h,
                            top: j,
                            width: f,
                            height: g
                        });
                        k.find('img').css({
                            left: this.fulloff - (f * i),
                            top: 0
                        });
                        this.addBannerClone(k);
                        var l = a.delay * i;
                        var m = (i == (e - 1)) ? function () {
                            b.finishAnimation()
                        } : "";
                        if (!a.height) {
                            k.delay(l).animate({
                                opacity: 'show',
                                top: j + 'px',
                                left: h + 'px',
                                width: 'show'
                            }, d, c, m)
                        } else {
                            var c = 'easeOutQuad';
                            k.delay(l).animate({
                                opacity: 'show',
                                top: j + 'px',
                                left: h + 'px',
                                height: 'show'
                            }, d, c, m)
                        }
                    }
                },
                animationDirection: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        direction: "top",
                        delay_type: "sequence",
                        total: 7
                    }, a || {});
                    var c = (this.opt.easing == "") ? "easeInOutExpo" : this.opt.easing;
                    var d = 1200 / this.opt.velocity;
                    var e = this.oldli.find(".defaultimg");
                    var f = a.total;
                    for (i = 0; i < f; i++) {
                        switch (a.direction) {
                            default:
                            case "top":
                                var g = Math.ceil(this.opt.width / f);
                                var h = this.opt.height;
                                var j = 0;
                                var k = g * i;
                                var l = -h;
                                var m = k;
                                var n = h;
                                var o = k;
                                var p = 0;
                                var q = k;
                                var r = 0;
                                var s = -k;
                                break;
                            case "bottom":
                                var g = Math.ceil(this.opt.width / f);
                                var h = this.opt.height;
                                var j = 0;
                                var k = g * i;
                                var l = h;
                                var m = k;
                                var n = -h;
                                var o = k;
                                var p = 0;
                                var q = k;
                                var r = 0;
                                var s = -k;
                                break;
                            case "right":
                                var g = this.opt.width;
                                var h = Math.ceil(this.opt.height / f);
                                var j = h * i;
                                var k = 0;
                                var l = j;
                                var m = g;
                                var n = j;
                                var o = -m;
                                var p = j;
                                var q = 0;
                                var r = -j;
                                var s = 0;
                                break;
                            case "left":
                                var g = this.opt.width;
                                var h = Math.ceil(this.opt.height / f);
                                var j = h * i;
                                var k = 0;
                                var l = j;
                                var m = -g;
                                var n = j;
                                var o = -m;
                                var p = j;
                                var q = 0;
                                var r = -j;
                                var s = 0;
                                break
                        }
                        switch (a.delay_type) {
                            case 'zebra':
                            default:
                                var t = (i % 2 == 0) ? 0 : 150;
                                break;
                            case 'random':
                                var t = 30 * (Math.random() * 30);
                                break;
                            case 'sequence':
                                var t = i * 100;
                                break
                        }
                        var u = this.getBannerClone(e);
                        u.find('img').css({
                            left: this.fulloff + s,
                            top: r
                        });
                        u.css({
                            top: j,
                            left: k,
                            width: g,
                            height: h
                        });
                        this.addBannerClone(u);
                        u.show();
                        u.delay(t).animate({
                            top: l,
                            left: m
                        }, d, c);
                        var v = this.getBannerClone();
                        v.find('img').css({
                            left: this.fulloff + s,
                            top: r
                        });
                        v.css({
                            top: n,
                            left: o,
                            width: g,
                            height: h
                        });
                        this.addBannerClone(v);
                        v.show();
                        var w = (i == (f - 1)) ? function () {
                            b.finishAnimation()
                        } : "";
                        v.delay(t).animate({
                            top: p,
                            left: q
                        }, d, c, w)
                    }
                },
                animationGlassCube: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutExpo" : this.opt.easing;
                    var c = 500 / this.opt.velocity;
                    var d = 20;
                    var e = Math.ceil(this.opt.width / d) * 2;
                    var f = this.opt.height / 2;
                    var g = 0;
                    for (i = 0; i < d; i++) {
                        mod = (i % 2) == 0 ? true : false;
                        var h = e * g;
                        var j = mod ? -this.opt.height : this.opt.height;
                        var k = e * g;
                        var l = mod ? 0 : f;
                        var m = -(e * g);
                        var n = mod ? 0 : -f;
                        var o = 120 * g;
                        var p = this.getBannerClone();
                        p.css({
                            left: h,
                            top: j,
                            width: e,
                            height: f
                        });
                        p.find('img').css({
                            left: this.fulloff + m + (e / 1.5),
                            top: n
                        }).delay(o).animate({
                            left: this.fulloff + m,
                            top: n
                        }, (c * 1.9), 'easeOutQuad');
                        this.addBannerClone(p);
                        var q = (i == (d - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        p.show().delay(o).animate({
                            top: l,
                            left: k
                        }, c, b, q);
                        if ((i % 2) != 0) g++
                    }
                },
                animationGlassBlock: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutExpo" : this.opt.easing;
                    var c = 700 / this.opt.velocity;
                    var d = 10;
                    var e = Math.ceil(this.opt.width / d);
                    var f = this.opt.height;
                    for (i = 0; i < d; i++) {
                        var g = e * i;
                        var h = 0;
                        var j = e * i;
                        var k = 0;
                        var l = -(e * i);
                        var m = 0;
                        var n = 100 * i;
                        var o = this.getBannerClone();
                        o.css({
                            left: g,
                            top: h,
                            width: e,
                            height: f
                        });
                        o.find('img').css({
                            left: this.fulloff + l + (e / 1.5),
                            top: m
                        }).delay(n).animate({
                            left: this.fulloff + l,
                            top: m
                        }, (c * 1.1), 'easeInOutQuad');
                        this.addBannerClone(o);
                        var p = (i == (d - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        o.delay(n).animate({
                            top: k,
                            left: j,
                            opacity: 'show'
                        }, c, b, p)
                    }
                },
                animationCircles: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeInQuad" : this.opt.easing;
                    var c = 500 / this.opt.velocity;
                    var d = 10;
                    var e = 100;
                    var f = Math.ceil(Math.sqrt(Math.pow((this.opt.width), 2) + Math.pow((this.opt.height), 2)));
                    this.fulloff = this.currentli.find(".defaultimg").data("fxof");
                    if (this.fulloff == ba) this.fulloff = 0;
                    for (i = 0; i < d; i++) {
                        var g = (this.opt.width - e) / 2;
                        var h = (this.opt.height - e) / 2;
                        var j = g;
                        var k = h;
                        var l = null;
                        l = this.getBannerCloneBackground({
                            image: this.currentli.find(".defaultimg").attr("src"),
                            left: g,
                            top: h,
                            width: e,
                            height: e,
                            position: {
                                top: -h,
                                left: this.fulloff - g
                            }
                        }).css({
                            "border-radius": f + "px"
                        });
                        e += 100;
                        this.addBannerClone(l);
                        var m = 70 * i;
                        var n = (i == (d - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        l.delay(m).animate({
                            top: k,
                            left: j,
                            opacity: 'show'
                        }, c, b, n)
                    }
                },
                animationCirclesInside: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeInQuad" : this.opt.easing;
                    var c = 500 / this.opt.velocity;
                    var d = this.oldli.find(".defaultimg");
                    this.currentli.css("visibility", "visible");
                    var e = 10;
                    var f = Math.sqrt(Math.pow((this.opt.width), 2) + Math.pow((this.opt.height), 2));
                    var f = Math.ceil(f);
                    var g = f;
                    this.fulloff = d.data("fxof");
                    if (this.fulloff == ba) this.fulloff = 0;
                    for (i = 0; i < e; i++) {
                        var h = (this.opt.width - g) / 2;
                        var j = (this.opt.height - g) / 2;
                        var k = h;
                        var l = j;
                        var m = null;
                        m = this.getBannerCloneBackground({
                            image: d.attr("src"),
                            left: h,
                            top: j,
                            width: g,
                            height: g,
                            position: {
                                top: -j,
                                left: this.fulloff - h
                            }
                        }).css({
                            "border-radius": f + "px"
                        });
                        g -= 100;
                        this.addBannerClone(m);
                        m.show();
                        var n = 70 * i;
                        var o = (i == (e - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        m.delay(n).animate({
                            top: l,
                            left: k,
                            opacity: "hide"
                        }, c, b, o)
                    }
                },
                animationCirclesRotate: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutQuad" : this.opt.easing;
                    var c = 500 / this.opt.velocity;
                    var d = this.oldli.find(".defaultimg");
                    this.currentli.css("visibility", "visible");
                    var e = 10;
                    var f = Math.ceil(Math.sqrt(Math.pow((this.opt.width), 2) + Math.pow((this.opt.height), 2)));
                    var g = f;
                    var h = navigator.userAgent;
                    var j = (h.indexOf("Mozilla") != -1 ? true : false);
                    this.fulloff = d.data("fxof");
                    if (this.fulloff == ba) this.fulloff = 0;
                    for (i = 0; i < e; i++) {
                        var k = (this.opt.width - g) / 2;
                        var l = (this.opt.height - g) / 2;
                        var m = k;
                        var n = l;
                        var o = null;
                        if (j) {
                            o = this.getBannerClone(d);
                            o.css({
                                left: k,
                                top: l,
                                width: g,
                                height: g,
                                "border-radius": f + "px"
                            });
                            o.find("img").css({
                                left: this.fulloff - k,
                                top: -l
                            })
                        } else {
                            o = this.getBannerCloneBackground({
                                image: d.attr("src"),
                                left: k,
                                top: l,
                                width: g,
                                height: g,
                                position: {
                                    top: -l,
                                    left: this.fulloff - k
                                }
                            }).css({
                                "border-radius": f + "px"
                            })
                        }
                        g -= 100;
                        this.addBannerClone(o);
                        o.show();
                        var p = 100 * i;
                        var q = (i % 2 == 0) ? "20deg" : "-20deg";
                        var r = (i == (e - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        o.delay(p).animate({
                            top: n,
                            left: m,
                            opacity: "hide",
                            rotate: q
                        }, c, b, r)
                    }
                },
                animationDirectionBars: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        direction: "top"
                    }, a || {});
                    var c = (this.opt.easing == "") ? "easeInOutQuad" : this.opt.easing;
                    var d = 400 / this.opt.velocity;
                    var e = this.oldli.find(".defaultimg");
                    this.currentli.css("visibility", "visible");
                    var f = 12;
                    var g = Math.ceil(this.opt.width / f);
                    var h = this.opt.height;
                    var j = (a.direction == "top") ? -h : h;
                    for (i = 0; i < f; i++) {
                        var k = 0;
                        var l = g * i;
                        var m = 0;
                        var n = -(g * i);
                        var o = this.getBannerClone(e);
                        o.css({
                            left: l + 'px',
                            top: k + 'px',
                            width: g,
                            height: h
                        });
                        o.find('img').css({
                            left: this.fulloff + n,
                            top: m
                        });
                        this.addBannerClone(o);
                        o.show();
                        var p = 70 * i;
                        var q = (i == (f - 1)) ? function () {
                            b.finishAnimation()
                        } : "";
                        o.delay(p).animate({
                            top: j
                        }, d, c, q)
                    }
                },
                animationHideBars: function () {
                    var a = this;
                    var b = (this.opt.easing == "") ? "easeOutCirc" : this.opt.easing;
                    var c = 700 / this.opt.velocity;
                    var d = this.oldli.find(".defaultimg");
                    this.currentli.css("visibility", "visible");
                    var e = 10;
                    var f = e;
                    var g = Math.ceil(this.opt.width / e);
                    var h = this.opt.height;
                    for (i = 0; i < f; i++) {
                        var j = 0;
                        var k = g * i;
                        var l = 0;
                        var m = -(g * i);
                        var n = '+=' + g;
                        var o = this.getBannerClone(d);
                        o.css({
                            left: 0,
                            top: 0,
                            width: g,
                            height: h
                        });
                        o.find('img').css({
                            left: this.fulloff + m,
                            top: l
                        });
                        var p = this.getBannerClone(d);
                        p.css({
                            left: k + 'px',
                            top: j + 'px',
                            width: g,
                            height: h
                        });
                        p.html(o);
                        this.addBannerClone(p);
                        o.show();
                        p.show();
                        var q = 50 * i;
                        var r = (i == (f - 1)) ? function () {
                            a.finishAnimation()
                        } : "";
                        o.delay(q).animate({
                            left: n
                        }, c, b, r)
                    }
                },
                animationSwapBars: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        direction: "top",
                        delay_type: "sequence",
                        total: 7,
                        easing: "easeOutCirc"
                    }, a || {});
                    var c = (this.opt.easing == "") ? a.easing : this.opt.easing;
                    var d = 500 / this.opt.velocity;
                    var e = this.oldli.find(".defaultimg");
                    var f = a.total;
                    for (i = 0; i < f; i++) {
                        var g = Math.ceil(this.opt.width / f);
                        var h = this.opt.height;
                        var j = 0;
                        var k = g * i;
                        var l = -h;
                        var m = k + g;
                        var n = h;
                        var o = k;
                        var p = 0;
                        var q = k;
                        var r = 0;
                        var s = -k;
                        switch (a.delay_type) {
                            case "zebra":
                            default:
                                var t = (i % 2 == 0) ? 0 : 150;
                                break;
                            case "random":
                                var t = 30 * (Math.random() * 30);
                                break;
                            case "sequence":
                                var t = i * 100;
                                break
                        }
                        var u = this.getBannerClone(e);
                        u.find('img').css({
                            left: this.fulloff + s,
                            top: 0
                        });
                        u.css({
                            top: 0,
                            left: 0,
                            width: g,
                            height: h
                        });
                        var v = this.getBannerClone();
                        v.find('img').css({
                            left: this.fulloff + s,
                            top: 0
                        });
                        v.css({
                            top: 0,
                            left: -g,
                            width: g,
                            height: h
                        });
                        var w = this.getBannerClone();
                        w.html('').append(u).append(v);
                        w.css({
                            top: 0,
                            left: k,
                            width: g,
                            height: h
                        });
                        this.addBannerClone(w);
                        w.show();
                        u.show();
                        v.show();
                        var x = (i == (f - 1)) ? function () {
                            b.finishAnimation()
                        } : "";
                        u.delay(t).animate({
                            left: g
                        }, d, c);
                        v.delay(t).animate({
                            left: 0
                        }, d, c, x)
                    }
                },
                animationSwapBlocks: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        easing_old: "easeInOutQuad",
                        easing_new: "easeOutQuad"
                    }, a || {});
                    var c = (this.opt.easing == "") ? a.easing_old : this.opt.easing;
                    var d = (this.opt.easing == "") ? a.easing_new : this.opt.easing;
                    var e = 800 / this.opt.velocity;
                    var f = this.oldli.find(".defaultimg");
                    var g = 2;
                    var h = this.opt.width;
                    var i = Math.ceil(this.opt.height / g);
                    var j = this.getBannerClone(f);
                    j.find('img').css({
                        left: this.fulloff,
                        top: 0
                    });
                    j.css({
                        top: 0,
                        left: 0,
                        width: h,
                        height: i
                    });
                    var k = this.getBannerClone(f);
                    k.find('img').css({
                        left: this.fulloff,
                        top: -i
                    });
                    k.css({
                        top: i,
                        left: 0,
                        width: h,
                        height: i
                    });
                    var l = this.getBannerClone();
                    l.find('img').css({
                        left: this.fulloff,
                        top: i
                    });
                    l.css({
                        top: 0,
                        left: 0,
                        width: h,
                        height: i
                    });
                    var m = this.getBannerClone();
                    m.find('img').css({
                        left: this.fulloff,
                        top: -(i * g)
                    });
                    m.css({
                        top: i,
                        left: 0,
                        width: h,
                        height: i
                    });
                    this.addBannerClone(l);
                    this.addBannerClone(m);
                    this.addBannerClone(j);
                    this.addBannerClone(k);
                    j.show();
                    k.show();
                    l.show();
                    m.show();
                    var n = function () {
                        b.finishAnimation()
                    };
                    j.find('img').animate({
                        top: i
                    }, e, c, function () {
                        j.remove()
                    });
                    k.find('img').animate({
                        top: -(i * g)
                    }, e, c, function () {
                        k.remove()
                    });
                    l.find('img').animate({
                        top: 0
                    }, e, d);
                    m.find('img').animate({
                        top: -i
                    }, e, d, n)
                },
                animationCut: function (a) {
                    var b = this;
                    var a = $.extend({}, {
                        easing_old: "easeInOutExpo",
                        easing_new: "easeInOutExpo"
                    }, a || {});
                    var c = (this.opt.easing == "") ? a.easing_old : this.opt.easing;
                    var d = (this.opt.easing == "") ? a.easing_new : this.opt.easing;
                    var e = 900 / this.opt.velocity;
                    var f = this.oldli.find(".defaultimg");
                    var g = 2;
                    var h = this.opt.width;
                    var i = Math.ceil(this.opt.height / g);
                    var j = this.getBannerClone(f);
                    j.find('img').css({
                        left: this.fulloff,
                        top: 0
                    });
                    j.css({
                        top: 0,
                        left: 0,
                        width: h,
                        height: i
                    });
                    var k = this.getBannerClone(f);
                    k.find('img').css({
                        left: this.fulloff,
                        top: -i
                    });
                    k.css({
                        top: i,
                        left: 0,
                        width: h,
                        height: i
                    });
                    var l = this.getBannerClone();
                    l.find('img').css({
                        left: this.fulloff,
                        top: 0
                    });
                    l.css({
                        top: 0,
                        left: h,
                        width: h,
                        height: i
                    });
                    var m = this.getBannerClone();
                    m.find('img').css({
                        left: this.fulloff,
                        top: -i
                    });
                    m.css({
                        top: i,
                        left: -h,
                        width: h,
                        height: i
                    });
                    this.addBannerClone(l);
                    this.addBannerClone(m);
                    this.addBannerClone(j);
                    this.addBannerClone(k);
                    j.show();
                    k.show();
                    l.show();
                    m.show();
                    var n = function () {
                        b.finishAnimation()
                    };
                    j.animate({
                        left: -h
                    }, e, c, function () {
                        j.remove()
                    });
                    k.animate({
                        left: h
                    }, e, c, function () {
                        k.remove()
                    });
                    l.animate({
                        left: 0
                    }, e, d);
                    m.animate({
                        left: 0
                    }, e, d, n)
                },
                onYouTubePlayerAPIReady: function () { },
                onPlayerStateChange: function (e) {
                    var a = e.target.getVideoEmbedCode();
                    var b = $('#' + a.split('id="')[1].split('"')[0]);
                    var c = b.closest('.banner-slider');
                    var d = c.data('opt');
                    if (e.data == YT.PlayerState.PLAYING) {
                        c.data('play', false);
                        d.videoPlaying = true;
                        d.videoStarted = true;
                        c.parent().find('.play-btn').click();
                        if (b.closest('.caption').data('volume') == "mute") {
                            player.mute()
                        }
                    } else {
                        if (e.data != -1) {
                            c.data('play', true);
                            d.videoPlaying = false;
                            d.videoStopped = true;
                            c.parent().find('.play-btn').click()
                        }
                    }
                    if (e.data == 0 && d.nextSlideAtEnd) {
                        d.container.brNext()
                    }
                },
                onPlayerReady: function (e) {
                    e.target.playVideo()
                },
                addEvent: function (a, b, c) {
                    if (a.addEventListener) {
                        a.addEventListener(b, c, false)
                    } else {
                        a.attachEvent(b, c, false)
                    }
                },
                vimeoReady: function (c, d) {
                    var e = $f(c);
                    var f = $('#' + c);
                    var g = f.closest('.banner-slider');
                    var h = g.data('opt');
                    e.addEvent('ready', function (b) {
                        if (d) e.api('play');
                        e.addEvent('play', function (a) {
                            g.data('play', false);
                            h.videoPlaying = true;
                            g.parent().find('.play-btn').click();
                            if (f.closest('.caption').data('volume') == "mute") {
                                e.api('setVolume', "0")
                            }
                        });
                        e.addEvent('finish', function (a) {
                            g.data('play', true);
                            h.videoPlaying = false;
                            h.videoStarted = true;
                            g.parent().find('.play-btn').click();
                            if (h.nextSlideAtEnd) h.container.brNext()
                        });
                        e.addEvent('pause', function (a) {
                            g.data('play', true);
                            h.videoPlaying = false;
                            h.videoStopped = true;
                            g.parent().find('.play-btn').click()
                        })
                    })
                },
                html5VideoReady: function (g, h, i) {
                    if (h == ba) h = $(g["b"]).attr('id');
                    var j = $('#' + h);
                    var k = j.closest('.banner-slider');
                    var l = k.data('opt');
                    g.on("play", function () {
                        if (j.closest('.caption').data('volume') == "mute") {
                            g.volume(0)
                        }
                        k.data('play', false);
                        try {
                            l.videoPlaying = true
                        } catch (e) { }
                        k.parent().find('.play-btn').click()
                    });
                    g.on("pause", function () {
                        k.data('play', true);
                        l.videoPlaying = false;
                        l.videoStopped = true;
                        k.parent().find('.play-btn').click()
                    });
                    g.on("ended", function () {
                        k.data('play', true);
                        l.videoPlaying = false;
                        l.videoStopped = true;
                        k.parent().find('.play-btn').click();
                        if (l.nextSlideAtEnd) l.container.brNext()
                    });
                    g.on("loadedmetadata", function (a) {
                        var b = 0;
                        var c = 0;
                        for (var d in this) {
                            try {
                                if (this[d].hasOwnProperty('videoWidth')) {
                                    b = this[d].videoWidth
                                }
                                if (this[d].hasOwnProperty('videoHeight')) {
                                    c = this[d].videoHeight
                                }
                            } catch (e) { }
                        }
                        var f = b / c;
                        if (j.data('mediaAspect') == ba) {
                            j.data('mediaAspect', f)
                        }
                        if (j.closest('.caption').data('forcecover')) {
                            i.updateHTML5Size(j, k)
                        }
                    })
                },
                updateHTML5Size: function (a, b) {
                    var c = b.width();
                    var d = b.height();
                    var e = a.data('mediaAspect');
                    var f = c / d;
                    a.parent().find('.vjs-poster').css({
                        width: "100%",
                        height: "100%"
                    });
                    if (f < e) {
                        a.width(d * e).height(d);
                        a.css('top', 0).css('left', -(d * e - c) / 2).css('height', d);
                        a.find('.vjs-tech').css('width', d * e)
                    } else {
                        a.width(c).height(c / e);
                        a.css('top', -(c / e - d) / 2).css('left', 0).css('height', c / e);
                        a.find('.vjs-tech').css('width', '100%')
                    }
                },
                setCaptionPosition: function () {
                    var a = this.currentli.find('.caption');
                    if (a.find('iframe') == 0) {
                        if (a.hasClass('hcenter')) {
                            a.css({
                                'height': this.opt.height + "px",
                                'top': '0px',
                                'left': ((this.opt.width - a.outerWidth()) / 2) + 'px'
                            })
                        } else {
                            if (a.hasClass('vcenter')) {
                                a.css({
                                    'width': this.opt.width + "px",
                                    'left': '0px',
                                    'top': ((this.opt.height - a.outerHeight()) / 2) + 'px'
                                })
                            }
                        }
                    }
                },
                showCaption: function (Q) {
                    var R = this;
                    var S = 0;
                    var T = 0;
                    Q.find('.caption').each(function (i) {
                        S = (R.opt.width - R.opt.startWidth) / 2;
                        if (R.opt.bh > 1) {
                            R.opt.bw = 1;
                            R.opt.bh = 1
                        }
                        if (R.opt.bw > 1) {
                            R.opt.bw = 1;
                            R.opt.bh = 1
                        }
                        var j = R.opt.bw;
                        var k = R.opt.bh;
                        if (R.opt.fullScreen) {
                            T = (R.opt.height - (R.opt.startHeight * R.opt.bh)) / 2
                        }
                        if (T < 0) T = 0;
                        var l = Q.find('.caption:eq(' + i + ')');
                        l.stop(true, true);
                        var n = false;
                        if (R.opt.width <= R.opt.hideCaptionAtResolution && l.data('captionhidden') == true) {
                            l.addClass("hidden-caption");
                            n = true
                        } else {
                            if (R.opt.width < R.opt.hideCaptionAtResolution) {
                                l.addClass("hidden-caption");
                                n = true
                            } else {
                                l.removeClass("hidden-caption")
                            }
                        }
                        if (!n) {
                            if (l.data('linktoslide') != ba) {
                                l.css({
                                    'cursor': 'pointer'
                                });
                                l.click(function () {
                                    var a = $(this);
                                    var b = a.data('linktoslide');
                                    if (b != "next" && b != "prev") {
                                        R.container.data('showus', b);
                                        R.container.parent().find('.rightarrow').click()
                                    } else if (b == "next") R.container.parent().find('.rightarrow').click();
                                    else if (b == "prev") R.container.parent().find('.leftarrow').click()
                                })
                            }
                            if (l.hasClass("coloredbg")) S = 0;
                            if (S < 0) S = 0;
                            clearTimeout(l.data('timer'));
                            clearTimeout(l.data('timer-end'));
                            var o = "iframe" + Math.round(Math.random() * 1000 + 1);
                            if (l.find('iframe').length > 0) {
                                if (l.data('autoplayonlyfirsttime')) {
                                    l.data('autoplay', true)
                                }
                                l.find('iframe').each(function () {
                                    var a = $(this);
                                    if (a.attr('src').toLowerCase().indexOf('youtube') >= 0) {
                                        R.opt.nextSlideAtEnd = l.data('nextslideatend');
                                        if (!a.hasClass("HasListener")) {
                                            try {
                                                a.attr('id', o);
                                                var b;
                                                if (l.data('autoplay')) {
                                                    b = new YT.Player(o, {
                                                        events: {
                                                            "onStateChange": R.onPlayerStateChange,
                                                            "onReady": R.onPlayerReady
                                                        }
                                                    })
                                                } else {
                                                    b = new YT.Player(o, {
                                                        events: {
                                                            "onStateChange": R.onPlayerStateChange
                                                        }
                                                    })
                                                }
                                                a.addClass("HasListener");
                                                l.data('player', b);
                                                if (l.data('autoplay')) {
                                                    var c = $('body').find('#' + R.opt.container.attr('id')).find('.timer');
                                                    setTimeout(function () {
                                                        c.stop();
                                                        R.opt.videoPlaying = true
                                                    }, 200)
                                                }
                                            } catch (e) { }
                                        } else {
                                            if (l.data('autoplay')) {
                                                var b = l.data('player');
                                                l.data('timerplay', setTimeout(function () {
                                                    if (l.data('forcerewind')) {
                                                        b.seekTo(0)
                                                    }
                                                    b.playVideo()
                                                }, l.data('start')));
                                                var c = $('body').find('#' + R.opt.container.attr('id')).find('.timer');
                                                setTimeout(function () {
                                                    c.stop();
                                                    R.opt.videoPlaying = true
                                                }, 200)
                                            }
                                        }
                                    } else {
                                        if (a.attr('src').toLowerCase().indexOf('vimeo') >= 0) {
                                            R.opt.nextSlideAtEnd = l.data('nextslideatend');
                                            if (!a.hasClass("HasListener")) {
                                                a.addClass("HasListener");
                                                a.attr('id', o);
                                                var d = a.attr('src');
                                                var f = {},
                                                    queryString = d,
                                                    re = /([^&=]+)=([^&]*)/g,
                                                    m;
                                                while (m = re.exec(queryString)) {
                                                    f[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
                                                }
                                                if (f['player_id'] != ba) {
                                                    d = d.replace(f['player_id'], o)
                                                } else {
                                                    d += "&player_id=" + o
                                                }
                                                try {
                                                    d = d.replace('api=0', 'api=1')
                                                } catch (e) { }
                                                d += "&api=1";
                                                a.attr('src', d);
                                                var b = l.find('iframe')[0];
                                                if (l.data('autoplay')) {
                                                    $f(b).addEvent('ready', function () {
                                                        R.vimeoReady(o, true)
                                                    });
                                                    var c = $('body').find('#' + R.opt.container.attr('id')).find('.timer');
                                                    setTimeout(function () {
                                                        c.stop();
                                                        R.opt.videoPlaying = true
                                                    }, 200)
                                                } else {
                                                    $f(b).addEvent('ready', function () {
                                                        R.vimeoReady(o, false)
                                                    })
                                                }
                                            } else {
                                                if (l.data('autoplay')) {
                                                    var a = l.find('iframe');
                                                    var g = a.attr('id');
                                                    var h = $f(g);
                                                    l.data('timerplay', setTimeout(function () {
                                                        if (l.data('forcerewind')) {
                                                            h.api("seekTo", 0)
                                                        }
                                                        h.api("play")
                                                    }, l.data('start')));
                                                    var c = $('body').find('#' + R.opt.container.attr('id')).find('.timer');
                                                    setTimeout(function () {
                                                        c.stop();
                                                        R.opt.videoPlaying = true
                                                    }, 200)
                                                }
                                            }
                                        }
                                    }
                                })
                            }
                            if (l.find('video').length > 0) {
                                if (l.data('autoplayonlyfirsttime')) {
                                    l.data('autoplay', true)
                                }
                                l.find('video').each(function (i) {
                                    var b = $(this).parent();
                                    var c = 16 / 9;
                                    if (l.data('aspectratio') == "4:3") c = 4 / 3;
                                    b.data('mediaAspect', c);
                                    if (b.hasClass("video-js")) {
                                        R.opt.nextSlideAtEnd = l.data('nextslideatend');
                                        if (!b.hasClass("HasListener")) {
                                            b.addClass("HasListener");
                                            var d = "videoid_" + Math.round(Math.random() * 1000 + 1);
                                            b.attr('id', d);
                                            videojs(d).ready(function () {
                                                R.html5VideoReady(this, d, R)
                                            })
                                        } else {
                                            d = b.attr('id')
                                        }
                                        b.find('.vjs-poster').css({
                                            display: "block"
                                        });
                                        if (l.data('autoplay')) {
                                            var f = $('body').find('#' + R.opt.container.attr('id')).find('.timer');
                                            setTimeout(function () {
                                                f.stop();
                                                R.opt.videoPlaying = true
                                            }, 200);
                                            videojs(d).ready(function () {
                                                var a = this;
                                                try {
                                                    if (l.data("forcerewind")) {
                                                        a.currentTime(0)
                                                    }
                                                } catch (e) { }
                                                b.data('timerplay', setTimeout(function () {
                                                    if (l.data('forcerewind')) {
                                                        a.currentTime(0)
                                                    }
                                                    if (b.closest('.caption').data('volume') == "mute") {
                                                        a.volume(0)
                                                    }
                                                    setTimeout(function () {
                                                        a.play(0);
                                                        b.find('.vjs-poster').css({
                                                            display: "none"
                                                        })
                                                    }, 50)
                                                }, 10 + l.data('start')))
                                            })
                                        }
                                        if (b.data('ww') == ba) b.data('ww', b.width());
                                        if (b.data('hh') == ba) b.data('hh', b.height());
                                        videojs(d).ready(function () {
                                            if (!l.hasClass("fullscreenvideo")) {
                                                var a = videojs(d);
                                                try {
                                                    a.width(b.data('ww') * R.opt.bw);
                                                    a.height(b.data('hh') * R.opt.bh)
                                                } catch (e) { }
                                            }
                                        });
                                        if (b.closest('.caption').data('forcecover')) {
                                            R.updateHTML5Size(b, R.opt.container);
                                            b.addClass("fullcoveredvideo")
                                        }
                                    }
                                })
                            }
                            if (l.find('iframe').length > 0 || l.find('video').length > 0) {
                                if (l.data('autoplayonlyfirsttime')) {
                                    l.data('autoplay', false);
                                    l.data('autoplayonlyfirsttime', false)
                                }
                            }
                            if (l.hasClass("randomrotate") && (R.opt.ie || R.opt.ie9)) l.removeClass("randomrotate").addClass("sfb");
                            l.removeClass('noFilterClass');
                            var p = 0;
                            var q = 0;
                            if (l.find('img').length > 0) {
                                var r = l.find('img');
                                if (r.data('ww') == ba) r.data('ww', r.width());
                                if (r.data('hh') == ba) r.data('hh', r.height());
                                var s = r.data('ww');
                                var t = r.data('hh');
                                r.width(s * R.opt.bw);
                                r.height(t * R.opt.bh);
                                p = r.width();
                                q = r.height()
                            } else {
                                if (l.find('iframe').length > 0) {
                                    var r = l.find('iframe');
                                    r.css({
                                        display: "block"
                                    });
                                    if (l.data('ww') == ba) {
                                        l.data('ww', r.width())
                                    }
                                    if (l.data('hh') == ba) l.data('hh', r.height());
                                    var s = l.data('ww');
                                    var t = l.data('hh');
                                    var u = l;
                                    if (u.data('fsize') == ba) u.data('fsize', parseInt(u.css('font-size'), 0) || 0);
                                    if (u.data('pt') == ba) u.data('pt', parseInt(u.css('paddingTop'), 0) || 0);
                                    if (u.data('pb') == ba) u.data('pb', parseInt(u.css('paddingBottom'), 0) || 0);
                                    if (u.data('pl') == ba) u.data('pl', parseInt(u.css('paddingLeft'), 0) || 0);
                                    if (u.data('pr') == ba) u.data('pr', parseInt(u.css('paddingRight'), 0) || 0);
                                    if (u.data('mt') == ba) u.data('mt', parseInt(u.css('marginTop'), 0) || 0);
                                    if (u.data('mb') == ba) u.data('mb', parseInt(u.css('marginBottom'), 0) || 0);
                                    if (u.data('ml') == ba) u.data('ml', parseInt(u.css('marginLeft'), 0) || 0);
                                    if (u.data('mr') == ba) u.data('mr', parseInt(u.css('marginRight'), 0) || 0);
                                    if (u.data('bt') == ba) u.data('bt', parseInt(u.css('borderTopWidth'), 0) || 0);
                                    if (u.data('bb') == ba) u.data('bb', parseInt(u.css('borderBottomWidth'), 0) || 0);
                                    if (u.data('bl') == ba) u.data('bl', parseInt(u.css('borderLeftWidth'), 0) || 0);
                                    if (u.data('br') == ba) u.data('br', parseInt(u.css('borderRightWidth'), 0) || 0);
                                    if (u.data('lh') == ba) u.data('lh', parseInt(u.css('lineHeight'), 0) || 0);
                                    var v = R.opt.width;
                                    var x = R.opt.height;
                                    if (v > R.opt.startWidth) v = R.opt.startWidth;
                                    if (x > R.opt.startHeight) x = R.opt.startHeight;
                                    if (!l.hasClass('fullscreenvideo')) {
                                        l.css({
                                            'font-size': (u.data('fsize') * R.opt.bw) + "px",
                                            'padding-top': (u.data('pt') * R.opt.bh) + "px",
                                            'padding-bottom': (u.data('pb') * R.opt.bh) + "px",
                                            'padding-left': (u.data('pl') * R.opt.bw) + "px",
                                            'padding-right': (u.data('pr') * R.opt.bw) + "px",
                                            'margin-top': (u.data('mt') * R.opt.bh) + "px",
                                            'margin-bottom': (u.data('mb') * R.opt.bh) + "px",
                                            'margin-left': (u.data('ml') * R.opt.bw) + "px",
                                            'margin-right': (u.data('mr') * R.opt.bw) + "px",
                                            'border-top-width': (u.data('bt') * R.opt.bh) + "px",
                                            'border-bottom-width': (u.data('bb') * R.opt.bh) + "px",
                                            'border-left-width': (u.data('bl') * R.opt.bw) + "px",
                                            'border-right-width': (u.data('br') * R.opt.bw) + "px",
                                            'line-height': (u.data('lh') * R.opt.bh) + "px",
                                            'height': (t * R.opt.bh) + 'px',
                                            'white-space': "nowrap"
                                        })
                                    } else {
                                        l.css({
                                            'width': R.opt.startWidth * R.opt.bw,
                                            'height': R.opt.startHeight * R.opt.bh
                                        })
                                    }
                                    r.width(s * R.opt.bw);
                                    r.height(t * R.opt.bh);
                                    p = r.width();
                                    q = r.height()
                                } else {
                                    l.find('.resizeme, .resizeme *').each(function () {
                                        R.calcCaptionResponsive($(this))
                                    });
                                    if (l.hasClass("resizeme")) {
                                        l.find('*').each(function () {
                                            R.calcCaptionResponsive($(this))
                                        })
                                    }
                                    R.calcCaptionResponsive(l);
                                    q = l.outerHeight(true);
                                    p = l.outerWidth(true);
                                    var y = l.outerHeight();
                                    var z = l.css('backgroundColor');
                                    l.find('.frontcorner').css({
                                        'borderWidth': y + "px",
                                        'left': (0 - y) + 'px',
                                        'borderRight': '0px solid transparent',
                                        'borderTopColor': z
                                    });
                                    l.find('.frontcornertop').css({
                                        'borderWidth': y + "px",
                                        'left': (0 - y) + 'px',
                                        'borderRight': '0px solid transparent',
                                        'borderBottomColor': z
                                    });
                                    l.find('.backcorner').css({
                                        'borderWidth': y + "px",
                                        'right': (0 - y) + 'px',
                                        'borderLeft': '0px solid transparent',
                                        'borderBottomColor': z
                                    });
                                    l.find('.backcornertop').css({
                                        'borderWidth': y + "px",
                                        'right': (0 - y) + 'px',
                                        'borderLeft': '0px solid transparent',
                                        'borderTopColor': z
                                    })
                                }
                            }
                            var A = l.data("video");
                            if (A != ba) {
                                var w = R.opt.startWidth * R.opt.bw;
                                var h = R.opt.startHeight * R.opt.bh;
                                l.html("").width(w).height(h);
                                var B = $('<div class="video-frame"></div>');
                                l.append(B);
                                var C = $('<div class="video-play"></div>');
                                l.append(C);
                                C.bind("click", function () {
                                    R.opt.videoPlaying = true;
                                    R.opt.videoStarted = true;
                                    R.cap.find('.play-btn').click();
                                    if (R.opt.showTimer) {
                                        R.timer.hide()
                                    }
                                    B.html('<iframe frameborder="0" width="' + w + '" height="' + h + '" src="' + A + '" /><div class="video-close"></div>');
                                    var a = B.find(".video-close");
                                    a.bind("click", function () {
                                        R.opt.videoPlaying = false;
                                        R.opt.videoStopped = true;
                                        B.html("");
                                        R.cap.find('.play-btn').click();
                                        if (R.opt.showTimer) {
                                            R.timer.show()
                                        }
                                    })
                                })
                            }
                            if (l.data('voffset') == ba) l.data('voffset', 0);
                            if (l.data('hoffset') == ba) l.data('hoffset', 0);
                            var D = l.data('voffset') * j;
                            var E = l.data('hoffset') * j;
                            var F = R.opt.startWidth * j;
                            var G = R.opt.startHeight * j;
                            if (l.data('x') == 'center' || l.data('xcenter') == 'center') {
                                l.data('xcenter', 'center');
                                l.data('x', ((F - l.outerWidth(true)) / 2) / j + E)
                            }
                            if (l.data('x') == 'left' || l.data('xleft') == 'left') {
                                l.data('xleft', 'left');
                                l.data('x', (0) / j + E)
                            }
                            if (l.data('x') == "right" || l.data('xright') == 'right') {
                                l.data('xright', 'right');
                                l.data('x', (F - l.outerWidth(true) + E) / j)
                            }
                            if (l.data('y') == "center" || l.data('ycenter') == 'center') {
                                l.data('ycenter', 'center');
                                l.data('y', ((G - l.outerHeight(true)) / 2) / R.opt.bh + D)
                            }
                            if (l.data('y') == "top" || l.data('ytop') == 'top') {
                                l.data('ytop', 'top');
                                l.data('y', D)
                            }
                            if (l.data('y') == "bottom" || l.data('ybottom') == 'bottom') {
                                l.data('ybottom', 'bottom');
                                l.data('y', ((G - l.outerHeight(true)) + D) / j)
                            }
                            var H = 0;
                            var I = 0;
                            var J = 0;
                            var K = 0;
                            if (!l.hasClass('fullscreenvideo')) {
                                H = j * l.data('x') + S;
                                I = R.opt.bh * l.data('y') + T
                            }
                            if (l.hasClass('fade')) {
                                l.css({
                                    'opacity': 0,
                                    'left': H + 'px',
                                    'top': I + "px"
                                })
                            }
                            if (l.hasClass("randomrotate")) {
                                l.css({
                                    'opacity': 0,
                                    'left': H + 'px',
                                    'top': (k * l.data('y') + T) + 'px'
                                });
                                var L = Math.random() * 2 + 1;
                                var M = Math.round(Math.random() * 200 - 100);
                                var N = Math.round(Math.random() * 200 - 100);
                                var O = Math.round(Math.random() * 200 - 100);
                                l.data('repx', N);
                                l.data('repy', O);
                                l.data('repo', l.css('opacity'));
                                l.data('rotate', M);
                                l.data('scale', L);
                                l.transition({
                                    scale: L,
                                    rotate: M,
                                    x: N,
                                    y: O,
                                    duration: '0ms'
                                })
                            } else {
                                if (R.opt.ie || R.opt.ie9) { } else {
                                    l.transition({
                                        scale: 1,
                                        rotate: 0
                                    })
                                }
                            }
                            var P = l.data('opacity');
                            if (P == ba) P = 1;
                            if (l.hasClass('sfb')) {
                                l.css({
                                    'opacity': 0,
                                    'left': H + 'px',
                                    'top': (I + 50) + 'px'
                                })
                            }
                            if (l.hasClass('sfl')) {
                                l.css({
                                    'opacity': 0,
                                    'left': (H - 50) + 'px',
                                    'top': I + 'px'
                                })
                            }
                            if (l.hasClass('sfr')) {
                                l.css({
                                    'opacity': 0,
                                    'left': (H + 50) + 'px',
                                    'top': I + 'px'
                                })
                            }
                            if (l.hasClass('sft')) {
                                l.css({
                                    'opacity': 0,
                                    'left': H + 'px',
                                    'top': (I - 50) + 'px'
                                })
                            }
                            if (l.hasClass('lfb')) {
                                l.css({
                                    'opacity': P,
                                    'left': H + 'px',
                                    'top': (25 + R.opt.height) + 'px'
                                })
                            }
                            if (l.hasClass('lfl')) {
                                l.css({
                                    'opacity': P,
                                    'left': (-15 - p) + 'px',
                                    'top': I + 'px'
                                })
                            }
                            if (l.hasClass('lfr')) {
                                l.css({
                                    'opacity': P,
                                    'left': (15 + R.opt.width) + 'px',
                                    'top': I + 'px'
                                })
                            }
                            if (l.hasClass('lft')) {
                                l.css({
                                    'opacity': P,
                                    'left': H + 'px',
                                    'top': (-25 - q) + 'px'
                                })
                            }
                            if (l.hasClass('skewfromleft')) {
                                J = 85;
                                l.css({
                                    'opacity': 0,
                                    'left': (-15 - p) + 'px',
                                    'top': I + 'px'
                                });
                                l.transition({
                                    skewX: J,
                                    duration: '0ms'
                                })
                            }
                            if (l.hasClass('skewfromright')) {
                                J = -85;
                                l.css({
                                    'opacity': 0,
                                    'left': (15 + R.opt.width) + 'px',
                                    'top': I + 'px'
                                });
                                l.transition({
                                    skewX: J,
                                    duration: '0ms'
                                })
                            }
                            if (l.hasClass('skewfromleftshort')) {
                                J = 85;
                                l.css({
                                    'opacity': 0,
                                    'left': (H - 50) + 'px',
                                    'top': I + 'px'
                                });
                                l.transition({
                                    skewX: J,
                                    duration: '0ms'
                                })
                            }
                            if (l.hasClass('skewfromrightshort')) {
                                J = -85;
                                l.css({
                                    'opacity': 0,
                                    'left': (H + 50) + 'px',
                                    'top': I + 'px'
                                });
                                l.transition({
                                    skewX: J,
                                    duration: '0ms'
                                })
                            }
                            if (l.hasClass('customin')) {
                                K = 90;
                                l.css({
                                    'opacity': 0
                                });
                                l.transition({
                                    origin: '50% 0%',
                                    perspective: 200,
                                    rotateX: K,
                                    duration: '0ms'
                                })
                            }
                            l.data('repskewx', J);
                            l.data('reprox', K);
                            l.data('timer', setTimeout(function () {
                                l.css({
                                    'visibility': 'visible'
                                });
                                if (l.hasClass('fade')) {
                                    l.data('repo', l.css('opacity'));
                                    l.animate({
                                        'opacity': 1
                                    }, {
                                        duration: l.data('speed')
                                    });
                                    if (R.opt.ie) l.addClass('noFilterClass')
                                }
                                if (l.hasClass("randomrotate")) {
                                    var a = (!l.hasClass('fullscreenvideo')) ? (k * (l.data('y')) + T) : 0;
                                    l.transition({
                                        opacity: 1,
                                        scale: 1,
                                        'left': H + 'px',
                                        'top': a + "px",
                                        rotate: 0,
                                        x: 0,
                                        y: 0,
                                        duration: l.data('speed')
                                    });
                                    if (R.opt.ie) l.addClass('noFilterClass')
                                }
                                if (l.hasClass('lfr') || l.hasClass('lfl') || l.hasClass('lft') || l.hasClass('lfb') || l.hasClass('sfr') || l.hasClass('sfl') || l.hasClass('sft') || l.hasClass('sfb') || l.hasClass('skewfromleft') || l.hasClass('skewfromright') || l.hasClass('skewfromleftshort') || l.hasClass('skewfromrightshort') || l.hasClass('customin')) {
                                    var b = l.data('opacity');
                                    var c = l.data('speed');
                                    var d = l.data('easing');
                                    if (b == ba) b = 1;
                                    if (d == ba) d = R.opt.captionEasing;
                                    l.data('repx', l.position().left);
                                    l.data('repy', l.position().top);
                                    l.data('repo', l.css('opacity'));
                                    l.transition({
                                        opacity: b,
                                        scale: 1,
                                        left: H + 'px',
                                        top: I + 'px',
                                        rotate: 0,
                                        x: 0,
                                        y: 0,
                                        skewX: 0,
                                        rotateX: 0,
                                        rotateY: 0,
                                        duration: c,
                                        easing: d
                                    });
                                    if (R.opt.ie) l.addClass('noFilterClass')
                                }
                            }, l.data('start')));
                            if (l.data('end') != ba) {
                                l.data('timer-end', setTimeout(function () {
                                    if ((R.opt.ie || R.opt.ie9) && (l.hasClass("randomrotate") || l.hasClass("randomrotateout"))) {
                                        l.removeClass("randomrotate").removeClass("randomrotateout").addClass('fadeout')
                                    }
                                    R.endMoveCaption(l)
                                }, l.data('end')))
                            }
                        }
                    })
                },
                calcCaptionResponsive: function (a) {
                    if (a.data('fsize') == ba) a.data('fsize', parseInt(a.css('font-size'), 0) || 0);
                    if (a.data('pt') == ba) a.data('pt', parseInt(a.css('paddingTop'), 0) || 0);
                    if (a.data('pb') == ba) a.data('pb', parseInt(a.css('paddingBottom'), 0) || 0);
                    if (a.data('pl') == ba) a.data('pl', parseInt(a.css('paddingLeft'), 0) || 0);
                    if (a.data('pr') == ba) a.data('pr', parseInt(a.css('paddingRight'), 0) || 0);
                    if (a.data('mt') == ba) a.data('mt', parseInt(a.css('marginTop'), 0) || 0);
                    if (a.data('mb') == ba) a.data('mb', parseInt(a.css('marginBottom'), 0) || 0);
                    if (a.data('ml') == ba) a.data('ml', parseInt(a.css('marginLeft'), 0) || 0);
                    if (a.data('mr') == ba) a.data('mr', parseInt(a.css('marginRight'), 0) || 0);
                    if (a.data('bt') == ba) a.data('bt', parseInt(a.css('borderTopWidth'), 0) || 0);
                    if (a.data('bb') == ba) a.data('bb', parseInt(a.css('borderBottomWidth'), 0) || 0);
                    if (a.data('bl') == ba) a.data('bl', parseInt(a.css('borderLeftWidth'), 0) || 0);
                    if (a.data('br') == ba) a.data('br', parseInt(a.css('borderRightWidth'), 0) || 0);
                    if (a.data('lh') == ba) a.data('lh', parseInt(a.css('lineHeight'), 0) || 0);
                    if (a.data('minwidth') == ba) a.data('minwidth', parseInt(a.css('minWidth'), 0) || 0);
                    if (a.data('minheight') == ba) a.data('minheight', parseInt(a.css('minHeight'), 0) || 0);
                    if (a.data('maxwidth') == ba) a.data('maxwidth', parseInt(a.css('maxWidth'), 0) || "none");
                    if (a.data('maxheight') == ba) a.data('maxheight', parseInt(a.css('maxHeight'), 0) || "none");
                    a.css({
                        'font-size': Math.round((a.data('fsize') * this.opt.bw)) + "px",
                        'padding-top': Math.round((a.data('pt') * this.opt.bh)) + "px",
                        'padding-bottom': Math.round((a.data('pb') * this.opt.bh)) + "px",
                        'padding-left': Math.round((a.data('pl') * this.opt.bw)) + "px",
                        'padding-right': Math.round((a.data('pr') * this.opt.bw)) + "px",
                        'margin-top': (a.data('mt') * this.opt.bh) + "px",
                        'margin-bottom': (a.data('mb') * this.opt.bh) + "px",
                        'margin-left': (a.data('ml') * this.opt.bw) + "px",
                        'margin-right': (a.data('mr') * this.opt.bw) + "px",
                        'borderTopWidth': Math.round((a.data('bt') * this.opt.bh)) + "px",
                        'borderBottomWidth': Math.round((a.data('bb') * this.opt.bh)) + "px",
                        'borderLeftWidth': Math.round((a.data('bl') * this.opt.bw)) + "px",
                        'borderRightWidth': Math.round((a.data('br') * this.opt.bw)) + "px",
                        'line-height': Math.round((a.data('lh') * this.opt.bh)) + "px",
                        'white-space': "nowrap",
                        'minWidth': (a.data('minwidth') * this.opt.bw) + "px",
                        'minHeight': (a.data('minheight') * this.opt.bh) + "px",
                    });
                    if (a.data('maxheight') != 'none') {
                        a.css({
                            'maxHeight': (a.data('maxheight') * this.opt.bh) + "px"
                        })
                    }
                    if (a.data('maxwidth') != 'none') {
                        a.css({
                            'maxWidth': (a.data('maxwidth') * this.opt.bw) + "px"
                        })
                    }
                },
                removeCaption: function (k) {
                    var l = this;
                    k.find('.caption').each(function (i) {
                        var d = k.find('.caption:eq(' + i + ')');
                        d.stop(true, true);
                        clearTimeout(d.data('timer'));
                        clearTimeout(d.data('timer-end'));
                        if (d.find('iframe').length > 0) {
                            try {
                                var f = d.find('iframe');
                                var g = f.attr('id');
                                var h = $f(g);
                                h.api("pause")
                            } catch (e) { }
                            try {
                                var j = d.data('player');
                                j.stopVideo()
                            } catch (e) { }
                        }
                        if (d.find('video').length > 0) {
                            try {
                                d.find('video').each(function (i) {
                                    var b = $(this).parent();
                                    var c = b.attr('id');
                                    clearTimeout(b.data('timerplay'));
                                    videojs(c).ready(function () {
                                        var a = this;
                                        a.pause()
                                    })
                                })
                            } catch (e) { }
                        }
                        try {
                            l.endMoveCaption(d)
                        } catch (e) { }
                    })
                },
                endMoveCaption: function (a) {
                    if (a.hasClass("randomrotate") && (this.opt.ie || this.opt.ie9)) a.removeClass("randomrotate").addClass("sfb");
                    if (a.hasClass("randomrotateout") && (this.opt.ie || this.opt.ie9)) a.removeClass("randomrotateout").addClass("stb");
                    var b = a.data('endspeed');
                    if (b == ba) b = a.data('speed');
                    var c = a.data('endeasing');
                    if (c == ba) c = "linear";
                    var d = a.data('repx');
                    var e = a.data('repy');
                    var f = a.data('repo');
                    var g = a.data('repskewx');
                    var h = a.data('reprox');
                    if (g == ba) g = 0;
                    if (h == ba) h = 0;
                    if (this.opt.ie) {
                        a.css({
                            'opacity': 'inherit',
                            'filter': 'inherit'
                        })
                    }
                    if (a.hasClass('ltr') || a.hasClass('ltl') || a.hasClass('ltt') || a.hasClass('ltb') || a.hasClass('str') || a.hasClass('stl') || a.hasClass('stt') || a.hasClass('stb') || a.hasClass('skewtoleft') || a.hasClass('skewtoright') || a.hasClass('skewtoleftshort') || a.hasClass('skewtorightshort')) {
                        d = a.position().left;
                        e = a.position().top;
                        g = 0;
                        if (a.hasClass('ltr') || a.hasClass('skewtoright')) d = this.opt.width + 60;
                        else if (a.hasClass('ltl') || a.hasClass('skewtoleft')) d = -a.width() - 60;
                        else if (a.hasClass('ltt')) e = -a.height() - 60;
                        else if (a.hasClass('ltb')) e = this.opt.height + 60;
                        else if (a.hasClass('str') || a.hasClass('skewtorightshort')) {
                            d += 50;
                            f = 0
                        } else if (a.hasClass('stl') || a.hasClass('skewtoleftshort')) {
                            d -= 50;
                            f = 0
                        } else if (a.hasClass('stt')) {
                            e -= 50;
                            f = 0
                        } else if (a.hasClass('stb')) {
                            e += 50;
                            f = 0
                        }
                        if (a.hasClass('skewtoright') || a.hasClass('skewtorightshort')) {
                            g = 35
                        }
                        if (a.hasClass('skewtoleft') || a.hasClass('skewtoleftshort')) {
                            g = -35
                        }
                        a.transition({
                            'opacity': f,
                            'left': d + 'px',
                            'top': e + "px",
                            skewX: g,
                            duration: a.data('endspeed'),
                            easing: c,
                            complete: function () {
                                if (c.indexOf("Bounce") >= 0 || c.indexOf("Elastic") >= 0) {
                                    $(this).css({
                                        visibility: 'hidden'
                                    })
                                }
                            }
                        });
                        if (this.opt.ie) a.removeClass('noFilterClass')
                    } else if (a.hasClass("randomrotateout")) {
                        a.transition({
                            opacity: 0,
                            scale: Math.random() * 2 + 0.3,
                            'left': Math.random() * this.opt.width + 'px',
                            'top': Math.random() * this.opt.height + "px",
                            rotate: Math.random() * 40,
                            duration: b,
                            easing: c,
                            complete: function () {
                                $(this).css({
                                    visibility: 'hidden'
                                })
                            }
                        });
                        if (this.opt.ie) a.removeClass('noFilterClass')
                    } else if (a.hasClass('fadeout')) {
                        if (this.opt.ie) a.removeClass('noFilterClass');
                        a.transition({
                            'opacity': 0,
                            duration: 200
                        })
                    } else if (a.hasClass('customout')) {
                        a.transition({
                            'opacity': f,
                            scale: 0.75,
                            origin: '50% 50%',
                            perspective: 600,
                            rotateX: 0,
                            duration: a.data('endspeed'),
                            easing: c,
                            complete: function () {
                                if (c.indexOf("Bounce") >= 0 || c.indexOf("Elastic") >= 0) {
                                    $(this).css({
                                        visibility: 'hidden'
                                    })
                                }
                            }
                        });
                        if (this.opt.ie) a.removeClass('noFilterClass')
                    } else {
                        if (a.hasClass('lfr') || a.hasClass('lfl') || a.hasClass('lft') || a.hasClass('lfb') || a.hasClass('sfr') || a.hasClass('sfl') || a.hasClass('sft') || a.hasClass('sfb') || a.hasClass('skewfromleft') || a.hasClass('skewfromright') || a.hasClass('skewfromleftshort') || a.hasClass('skewfromrightshort')) {
                            if (a.hasClass('lfr')) d = this.opt.width + 60;
                            else if (a.hasClass('lfl')) d = -a.width() - 60;
                            else if (a.hasClass('lft')) e = -a.height() - 60;
                            else if (a.hasClass('lfb')) e = this.opt.height + 60;
                            a.transition({
                                'opacity': f,
                                'left': d + 'px',
                                'top': e + "px",
                                skewX: g,
                                duration: a.data('endspeed'),
                                easing: c,
                                complete: function () {
                                    if (c.indexOf("Bounce") >= 0 || c.indexOf("Elastic") >= 0) {
                                        $(this).css({
                                            visibility: 'hidden'
                                        })
                                    }
                                }
                            })
                        } else if (a.hasClass('customin')) {
                            a.transition({
                                'opacity': f,
                                origin: '50% 0%',
                                perspective: 200,
                                rotateX: h,
                                duration: a.data('endspeed'),
                                easing: c,
                                complete: function () {
                                    if (c.indexOf("Bounce") >= 0 || c.indexOf("Elastic") >= 0) {
                                        $(this).css({
                                            visibility: 'hidden'
                                        })
                                    }
                                }
                            })
                        } else if (a.hasClass('fade')) {
                            a.transition({
                                'opacity': 0,
                                duration: b
                            })
                        } else if (a.hasClass("randomrotate")) {
                            a.transition({
                                opacity: 0,
                                scale: Math.random() * 2 + 0.3,
                                'left': Math.random() * this.opt.width + 'px',
                                'top': Math.random() * this.opt.height + "px",
                                rotate: Math.random() * 40,
                                duration: b,
                                easing: c
                            })
                        }
                        if (this.opt.ie) a.removeClass('noFilterClass')
                    }
                }
            };
            var Z = $(this);
            Z.addClass("banner-slider");
            Z.css({
                visibility: "visible"
            });
            return this.each(function () {
                objRotator = new youSlider($(this), U)
            })
        },
        brPause: function (b) {
            return this.each(function () {
                var a = $(this);
                a.data('play', false);
                a.trigger('banner_rotator.onpause');
                a.parent().find('.play-btn').click()
            })
        },
        brResume: function (b) {
            return this.each(function () {
                var a = $(this);
                a.data('play', true);
                a.trigger('banner_rotator.onresume');
                a.parent().find('.play-btn').click()
            })
        },
        brPrev: function (b) {
            return this.each(function () {
                var a = $(this);
                a.parent().find('.previous-btn').click()
            })
        },
        brNext: function (b) {
            return this.each(function () {
                var a = $(this);
                a.parent().find('.next-btn').click()
            })
        },
        brMaxSlide: function (a) {
            return $(this).find('>ul:first-child >li').length
        },
        brShowSlide: function (b) {
            return this.each(function () {
                var a = $(this);
                a.data('showslide', b);
                a.parent().find('.next-btn').click()
            })
        },
        brCurrentSlide: function () {
            var a = $(this);
            var b = a.data('opt');
            return b.currentItem
        },
        brLastSlide: function () {
            var a = $(this);
            var b = a.data('opt');
            return b.oldItem
        },
        brScroll: function (b) {
            return this.each(function () {
                var a = $(this);
                $('body,html').animate({
                    scrollTop: (a.offset().top + (a.find('>ul >li').height()) - b) + "px"
                }, {
                    duration: 400
                })
            })
        }
    });
    var bb = 'deg';
    $.fn.rotate = function (a) {
        var b = $(this).css('transform') || 'none';
        if (typeof a == 'undefined') {
            if (b) {
                var m = b.match(/rotate\(([^)]+)\)/);
                if (m && m[1]) {
                    return m[1]
                }
            }
            return 0
        }
        var m = a.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
        if (m) {
            if (m[3]) bb = m[3];
            $(this).css('transform', b.replace(/none|rotate\([^)]*\)/, '') + 'rotate(' + m[1] + bb + ')')
        }
        return this
    };
    $.fx.step.rotate = function (a) {
        $(a.elem).rotate(a.now + bb)
    }
})(jQuery);