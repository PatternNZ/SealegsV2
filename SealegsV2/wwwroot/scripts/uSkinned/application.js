// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

$(document).ready(function() {

	// Notification
	var cookiePanel = $('.usn-notification'), cookieName = "USN_Notification";

	var notificationValue = getCookie(cookieName);
	if (notificationValue != null && notificationValue != "") {
		cookiePanel.addClass("closed");
		cookiePanel.removeClass("open");
	} else {
		cookiePanel.addClass("open");
		cookiePanel.removeClass("closed");
	}

	// Accept notification
	$('.accept-cookies').on('click', function (e) {
		e.preventDefault();
		setCookie(cookieName, 1, notificationExDays);
		cookiePanel.addClass("closed");
		cookiePanel.removeClass("open");
	});

	// Lazysizes
	$('img.lazyload').addClass('lazypreload');

	// Main Navigation
	$("nav.main ul li .expand-subpages").click(function (e) {
		e.preventDefault();
		$(this).parent().toggleClass("open-child").toggleClass("open-child_mobile");
		$(this).attr('aria-expanded', function (i, attr) {
			return attr == 'true' ? 'false' : 'true'
		});
        $(this).parent().siblings().removeClass("open-child").removeClass("open-child_mobile");
	});
	$("nav.main ul li:last a").on("blur", function (e) {
		e.preventDefault();
		$("nav.main ul li .expand-subpages").attr('aria-expanded', 'false');
        $("nav.main ul li").removeClass("open-child").removeClass("open-child_mobile");
	});
	$("nav.main ul li.has-child.active").addClass("open-child_mobile");
	$("html").click(function() {
		$("nav.main ul li.open-child").removeClass("open-child");
	});
	$("nav.main ul li .expand-subpages, header#site-header .expand-header").click(function(e) {
		e.stopPropagation();
	});

	// Expand Burger Navigation  
	$("header#site-header .expand-header").click(function() {
		$("header#site-header .expand-header").toggleClass('active');
		$("html").toggleClass('reveal-out');
		$("header#site-header .expand-header").attr('aria-expanded', function (i, attr) {
			return attr == 'true' ? 'false' : 'true'
		});
	});
	$("#site-content, footer#site-footer").click(function() {
		$("html").removeClass("reveal-out");
		$("header#site-header .expand-header").removeClass("active");
		$("header#site-header .expand-header").attr('aria-expanded', 'false');
	});
	$("#site-content, #site-content *, footer#site-footer, footer#site-footer *").focusin(function() {
		$("html").removeClass("reveal-out");
		$("header#site-header .expand-header").removeClass("active");
		$("header#site-header .expand-header").attr('aria-expanded', 'false');
	});

	// Expand Anchor Mobile Navigation  
	$(".component.usn_cmp_anchornavigation .expand-anchor").click(function() {
		$(".component.usn_cmp_anchornavigation .expand-anchor").toggleClass('anchor-active');
		$(".component.usn_cmp_anchornavigation nav").toggleClass('open-mobile');
		$(".component.usn_cmp_anchornavigation .expand-anchor").attr('aria-expanded', function (i, attr) {
			return attr == 'true' ? 'false' : 'true'
		});
	});

	// Expand header search 
	$("header#site-header .site-search .expand-search").click(function() {
		$("header#site-header .site-search").toggleClass('open-search');
		$("header#site-header .site-search .form-control").focus();
		$("header#site-header .site-search .expand-search").attr('aria-expanded', function (i, attr) {
			return attr == 'true' ? 'false' : 'true'
		});
	});
	$("html").click(function() {
		$("header#site-header .site-search").removeClass("open-search");
		$("header#site-header .site-search .expand-search").attr('aria-expanded', 'false');
	});
	$("header#site-header .site-search").click(function(e) {
		e.stopPropagation();
	});

	// Sub Navigation
	$("nav.sub ul li .expand-subpages").click(function (e) {
		e.preventDefault();
		$(this).parent().toggleClass("open-child");
		$(this).attr('aria-expanded', function (i, attr) {
			return attr == 'true' ? 'false' : 'true'
		});
		$(this).parent().siblings().removeClass("open-child");
	});
	$("nav.sub ul li:last a").on("blur", function (e) {
		e.preventDefault();
		$("nav.sub ul li .expand-subpages").attr('aria-expanded', 'false');
		$("nav.sub ul li").removeClass("open-child");
	});
	$("nav.sub ul li.has-child.active").addClass("open-child");

	// Expand In this section
	$(".in-this-section .expand-sub").click(function() {
		$(".in-this-section .expand-sub").toggleClass('active');
		$(".in-this-section nav.sub").toggleClass('open');
		$(".in-this-section .expand-sub").attr('aria-expanded', function (i, attr) {
			return attr == 'true' ? 'false' : 'true'
		});
	});

	// Expand Filters on Listing & Shop
	$(".listing_filter-form .expand-filters").click(function () {
		$(".listing_filter-form .expand-filters").toggleClass('active');
		$(".listing_filter-form .filter-form_inner").toggleClass('open');
		$(".listing_filter-form .expand-filters").attr('aria-expanded', function (i, attr) {
			return attr == 'true' ? 'false' : 'true'
		});
	});

	//RTL for Slick
	function rtl_slick(){
		if(jQuery("html").is('[dir="rtl"]')) {
			return true;
		} else {
			return false;
	}}

	// BANNER
	// PLAYS VIDEO IN BANNER
	$('.usn_cmp_banner .slides').on('init', function(slick){
		$('.usn_cmp_banner video').each(function () {
			this.play();
		});
	});
	// ALL CAROUSELS
    $(".slides").slick({
		rtl: rtl_slick(),
		infinite: true,
		speed: 600,
		adaptiveHeight: true,
		prevArrow: '<button class="slick-prev" type="button">'
					+ '<i aria-hidden="true" class="icon"></i>'
					+ '<span class="visually-hidden">Previous</span>'
				 	+ '</button>',
		nextArrow: '<button class="slick-next" type="button">'
					+ '<i aria-hidden="true" class="icon"></i>'
					+ '<span class="visually-hidden">Next</span>'
					+ '</button>',
		playIcon: '<i aria-hidden="true" class="icon usn_ion-md-play"></i>',
		pauseIcon: '<i aria-hidden="true" class="icon usn_ion-md-pause"></i>'
	});

	// Alert boxes
	// Remove component entirely when alert is closed
	$('.component .alert .close').on('click', function(c){
		$(this).closest('.component:not(.usn_cmp_splitcomponent)').addClass('d-none', function(c){});
	});	
	// Remove pod entirely when alert is closed
	$('.left-col .usn_pod_alertbox.swp-item .alert .close, .right-col .usn_pod_alertbox.swp-item .alert .close').on('click', function(c){
		$(this).closest('.usn_pod_alertbox').addClass('d-none', function(c){});
	});	

	// Back to top link
	$("#back-to-top-link").click(function() {
		$('html,body').animate({scrollTop:0},'slow');
		$("header#site-header").focus();
		return false;
	});

	// Anchor Navigation
	// Offset with Header on display
	var sections = $('section'), 
	nav = $('.component.usn_cmp_anchornavigation'), 
	anchor_nav_height = $('.component.usn_cmp_anchornavigation').outerHeight()
	nav_height = $('header#site-header').outerHeight();
	nav_height_half = $('header#site-header').outerHeight() / 2;
	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop();
		sections.each(function() {
		if ( $('body').hasClass('no-header') || $('body').hasClass('header-11-lg') || $('body').hasClass('header-12-lg') || $('body').hasClass('header-15-lg') || $('body').hasClass('header-16-lg') ) {
		var top = $(this).offset().top - anchor_nav_height,
			bottom = top + $(this).outerHeight();
		} else {
			var top = $(this).offset().top - anchor_nav_height - nav_height,
				bottom = top + $(this).outerHeight();
		}
		if (cur_pos >= top && cur_pos <= bottom) {
			nav.find('a').removeClass('active');
			sections.removeClass('active');
			
			$(this).addClass('active');
				nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
			}
		});
	});
	nav.find('a').on('click', function () {
		if ( $('body').hasClass('no-header') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('hide_header-on-scroll-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') ) {
			//alert('No header or hide header on scroll LG - STICKY NAV ON');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand-anchor").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation .expand-anchor").attr('aria-expanded', 'false');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height + 10
			}, 600);
			return false;
		} else if ( $('body').hasClass('no-header') || $('body').hasClass('hide_header-on-scroll-lg') ) {
			//alert('No header or hide header on scroll LG - STICKY NAV OFF');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand-anchor").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation .expand-anchor").attr('aria-expanded', 'false');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top
			}, 600);
			return false;
		} else if ( $('body').hasClass('header-04-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-05-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-09-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-10-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-13-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-14-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-18-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') ) { 
			//alert('Has header and it is Header 04, 05, 09, 10, 13, 14 LG - STICKY NAV ON');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand-anchor").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation .expand-anchor").attr('aria-expanded', 'false');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height - nav_height_half + 10
			}, 600);
			return false;
		} else if ( $('body').hasClass('header-04-lg') || $('body').hasClass('header-05-lg') || $('body').hasClass('header-09-lg') || $('body').hasClass('header-10-lg') || $('body').hasClass('header-13-lg') || $('body').hasClass('header-14-lg') || $('body').hasClass('header-18-lg') ) { 
			//alert('Has header and it is Header 04, 05, 09, 10, 13, 14 LG — STICKY NAV OFF');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand-anchor").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation .expand-anchor").attr('aria-expanded', 'false');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - nav_height_half + 10
			}, 600);
			return false;
		} else if ( $('body').hasClass('header-11-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-12-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-15-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-16-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') ) { 
			//alert('Has header, header 11, 12, 15 or 16 — STICKY NAV ON');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand-anchor").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation .expand-anchor").attr('aria-expanded', 'false');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height + 10
			}, 600);
			return false;
		} else if ( $('body').hasClass('header-11-lg') || $('body').hasClass('header-12-lg') || $('body').hasClass('header-15-lg') || $('body').hasClass('header-16-lg') ) { 
			//alert('Has header, header 11, 12, 15 or 16 — STICKY NAV OFF');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand-anchor").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation .expand-anchor").attr('aria-expanded', 'false');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height + 10
			}, 600);
			return false;
		} else if ( $('.component.usn_cmp_anchornavigation').hasClass('sticky') ) { 
			//alert('Has header — STICKY NAV ON');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand-anchor").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation .expand-anchor").attr('aria-expanded', 'false');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height - nav_height + 10
			}, 600);
			return false;
		}
	});

	// Scroll Prompt
	$('.scroll-prompt').click(function() {
		if ( $('body').hasClass('no-header') || $('body').hasClass('hide_header-on-scroll-lg') || $('body').hasClass('header-11-lg') || $('body').hasClass('header-12-lg') || $('body').hasClass('header-15-lg') || $('body').hasClass('header-16-lg') ) {
			var target;
			$("section").next().each(function(i, element) {
				target = ($(element).offset().top);
				if (target - 10 > $(document).scrollTop()) {
					return false; // break
				}
			});
			$("html, body").animate({
				scrollTop: target
			}, 600);
		} else if ( $('body').hasClass('header-04-lg') || $('body').hasClass('header-05-lg') || $('body').hasClass('header-09-lg') || $('body').hasClass('header-10-lg') || $('body').hasClass('header-13-lg') || $('body').hasClass('header-14-lg') || $('body').hasClass('header-18-lg') ) { 
			var target;
			$("section").next().each(function(i, element) {
				target = ($(element).offset().top - nav_height_half);
				if (target - 10 > $(document).scrollTop()) {
					return false; // break
				}
			});
			$("html, body").animate({
				scrollTop: target
			}, 600);
		} else { 
			var target;
			$("section").next().each(function(i, element) {
				target = ($(element).offset().top - nav_height);
				if (target - 10 > $(document).scrollTop()) {
					return false; // break
				}
			});
			$("html, body").animate({
				scrollTop: target
			}, 600);
		}
	});

	// Create smoothscroll links when a # is used.
    $('a:not([data-bs-toggle="tab"]):not([data-bs-toggle="dropdown"]):not(.nav-anchor-link):not(.nav-button-link):not([data-bs-toggle="modal"])').click(function() {
		if ( $('body').hasClass('no-header') || $('body').hasClass('hide_header-on-scroll-lg') || $('body').hasClass('header-11-lg') || $('body').hasClass('header-12-lg') || $('body').hasClass('header-15-lg') || $('body').hasClass('header-16-lg') ) {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : (this.hash.length) ? $('[name=' + this.hash.slice(1) + ']') : "";
				if (target.length) {
					$('html').removeClass('reveal-out');
					$("header#site-header .expand-header").removeClass('active');
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 600); // The number here represents the speed of the scroll in milliseconds
					return false;
				}
			}
		} else if ( $('body').hasClass('header-04-lg') || $('body').hasClass('header-05-lg') || $('body').hasClass('header-09-lg') || $('body').hasClass('header-10-lg') || $('body').hasClass('header-13-lg') || $('body').hasClass('header-14-lg') || $('body').hasClass('header-18-lg') ) { 
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : (this.hash.length) ? $('[name=' + this.hash.slice(1) + ']') : "";
				if (target.length) {
					$('html').removeClass('reveal-out');
					$("header#site-header .expand-header").removeClass('active');
					$('html,body').animate({
						scrollTop: target.offset().top - nav_height_half
					}, 600); // The number here represents the speed of the scroll in milliseconds
					return false;
				}
			}
		} else { 
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : (this.hash.length) ? $('[name=' + this.hash.slice(1) + ']') : "";
				if (target.length) {
					$('html').removeClass('reveal-out');
					$("header#site-header .expand-header").removeClass('active');
					$('html,body').animate({
						scrollTop: target.offset().top - nav_height
					}, 600); // The number here represents the speed of the scroll in milliseconds
					return false;
				}
			}
		}
	});

	// Forms - prevent enter key submitting forms when using inputs
	// $(".form:not(.site-search) input:not([type=submit])").on('keypress', function(e) {
	// 	return e.which !== 13;
	// });

	// Modal windows
    // Trigger slick carousel and lazyframe when used inside modal
	$('.modal').on('shown.bs.modal', function (e) {
		$('.slides').slick('setPosition');
		lazyframe('.lazyframe-video');
        $('html').addClass('modal-open');
	})
    $('.modal').modal('handleUpdate')
    $('.modal').on('hidden.bs.modal', function () {
        $('html').removeClass('modal-open');
    })

});

