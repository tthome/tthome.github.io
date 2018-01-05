'use strict';

let myMenu = document.getElementById('menu');

myMenu.onclick = function menuShow() {
	let navMenu = document.getElementById('myTopNav');

	if (navMenu.classList.length === 1) {
		navMenu.classList.add('responsive');
	} else {
		navMenu.classList.remove('responsive');
	}
};