import $ from 'jquery';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

window.script = (($) => {
	const test = () => {
		alert('테스트입니다');
	};

	return {
		test: test,
	};
})($);
