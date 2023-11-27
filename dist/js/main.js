
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure');
imageAspectRatio.forEach(imageAspectRatio => {
	const img = imageAspectRatio.querySelector('img'), style = getComputedStyle(imageAspectRatio);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageAspectRatio.style.setProperty('--padding-aspect-ratio', Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%');
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <get-coords> -=-=-=-=-=-=-=-=-=-=-=-=

function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
	top: box.top + window.scrollY,
	right: box.right + window.scrollX,
	bottom: box.bottom + window.scrollY,
	left: box.left + window.scrollX
	};
}

// =-=-=-=-=-=-=-=-=-=-=-=- </get-coords> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}


	// =-=-=-=-=-=-=-=-=-=-=-=- <menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=
	
	if ($('.header__burger')) {
	
		menu.forEach(element => {
			element.classList.toggle('is-mobile-menu-active')
		})
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=

	
	
	// =-=-=-=-=-=-=-=-=-=-=-=- <location> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const locationmapPoint = $(".location__map--point")
	if(locationmapPoint) {
	
		event.preventDefault();

		const modal = document.querySelector(locationmapPoint.getAttribute('href'));

		document.querySelectorAll('.location-modal.is-active').forEach(locationModal => {
			locationModal.classList.remove('is-active')
		});

		document.querySelectorAll('.location__map--point.is-active').forEach(locationTarget => {
			locationTarget.classList.remove('is-active')
		});

		/* modal.style.setProperty('--x', locationmapPoint.offsetWidth + 20 + locationmapPoint.getBoundingClientRect().left + 'px');
		if(getCoords(locationmapPoint).top - getCoords(locationmapPoint.closest('section')).top > 300) {
			modal.style.setProperty('--y', locationmapPoint.getBoundingClientRect().top - modal.offsetHeight / 2 + 'px');
		} else {
			modal.style.setProperty('--y', locationmapPoint.getBoundingClientRect().top + 'px');
		} */

		setTimeout(() => {
			locationmapPoint.classList.add('is-active')
			modal.classList.add('is-active');
		},0)
		
	}

	if(!$('.location-modal') || $('.location-modal-close')) {
		document.querySelectorAll('.location-modal.is-active').forEach(modal => {
			modal.classList.remove('is-active')
		})

		document.querySelectorAll('.location__map--point.is-active').forEach(locationTarget => {
			locationTarget.classList.remove('is-active')
		});
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </location> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <nav-links> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const navLink = $(".header__nav--list a, .footer__nav--list a");
	if(navLink) {
	
		const href = navLink.getAttribute('href');

		if(navLink.getAttribute('href').indexOf('#') != -1) {

			let section;
	
			section = document.querySelector('#' + href.split('#').pop())

			menu.forEach(elem => {
				elem.classList.remove('is-mobile-menu-active')
			})

			if(section) {
				event.preventDefault();
				section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			}
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </nav-links> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll-on-click-to-section> -=-=-=-=-=-=-=-=-=-=-=-=
	
	let scrollTo = $('.scroll-to');
	if(scrollTo) {
		event.preventDefault();
		let section;
	
		section = document.querySelector(scrollTo.getAttribute('href'))
	
		menu.forEach(elem => {
			elem.classList.remove('is-mobile-menu-active')
		})
	
		if(section) {
			section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		} else {
			body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll-on-click-to-section on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

})

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	
	windowSize = window.innerWidth;
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

setInterval(() => {
	if(windowSize > 1200) {	
		document.querySelectorAll('.location-modal.is-active').forEach(modal => {
			const point = document.querySelector(`.location__map--point[href="#${modal.getAttribute('id')}"]`);

			if(windowSize < point.getBoundingClientRect().left + modal.offsetWidth + 150) {
				modal.style.setProperty('--x', point.getBoundingClientRect().left + point.offsetWidth - modal.offsetWidth + 'px');
				if(getCoords(point).top - getCoords(point.closest('section')).top > 300) {
					modal.style.setProperty('--y', point.getBoundingClientRect().top - modal.offsetHeight / 2 + 'px');
				} else {
					modal.style.setProperty('--y', point.getBoundingClientRect().top + point.offsetHeight + 'px');
				}
			} else {
				modal.style.setProperty('--x', point.offsetWidth + 20 + point.getBoundingClientRect().left + 'px');
				if(getCoords(point).top - getCoords(point.closest('section')).top > 300) {
					modal.style.setProperty('--y', point.getBoundingClientRect().top - modal.offsetHeight / 2 + 'px');
				} else {
					modal.style.setProperty('--y', point.getBoundingClientRect().top + 'px');
				}
			}

			
		})
	}
},1)

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll('.hero__slider').forEach(sliderElement => {

	const sliderBackground = new Splide(sliderElement.closest('section').querySelector('.hero__slider-background'), {

		type: "fade",
		perPage: 1,
		speed: 1000,
		easing: "ease",
		rewind: true,

		pagination: false,
		arrows: false,

	});

	const slider = new Splide(sliderElement, {

		type: "fade",
		perPage: 1,
		speed: 1000,
		easing: "ease",
		rewind: true,

		pagination: false,

		autoplay: true,
		pauseOnHover: false,
		interval: 10000,

		breakpoints: {
			992: {
				// params
			},

			550: {
				// params
			}
		}

	});

	slider.sync(sliderBackground);
	sliderBackground.mount();
	slider.mount();

})

document.querySelectorAll('.services__slider').forEach(sliderElement => {

	const slider = new Splide(sliderElement, {

		perPage: 3,
		rewind: true,
		speed: 700,
		easing: "ease-in-out",
		gap: 47,
		perMove: 1,

		pagination: false,

		breakpoints: {
			1200: {
				gap: 16,
			},

			992: {
				perPage: 2,
			},

			768: {
				perPage: 1,
				speed: 300,
				easing: "ease",
			}
		}

	});

	sliderElement.querySelectorAll('.services__footer .splide__arrow').forEach(arrow => {
		arrow.addEventListener('click', function (event) {
			if(arrow.classList.contains('splide__arrow--prev')) {
				slider.go('<');
			}

			if(arrow.classList.contains('splide__arrow--next')) {
				slider.go('>');
			}
		})
	})

	slider.mount();

})

document.querySelectorAll('.works__slider').forEach(sliderElement => {

	const slider = new Splide(sliderElement, {

		autoWidth: true,
		mediaQuery: "min",

		easing: "ease",
		gap: 24,

		arrows: false,
		pagination: false,

		breakpoints: {
			992: {
				destroy: true,
			},
		}

	});

	slider.mount();

})

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=
*/