// Tooltips
$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip()
})

function usnSyncListingSearchText(value, position, formId) {
	switch (position) {
		case "side":
			var $form = $('#ListSearchForm_above_' + formId);
			var form = $form.get(0);
			var textbox = form.querySelector("[id ^= 'filter_text']");
			textbox.value = value;
			break;
		case "above":
			var $form = $('#ListSearchForm_side_' + formId);
			var form = $form.get(0);
			var textbox = form.querySelector("[id ^= 'filter_text']");
			textbox.value = value;
			break;
	}

}

function usnSyncListingSort(value, position, formId) {
	switch (position) {
		case "side":
			var $form = $('#ListSearchForm_above_' + formId);
			var form = $form.get(0);
			var dropdown = form.querySelector("[id ^= 'filter_sort_order']");
			dropdown.selectedIndex = value;
			break;
		case "above":
			var $form = $('#ListSearchForm_side_' + formId);
			var form = $form.get(0);
			var dropdown = form.querySelector("[id ^= 'filter_sort_order']");
			dropdown.selectedIndex = value;
			break;
	}

}

function usnSyncListingSearchDropdown(value, position, groupId, formId) {

	switch (position) {
		case "side":
			var $form = $('#ListSearchForm_above_' + formId);
			var form = $form.get(0);
			var dropdown = form.querySelector("[id ^= 'filter_dropdown_above_" + groupId + "']");
			dropdown.selectedIndex = value;
			var groupDiv = dropdown.closest('div.dropdown_filter');
			var selectedSpan = groupDiv.querySelector(".selected-count");
			if (value == 0) {
				selectedSpan.innerHTML = "0";
			}
			else {
				selectedSpan.innerHTML = "1";
			}

			break;
		case "above":
			var $form = $('#ListSearchForm_side_' + formId);
			var form = $form.get(0);
			var dropdown = form.querySelector("[id ^= 'filter_dropdown_side_" + groupId + "']");
			dropdown.selectedIndex = value;
			var groupDiv = dropdown.closest('div.dropdown_filter');
			var selectedSpan = groupDiv.querySelector(".selected-count");
			if (value == 0) {
				selectedSpan.innerHTML = "0";
			}
			else {
				selectedSpan.innerHTML = "1";
			}

			break;
	}

}

