function init() {
	const menuElem = document.querySelector('.menu');
	const navButtonElem = document.querySelector('.navButton');

	window.onscroll = function () {
		const menuCoords = menuElem.offsetHeight + 100;

		if (menuCoords < pageYOffset) {
			navButtonElem.style.opacity = '1';
			navButtonElem.style.cursor = 'pointer';
		} else {
			navButtonElem.style.opacity = '0';
			navButtonElem.style.cursor = 'auto';
		}
	};

	navButtonElem.onclick = function () {
		if (this.style.opacity === '0') return false;
		scrollToElement(menuElem.getBoundingClientRect().top);
	};

	function scrollToElement(topCoord) {
		window.scrollBy({
			top: topCoord,
			left: 0,
			behavior: 'smooth'
		});
	}

	function getAge() {
		const ageElem = document.querySelector('.description p:last-child');

		const date = new Date();
		const years = date.getFullYear() - 1993;
		const day = date.getDate() - 4;

		ageElem.innerHTML = `${years} лет, ${day} дней`;
	}

	getAge();

	/*const myMenu = document.getElementById('menu');

	myMenu.onclick = function menuShow() {
		let navMenu = document.getElementById('myTopNav');

		if (navMenu.classList.length === 1) {
			navMenu.classList.add('responsive');
		} else {
			navMenu.classList.remove('responsive');
		}
	};*/
}

document.addEventListener("DOMContentLoaded", init);

