$(document).ready(function () {  
    var b = $(banner).clone();
    var c = "random";
    var d = "";
    $(".selectnavstyle").change(function () {
        $(this).parent().find('.dropcontent').html(jQuery(this).find('option:selected').html());
        api.brPause();
        navstyle = $(this).val();       
        $("#hdnDefault").val("");
        createBanner();
        $(".fullscreenbanner").attr("style", "height:100%");
    });
    $(".selectbuttonalign").change(function () {
        $(this).parent().find('.dropcontent').html(jQuery(this).find('option:selected').html());
        d = $(this).val();
        $("#hdnDefault").val("");
        createBanner()
        $(".fullscreenbanner").attr("style", "height:100%");
    });
    $(".selecttransition").change(function () {
        $(this).parent().find(".dropcontent").html($(this).find('option:selected').html());
        c = $(this).val();
        $(banner + ' ul li').each(function () {
            var a = $(this);
            a.data("transition", c)
        });
        api.brNext()
    });

    function createBanner() {
        "use strict";
        $(banner).remove();
        $(".buttons").remove();
        $(".banner-slider-shadow").remove();
        $("#rotator-tooltip").remove();
        $(bannerContainer).append(b);
        b = $(banner).clone();
        if ($("#hdnDefault").val() === "customize") {
            var getcode = $(".code-section pre code");
            getcode.html("");
            var Randomize = $('#chkRandomize').is(':checked');
            var AutoPlay = $('#chkAutoPlay').is(':checked');
            var SelectHover = $('#chkSelectHover').is(':checked');
            var PauseHover = $('#chkPauseHover').is(':checked');
            var ShowTooltip = $('#chkTooltip').is(':checked');
            var LazyLoad = $('#chkLazyLoad').is(':checked');
            var PlayOnce = $('#chkPlayOnce').is(':checked');
            var ShowTimer = $('#chkShowTimer').is(':checked');
            var PlayPause = $('#chkPlayPause').is(':checked');
            var BtnOnHover = $('#chkBtnOnHover').is(':checked');
            var PrevNextArrow = $('#chkPrevNextArrow').is(':checked');
            var CenterPrevNextArrow = $('#chkCenterPrevNextArrow').is(':checked');
            var ScrollWheel = $('#chkScrollWheel').is(':checked');
            var TimerType = $(".timer-type input[type=radio]:checked").parent().find(".radio-custom-label").html();
            var TooltipType = $(".tooltip-type input[type=radio]:checked").parent().find(".radio-custom-label").html();
            var ShowThumb = $('#chkShowThumb').is(':checked');
            var ShowNumber = $('#chkShowNumber').is(':checked');
            var ShowButtons = $('#chkButtons').is(':checked');
            var TouchEnabled = $('#chkTouchEnabled').is(':checked');
            var TimerAlign = $(".timer-align input[type=radio]:checked").attr("data-value");
            var ThumbWidth = $('.thumb-width').val();
            var ThumbHeight = $('.thumb-height').val();
        
            api = $(banner).youSlider({
                showTooltip: ShowTooltip,
                hideCaptionAtResolution: 320,
                startWidth: 1140,
                startHeight: 500,
                showPreviousNextArrow: PrevNextArrow,
                showCenterPreviousNextArrow: CenterPrevNextArrow,
                randomize: Randomize,
                autoPlay: AutoPlay,
                showPlayPauseButton: PlayPause,
                showButtonOnHover: BtnOnHover,
                scrollMouseWheel: ScrollWheel,
                lazyLoad: LazyLoad,
                showTimer: ShowTimer,
                playOnce: PlayOnce,
                pauseOnHover: PauseHover,
                selectOnHover: SelectHover,
                timerType: TimerType,
                tooltipType: TooltipType,
                showThumb: ShowThumb,
                showNumber:ShowNumber,
                showButton:ShowButtons,
                touchEnabled:TouchEnabled,
                timerAlign:TimerAlign,
                thumbWidth:ThumbWidth,
                thumbHeight:ThumbHeight
                

            });
            getcode.append("$(banner).youSlider({<br/>showTooltip:" + ShowTooltip + ",<br/>" +
                "hideCaptionAtResolution:" + 320 + ",<br/>" + "startWidth:" + 1140 + ",<br/>" + "startHeight:" + 500 + ",<br/>" + "showPreviousNextArrow:" + PrevNextArrow + ",<br/>" +
                "showCenterPreviousNextArrow:" + CenterPrevNextArrow + ",<br/>" + "randomize:" + Randomize + ",<br/>" + "autoPlay:" + AutoPlay + ",<br/>" +
                "showPlayPauseButton:" + PlayPause + ",<br/>" + "showButtonOnHover:" + BtnOnHover + ",<br/>" + "scrollMouseWheel:" + ScrollWheel + ",<br/>" +
                "lazyLoad:" + LazyLoad + ",<br/>" + "showTimer:" + ShowTimer + ",<br/>" + "playOnce:" + PlayOnce + ",<br/>" + "pauseOnHover:" + PauseHover + ",<br/>" +
                "selectOnHover:" + SelectHover + ",<br/>" + "timerType:" + TimerType + ",<br/>" + "tooltipType:" + TooltipType + ",<br/>" + "showThumb:" + ShowThumb + ",<br/>" +
                "showNumber:" + ShowNumber + ",<br/>" +"showButton:" + ShowButtons + ",<br/>"+"touchEnabled:" + TouchEnabled + ",<br/>"+"timerAlign:" + TimerAlign + ",<br/>"+"thumbWidth:" + ThumbWidth + ",<br/>"+"thumbHeight:" + ThumbHeight + "<br/>",
                "})"
                );
        }
        else {

        switch (navstyle) {
            case "number":
                var a = d == "" ? "BR" : d;
                api = $(banner).youSlider({
                    startWidth: 1140,
                    startHeight: 500,
                    transition: c,
                    buttonAlign: a,
                    shadow: shadow
                });
                break;
            case "thumbnail":
                var a = d == "" ? "BR" : d;
                api = $(banner).youSlider({
                    startWidth: 1140,
                    startHeight: 500,
                    showPlayPauseButton: false,
                    buttonBorderRadius: 0,
                    buttonMargin: 0,
                    showThumb: true,
                    timerType: "line",
                    pauseOnHover: true,
                    transition: c,
                    buttonAlign: a,
                    shadow: shadow
                });
                break;
            case "bullet":
                var a = d == "" ? "BC" : d;
                api = $(banner).youSlider({
                    startWidth: 1140,
                    startHeight: 500,
                    showNumber: false,
                    showPlayPauseButton: false,
                    buttonAlign: "BC",
                    buttonWidth: 12,
                    buttonHeight: 12,
                    buttonMargin: 5,
                    buttonBorderRadius: 6,
                    timerType: "line",
                    timerAlign: "bottom",
                    transition: c,
                    buttonAlign: a,
                    shadow: shadow
                });
                break;
            case "outside":
                var a = d == "" ? "BL" : d;
                api = $(banner).youSlider({
                    startWidth: 1140,
                    startHeight: 500,
                    buttonPosition: "outside",
                    buttonOffsetHorizontal: -15,
                    buttonOffsetVertical: -50,
                    showPreviousNextArrow: true,
                    showCenterPreviousNextArrow: false,
                    tooltipType: "text",
                    transition: c,
                    buttonAlign: a,
                    shadow: shadow
                });
                break
        }
        }
    }
    var i = 1;
    $("#btn-Default").on('click', function (e) {
        i = 1;
        $("#hdnDefault").val("");
        createBanner();
        $(".code-section pre code").html("");
        $(".code-section").slideUp();
    });
    $("#btn-Confirm").on('click', function (e) {
        i = 1;
        $("#hdnDefault").val("customize");
        createBanner();

    });
  
    $(".btn-getcode").on('click', function (e) {
        i++;
        if (i % 2 == 0) {
            $(".code-section").slideDown();
        }
        else {
            $(".code-section").slideUp();

        }
        e.preventDefault();       
        $("html, body").animate({
            scrollTop: $(".code-section").offset().top
        }, "slow");
    });
});


function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

$(document).ready(function () {  
    $(".chk-single").change(function () {
        $(".chk-single").prop('checked', false);
        $(this).prop('checked', true);
    });
  
});