function usnSubmitListingForm(position, formId) {

	const $form = $('#ListSearchForm_' + position + "_" + formId);
	const form = $form.get(0);
	const searchParams = new URLSearchParams();

	var otherForm;

	switch (position) {
		case "side":
			var $otherForm = $('#ListSearchForm_above_' + formId);
			var otherForm = $otherForm.get(0);
			break;
		case "above":
			var $otherForm = $('#ListSearchForm_side_' + formId);
			var otherForm = $otherForm.get(0);
			break;
	}

	let selectedFilters = [];

	//get text search value
	const textbox = form.querySelector("[id ^= 'filter_text']");
	if (textbox && textbox.value !== "") {
		searchParams.set("text", textbox.value);
		usnAddOption("filter_sort_order_" + position, "relevance_ascending", usnRelevanceText);
	}
	else {
		usnRemoveOption("filter_sort_order_" + position, "relevance_ascending"); 
	}

	const sortDropdown = form.querySelector("[id ^= 'filter_sort_order']");

	if (sortDropdown) {
		const selectedSortOption = sortDropdown.options[sortDropdown.selectedIndex];
		if (selectedSortOption.value !== "") {
			searchParams.set("sort", selectedSortOption.value);
		}
	}

	//get all checkbox groups within the form
	const checkboxGroups = form.querySelectorAll(".checkbox_filter");

	//get selected filter ids
	checkboxGroups.forEach(group => {

		let selectedCount = 0;

		const checkboxes = group.querySelectorAll("input[type='checkbox']");
		checkboxes.forEach(checkbox => {
			if (checkbox.checked) {
				selectedFilters.push(checkbox.value);
				selectedCount += 1;
			}
		});

		let selectedSpan = group.querySelector(".selected-count");
		selectedSpan.innerHTML = selectedCount;
	});

	//get all radio groups within the form
	const radioGroups = form.querySelectorAll(".radio_filter");

	//get selected filter ids
	radioGroups.forEach(group => {

		let selectedCount = 0;

		const radios = group.querySelectorAll("input[type='radio']");
		radios.forEach(checkbox => {
			if (checkbox.checked) {
				selectedFilters.push(checkbox.value);
				selectedCount += 1;
			}
		});

		let selectedSpan = group.querySelector(".selected-count");
		selectedSpan.innerHTML = selectedCount;
	});

	//get all dropdown groups with the form
	const dropdownGroups = form.querySelectorAll(".dropdown_filter");

	//get selected filter ids
	dropdownGroups.forEach(group => {

		let selectedCount = 0;

		const dropdown = group.querySelector("select");
		if (dropdown.selectedIndex >= 0) {
			const selectedOption = dropdown.options[dropdown.selectedIndex];
			if (selectedOption.value !== "") {
				selectedFilters.push(selectedOption.value);
				selectedCount = 1;
			}
		}

		let selectedSpan = group.querySelector(".selected-count");
		selectedSpan.innerHTML = selectedCount;

	});

	if (otherForm !== undefined) {

		//get all checkbox groups within the form
		const othercheckboxGroups = otherForm.querySelectorAll(".checkbox_filter");

		//get selected filter ids
		othercheckboxGroups.forEach(group => {

			let selectedCount = 0;

			const othercheckboxes = group.querySelectorAll("input[type='checkbox']");
			othercheckboxes.forEach(checkbox => {
				if (selectedFilters.includes(checkbox.value)) {
					checkbox.checked = true;
					selectedCount += 1;
				}
				else {
					checkbox.checked = false;
				}
			});

			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = selectedCount;
		});

		//get all radio groups within the form
		const otherradioGroups = otherForm.querySelectorAll(".radio_filter");

		//get selected filter ids
		otherradioGroups.forEach(group => {

			let selectedCount = 0;

			const otherradios = group.querySelectorAll("input[type='radio']");
			otherradios.forEach(checkbox => {
				if (selectedFilters.includes(checkbox.value)) {
					checkbox.checked = true;
					selectedCount += 1;
				}
				else {
					checkbox.checked = false;
				}
			});

			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = selectedCount;
		});
	}

	if (selectedFilters.length > 0) {
		searchParams.set("filter", selectedFilters);
	}

	const newRelativePathQuery = '?' + searchParams.toString();
	history.pushState(null, '', newRelativePathQuery);

	var url = $form.attr("action");

	$.ajax({
		type: "POST",
		url: url,
		data: $form.serialize(),
		beforeSend: function () {
			$('#ListingLoading_' + formId).show();
		},
		success: function (data) {
			$('#ListContainer_' + formId).html(data);
		},
		complete: function () {
			$('#ListingLoading_' + formId).hide();
		}
	});
	
}

