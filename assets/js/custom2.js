(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};!function(b,c){var d,e,f,g;return e=function(){function c(c){this.element=c,this._clickEvent=a(this._clickEvent,this),this.element=b(this.element),this.nav=this.element.closest(".nav"),this.dropdown=this.element.parent().find(".dropdown-menu"),this.element.on("click",this._clickEvent),this.nav.closest(".navbar-offcanvas").on("click",function(a){return function(){if(a.dropdown.is(".shown"))return a.dropdown.removeClass("shown").closest(".active").removeClass("active")}}(this))}return c.prototype._clickEvent=function(a){return this.dropdown.hasClass("shown")||a.preventDefault(),a.stopPropagation(),b(".dropdown-toggle").not(this.element).closest(".active").removeClass("active").find(".dropdown-menu").removeClass("shown"),this.dropdown.toggleClass("shown"),this.element.parent().toggleClass("active")},c}(),f=function(){function d(c,d,e,f){this.button=c,this.element=d,this.location=e,this.offcanvas=f,this._getFade=a(this._getFade,this),this._getCss=a(this._getCss,this),this._touchEnd=a(this._touchEnd,this),this._touchMove=a(this._touchMove,this),this._touchStart=a(this._touchStart,this),this.endThreshold=130,this.startThreshold=this.element.hasClass("navbar-offcanvas-right")?b("body").outerWidth()-60:20,this.maxStartThreshold=this.element.hasClass("navbar-offcanvas-right")?b("body").outerWidth()-20:60,this.currentX=0,this.fade=!!this.element.hasClass("navbar-offcanvas-fade"),b(document).on("touchstart",this._touchStart),b(document).on("touchmove",this._touchMove),b(document).on("touchend",this._touchEnd)}return d.prototype._touchStart=function(a){if(this.startX=a.originalEvent.touches[0].pageX,this.element.is(".in"))return this.element.height(b(c).outerHeight())},d.prototype._touchMove=function(a){var c;if(b(a.target).parents(".navbar-offcanvas").length>0)return!0;if(this.startX>this.startThreshold&&this.startX<this.maxStartThreshold){if(a.preventDefault(),c=a.originalEvent.touches[0].pageX-this.startX,c=this.element.hasClass("navbar-offcanvas-right")?-c:c,Math.abs(c)<this.element.outerWidth())return this.element.css(this._getCss(c)),this.element.css(this._getFade(c))}else if(this.element.hasClass("in")&&(a.preventDefault(),c=a.originalEvent.touches[0].pageX+(this.currentX-this.startX),c=this.element.hasClass("navbar-offcanvas-right")?-c:c,Math.abs(c)<this.element.outerWidth()))return this.element.css(this._getCss(c)),this.element.css(this._getFade(c))},d.prototype._touchEnd=function(a){var c,d,e;return b(a.target).parents(".navbar-offcanvas").length>0||(d=!1,e=a.originalEvent.changedTouches[0].pageX,Math.abs(e)!==this.startX?(c=this.element.hasClass("navbar-offcanvas-right")?Math.abs(e)>this.endThreshold+50:e<this.endThreshold+50,this.element.hasClass("in")&&c?(this.currentX=0,this.element.removeClass("in").css(this._clearCss()),this.button.removeClass("is-open"),d=!0):Math.abs(e-this.startX)>this.endThreshold&&this.startX>this.startThreshold&&this.startX<this.maxStartThreshold?(this.currentX=this.element.hasClass("navbar-offcanvas-right")?-this.element.outerWidth():this.element.outerWidth(),this.element.toggleClass("in").css(this._clearCss()),this.button.toggleClass("is-open"),d=!0):this.element.css(this._clearCss()),this.offcanvas.bodyOverflow(d)):void 0)},d.prototype._getCss=function(a){return a=this.element.hasClass("navbar-offcanvas-right")?-a:a,{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-webkit-transition-duration":"0s","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transition":"0s","-o-transform":"translate3d("+a+"px, 0px, 0px)","-o-transition":"0s",transform:"translate3d("+a+"px, 0px, 0px)",transition:"0s"}},d.prototype._getFade=function(a){return this.fade?{opacity:a/this.element.outerWidth()}:{}},d.prototype._clearCss=function(){return{"-webkit-transform":"","-webkit-transition-duration":"","-moz-transform":"","-moz-transition":"","-o-transform":"","-o-transition":"",transform:"",transition:"",opacity:""}},d}(),c.Offcanvas=d=function(){function d(c){var d,g;this.element=c,this.bodyOverflow=a(this.bodyOverflow,this),this._sendEventsAfter=a(this._sendEventsAfter,this),this._sendEventsBefore=a(this._sendEventsBefore,this),this._documentClicked=a(this._documentClicked,this),this._close=a(this._close,this),this._open=a(this._open,this),this._clicked=a(this._clicked,this),this._navbarHeight=a(this._navbarHeight,this),g=!!this.element.attr("data-target")&&this.element.attr("data-target"),g?(this.target=b(g),this.target.length&&!this.target.hasClass("js-offcanvas-done")&&(this.element.addClass("js-offcanvas-has-events"),this.location=this.target.hasClass("navbar-offcanvas-right")?"right":"left",this.target.addClass(transform?"offcanvas-transform js-offcanvas-done":"offcanvas-position js-offcanvas-done"),this.target.data("offcanvas",this),this.element.on("click",this._clicked),this.target.on("transitionend",function(a){return function(){if(a.target.is(":not(.in)"))return a.target.height("")}}(this)),b(document).on("click",this._documentClicked),this.target.hasClass("navbar-offcanvas-touch")&&(d=new f(this.element,this.target,this.location,this)),this.target.find(".dropdown-toggle").each(function(){var a;return a=new e(this)}),this.target.on("offcanvas.toggle",function(a){return function(b){return a._clicked(b)}}(this)),this.target.on("offcanvas.close",function(a){return function(b){return a._close(b)}}(this)),this.target.on("offcanvas.open",function(a){return function(b){return a._open(b)}}(this)))):console.warn("Offcanvas: `data-target` attribute must be present.")}return d.prototype._navbarHeight=function(){if(this.target.is(".in"))return this.target.height(b(c).outerHeight())},d.prototype._clicked=function(a){return a.preventDefault(),this._sendEventsBefore(),b(".navbar-offcanvas").not(this.target).trigger("offcanvas.close"),this.target.toggleClass("in"),this.element.toggleClass("is-open"),this._navbarHeight(),this.bodyOverflow()},d.prototype._open=function(a){if(a.preventDefault(),!this.target.is(".in"))return this._sendEventsBefore(),this.target.addClass("in"),this.element.addClass("is-open"),this._navbarHeight(),this.bodyOverflow()},d.prototype._close=function(a){if(a.preventDefault(),!this.target.is(":not(.in)"))return this._sendEventsBefore(),this.target.removeClass("in"),this.element.removeClass("is-open"),this._navbarHeight(),this.bodyOverflow()},d.prototype._documentClicked=function(a){var c;if(c=b(a.target),!c.hasClass("offcanvas-toggle")&&0===c.parents(".offcanvas-toggle").length&&0===c.parents(".navbar-offcanvas").length&&!c.hasClass("navbar-offcanvas")&&this.target.hasClass("in"))return a.preventDefault(),this._sendEventsBefore(),this.target.removeClass("in"),this.element.removeClass("is-open"),this._navbarHeight(),this.bodyOverflow()},d.prototype._sendEventsBefore=function(){return this.target.hasClass("in")?this.target.trigger("hide.bs.offcanvas"):this.target.trigger("show.bs.offcanvas")},d.prototype._sendEventsAfter=function(){return this.target.hasClass("in")?this.target.trigger("shown.bs.offcanvas"):this.target.trigger("hidden.bs.offcanvas")},d.prototype.bodyOverflow=function(a){if(null==a&&(a=!0),this.target.is(".in")?b("body").addClass("offcanvas-stop-scrolling"):b("body").removeClass("offcanvas-stop-scrolling"),a)return this._sendEventsAfter()},d}(),g=function(a){return function(){var b,c,d,e;return c=document.createElement("div"),e="translate3d(0px, 0px, 0px)",d=/translate3d\(0px, 0px, 0px\)/g,c.style.cssText="-webkit-transform: "+e+"; -moz-transform: "+e+"; -o-transform: "+e+"; transform: "+e,b=c.style.cssText.match(d),a.transform=null!=b.length}}(this),b(function(){return g(),b('[data-toggle="offcanvas"]').each(function(){var a;return a=new d(b(this))}),b(c).on("resize",function(){return b(".navbar-offcanvas.in").each(function(){return b(this).height("").removeClass("in")}),b(".offcanvas-toggle").removeClass("is-open")}),b(".offcanvas-toggle").each(function(){return b(this).on("click",function(a){var c,d;if(!b(this).hasClass("js-offcanvas-has-events")&&(d=b(this).attr("data-target"),c=b(d)))return c.height(""),c.removeClass("in"),b("body").css({overflow:"",position:""})})})})}(window.jQuery,window)}).call(this);


$('.navbar-offcanvas li a').on('click', (e) => {
	$('.navbar-offcanvas.in').height('').removeClass('in')
	$('.offcanvas-toggle').removeClass('is-open')
})

/*
$('#videopopup').on('shown.bs.modal', function () {
  $('#videopop').focus()
}) 
*/
 
jQuery(document).ready(function($) { 
	$( ".last-menu-item a" ).click(function( event ) {
  		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("#footerForm").offset().top
		}, 1000);   
	}); 
});      


$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#fullname").val();
	var company = $("#company").val();
    var email = $("#email").val();
	var phone = $("#phone").val();
	var address = $("#address").val();
	var location = $("#location").val();
    var message = $("#message").val();  

    $.ajax({
        type: "POST",
        url: "mailer.php", 
 data: "name=" + name + "company=" + company + "&email=" + email + "phone=" + phone + "address=" + address + "location=" + location + "&message=" + message, 
        success : function(text){ 
            if (text == "success! Email has been sent!"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }  
    });
}
 
function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    // $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	$("#contactForm").addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass('shake animated');  
    });
}
 
function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}