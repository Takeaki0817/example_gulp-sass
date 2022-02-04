$(function () {
	const hamburger = $('.js_hamburger');
	const nav = $('.js_nav'); // 変数名相談
	const fadeTime = 360;

	hamburger.click(function () {
		$(this).find('.js_hamburger_bar').toggleClass('is_active');
		nav.fadeToggle(fadeTime);
		$('.js_body').toggleClass('is_hidden');
		// ↑bodyにクラス名つけるか相談
	});

	const carousel = $('.js_case-list');

	carousel.slick({
		prevArrow: '',
		nextArrow: '<button class="top_case_btn-next"></button>',
		centerMode: true,
		centerPadding: '150px',
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1080,
				settings: {
					slidesToShow: 2,
					centerMode: false,
				},
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					centerMode: false,
				},
			},
		],
	});

	const faq = $('.js_faq');
	const answer = $('.js_answer');
	const slideTime = 360;

	answer.hide();
	faq.each(function () {
		$(this).click(function () {
			faq.not(this).find('.js_answer').slideUp(slideTime);
			$(this).find('.js_answer').slideToggle(slideTime);

			faq.not(this).find('.js_cross').removeClass('is_open');
			$(this).find('.js_cross').toggleClass('is_open');
		});
	});
});