function usnResetFilterByNameGroup(position, groupName,formId) {

	const form = document.getElementById('ListSearchForm_' + position + '_' + formId);

	var items = form.querySelectorAll('input[name = "' + groupName +'"]');
	for (var i = 0; i < items.length; i++) {
		items[i].checked = false;
	}

	usnSubmitListingForm(position, formId)
}


function usnResetFilterDropdown(position, groupId, formId) {

	const dropdown = document.getElementById('filter_dropdown_' + position + '_' + groupId);
	dropdown.value = "";

	switch (position) {
		case "side":
			var abovedropdown = document.getElementById('filter_dropdown_above_' + groupId);
			abovedropdown.value = "";

			var groupDiv = abovedropdown.closest('div.dropdown_filter');
			var selectedSpan = groupDiv.querySelector(".selected-count");
			selectedSpan.innerHTML = "0";


			break;
		case "above":
			var sidedropdown = document.getElementById('filter_dropdown_side_' + groupId);
			sidedropdown.value = "";

			var groupDiv = sidedropdown.closest('div.dropdown_filter');
			var selectedSpan = groupDiv.querySelector(".selected-count");
			selectedSpan.innerHTML = "0";

			break;
	}

	usnSubmitListingForm(position, formId);
}

function usnClearAllFilters(formId) {

	var $aboveform = $('#ListSearchForm_above_' + formId);
	var aboveform = $aboveform.get(0);

	var $sideform = $('#ListSearchForm_side_' + formId);
	var sideform = $sideform.get(0);

	var $fullform = $('#ListSearchForm_full_' + formId);
	var fullform = $fullform.get(0);

	if (fullform === undefined) {

		//get all radio groups within the form
		const aboveformradioGroups = aboveform.querySelectorAll(".radio_filter");
		const sideformradioGroups = sideform.querySelectorAll(".radio_filter");
		//get all checkbox groups within the form
		const aboveformcheckboxGroups = aboveform.querySelectorAll(".checkbox_filter");
		const sideformcheckboxGroups = sideform.querySelectorAll(".checkbox_filter");
		//get all dropdown groups within the form
		const aboveformdropdownGroups = aboveform.querySelectorAll(".dropdown_filter");
		const sideformdropdownGroups = sideform.querySelectorAll(".dropdown_filter");

		//get selected filter ids
		aboveformradioGroups.forEach(group => {

			const aboveformradios = group.querySelectorAll("input[type='radio']");
			aboveformradios.forEach(checkbox => {
					checkbox.checked = false;
			});

			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = 0;
		});

		//get selected filter ids
		sideformradioGroups.forEach(group => {

			const sideformradios = group.querySelectorAll("input[type='radio']");
			sideformradios.forEach(checkbox => {
				checkbox.checked = false;
			});

			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = 0;
		});

		//get selected filter ids
		aboveformcheckboxGroups.forEach(group => {

			const aboveformcheckbox = group.querySelectorAll("input[type='checkbox']");
			aboveformcheckbox.forEach(checkbox => {
				checkbox.checked = false;
			});

			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = 0;
		});

		//get selected filter ids
		sideformcheckboxGroups.forEach(group => {

			const sideformcheckbox = group.querySelectorAll("input[type='checkbox']");
			sideformcheckbox.forEach(checkbox => {
				checkbox.checked = false;
			});

			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = 0;
		});

		//get selected filter ids
		aboveformdropdownGroups.forEach(group => {

			var abovedropdown = group.querySelector('select');
			abovedropdown.value = "";
			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = 0;
		});

		//get selected filter ids
		sideformdropdownGroups.forEach(group => {

			var abovedropdown = group.querySelector('select');
			abovedropdown.value = "";
			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = 0;
		});

		var textboxAbove = aboveform.querySelector("[id ^= 'filter_text']");
		textboxAbove.value = "";
		var textboxSide = sideform.querySelector("[id ^= 'filter_text']");
		textboxSide.value = "";

		usnSubmitListingForm('above', formId);
	}
	else {
		//get all radio groups within the form
		const fullformradioGroups = fullform.querySelectorAll(".radio_filter");
		//get all checkbox groups within the form
		const fullformcheckboxGroups = fullform.querySelectorAll(".checkbox_filter");
		//get all dropdown groups within the form
		const fullformdropdownGroups = fullform.querySelectorAll(".dropdown_filter");

		//get selected filter ids
		fullformradioGroups.forEach(group => {

			const fullformradios = group.querySelectorAll("input[type='radio']");
			fullformradios.forEach(checkbox => {
				checkbox.checked = false;
			});

			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = 0;
		});

		//get selected filter ids
		fullformcheckboxGroups.forEach(group => {

			const fullformcheckbox = group.querySelectorAll("input[type='checkbox']");
			fullformcheckbox.forEach(checkbox => {
				checkbox.checked = false;
			});

			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = 0;
		});

		//get selected filter ids
		fullformdropdownGroups.forEach(group => {

			var fulldropdown = group.querySelector('select');
			fulldropdown.value = "";
			let selectedSpan = group.querySelector(".selected-count");
			selectedSpan.innerHTML = 0;
		});

		var textbox = fullform.querySelector("[id ^= 'filter_text']");
		if (textbox !== null) {
			textbox.value = "";
		}

		usnSubmitListingForm('full', formId);

	}

	var url = new URL(window.location.href);

	// Clear a query string parameter
	url.searchParams.delete('filter');

	// Replace the current URL without reloading
	history.replaceState(null, null, url);

}

function usnRemoveFilter(formId, filterId, groupId, filterType, pageLayout) {

	if (pageLayout == 'pageLayoutFull') {
		switch (filterType) {
			case "dropdown":
				const dropdown = document.getElementById('filter_dropdown_full_' + groupId);
				dropdown.value = "";
				break;
			case "checkbox":
				const checkboxes = document.getElementsByName('filter_check_full_' + groupId);
				checkboxes.forEach(checkbox => {
					if (checkbox.value == filterId && checkbox.checked) {
						checkbox.checked = false;
					}
				});
				break;
			case "radio":
				const radios = document.getElementsByName('filter_radio_full_' + groupId);
				radios.forEach(radio => {
					if (radio.value == filterId && radio.checked) {
						radio.checked = false;
					}
				});
				break;
		}

		usnSubmitListingForm('full', formId);
	}
	else {
		switch (filterType) {
			case "dropdown":
				const dropdownAbove = document.getElementById('filter_dropdown_above_' + groupId);
				dropdownAbove.value = "";
				var groupDivAbove = dropdownAbove.closest('div.dropdown_filter');
				var selectedSpanAbove = groupDivAbove.querySelector(".selected-count");
				selectedSpanAbove.innerHTML = "0";
				const dropdownSide = document.getElementById('filter_dropdown_side_' + groupId);
				dropdownSide.value = "";
				var groupDivSide = dropdownSide.closest('div.dropdown_filter');
				var selectedSpanSide = groupDivSide.querySelector(".selected-count");
				selectedSpanSide.innerHTML = "0";
				break;
			case "checkbox":
				const checkboxesAbove = document.getElementsByName('filter_check_above_' + groupId);
				checkboxesAbove.forEach(checkbox => {
					if (checkbox.value == filterId && checkbox.checked) {
						checkbox.checked = false;
					}
				});
				const checkboxesSide = document.getElementsByName('filter_check_side_' + groupId);
				checkboxesSide.forEach(checkbox => {
					if (checkbox.value == filterId && checkbox.checked) {
						checkbox.checked = false;
					}
				});
				break;
			case "radio":
				const radiosAbove = document.getElementsByName('filter_radio_above_' + groupId);
				radiosAbove.forEach(radio => {
					if (radio.value == filterId && radio.checked) {
						radio.checked = false;
					}
				});
				const radiosSide = document.getElementsByName('filter_radio_side_' + groupId);
				radiosSide.forEach(radio => {
					if (radio.value == filterId && radio.checked) {
						radio.checked = false;
					}
				});
				break;
		}

		usnSubmitListingForm('above', formId);
	}

	

}

function usnRemoveTextFilter(formId, pageLayout) {

	if (pageLayout == 'pageLayoutFull') {
		var $form = $('#ListSearchForm_full_' + formId);
		var form = $form.get(0);
		var textbox = form.querySelector("[id ^= 'filter_text']");
		textbox.value = "";
		usnSubmitListingForm('full', formId);
	}
	else {
		var $formabove = $('#ListSearchForm_above_' + formId);
		var formabove = $formabove.get(0);
		var textboxAbove = formabove.querySelector("[id ^= 'filter_text']");
		textboxAbove.value = "";

		var $formside = $('#ListSearchForm_side_' + formId);
		var formside = $formside.get(0);
		var textboxSide = formside.querySelector("[id ^= 'filter_text']");
		textboxSide.value = "";
		usnSubmitListingForm('above', formId);
	}

}


function usnRemoveOption(selectId, optionValue) {
	var select = document.getElementById(selectId);

	if (select) { 
		var options = select.options;
		for (var i = 0; i < options.length; i++) {
			if (options[i].value === optionValue) {
				select.options.remove(i);
				break;
			}
		}
	}
}

function usnAddOption(selectId, optionValue, optionText) {
	var select = document.getElementById(selectId);

	if (select) {
		var options = select.options;
		var found = false;
		for (var i = 0; i < options.length; i++) {
			if (options[i].value === optionValue) {
				found = true;
				break;
			}
		}
		if (!found) {
			var newOption = new Option(optionText, optionValue);
			select.options.add(newOption, select.options[0]);
		}
	}
}

function usnUpdatePrice(position, uniqueId, productId, control) {
	var selectedValue = control.value;

	//get all buttons related to same product
	var snipcartButtons = document.querySelectorAll("button.snpbtn-" + productId);

	//update selected variant value on all buttons related to this product
	for (var i = 0; i < snipcartButtons.length; i++) {
		var button = snipcartButtons[i];
		button.setAttribute("data-item-custom" + position + "-value", selectedValue);
	}

	//get all dropdowns on this page that are the same product and variant as the one that has just been changed
	var allDropdowns = document.querySelectorAll("select.snpdrp-" + productId + "-" + position);

	//update selected value to same as the one that has just been changed
	for (var i = 0; i < allDropdowns.length; i++) {
		allDropdowns[i].value = selectedValue;
	}

	var snipcartButton = document.getElementById("snpbtn-" + uniqueId);

	//get product price
	var originalPrice = snipcartButton.getAttribute("data-item-price");
	var priceChange = 0;
	var newPrice = 0;

	var allVariantDropdowns = document.querySelectorAll("select.snpdrp-" + uniqueId);

	//Loop all variant dropdowns and apply price change
	for (var i = 0; i < allVariantDropdowns.length; i++) {
		
		var dropdown = allVariantDropdowns[i];
		var selectedVariantValue = dropdown.value;
		var options = snipcartButton.getAttribute("data-item-custom" + (i+1) + "-options");
		//if item selected check if price needs changed
		if (selectedVariantValue != '') {

			var array = options.split("|");
			for (x in array) {
				//Check if item contains price change
				var beginPosition = array[x].indexOf("[");
				var endPosition = array[x].indexOf("]");
				if (beginPosition > 1) {
					//check if value is same as dropdown, change price
					var value = array[x].substring(0, beginPosition);
					if (value == selectedVariantValue) {
						priceChange = priceChange + Number(array[x].substring(beginPosition + 1, endPosition));
						break;
					}
				}
			}
		}

	}

	newPrice = usnMoneyOperation(originalPrice,priceChange);

	//update all prices on page with new price
	var priceSpans = document.querySelectorAll("span.price_" + productId);

	for (var i = 0; i < priceSpans.length; i++) {
		priceSpans[i].innerHTML = newPrice; // Replace with the new HTML content
	}
}

function usnMoneyOperation(amount1, amount2) {
	// Convert amounts to whole
	const amount1Whole = Math.round(amount1 * 100);
	const amount2Whole = Math.round(amount2 * 100);

	let totalWhole;

	totalWhole = amount1Whole + amount2Whole;
	
	// Convert the result back
	return totalWhole / 100;
}
