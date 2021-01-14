import $ from 'jquery';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

window.script = (($) => {
	gsap.registerPlugin(Flip);
	const text = $('.container');
	let letterCurrent = 0;

	const eventLetter = () => {
		const layouts = ['code1', 'code2', 'code3'];
		const state = Flip.getState('.letter', { props: 'color,backgroundColor', simple: true });
		text.removeClass(layouts[letterCurrent]);
		letterCurrent = (letterCurrent + 1) % layouts.length;
		text.addClass(layouts[letterCurrent]);
		Flip.from(state, {
			absolute: true,
			duration: 0.5,
			stagger: 0.1,
			ease: 'power1.inOut',
			simple: true,
			spin: letterCurrent === 2,
		});
		gsap.delayedCall(letterCurrent === 0 ? 3.5 : 1.5, eventLetter);
	};

	const wrapper = $('.wrapper');
	const box = $('.wrapper .text');

	const eventText = () => {
		textAppend();
		$(window).on('resize', () => {
			textAppend();
		});
	};

	const textAppend = () => {
		let width = window.innerWidth;
		let current = 0;
		if (width > 1440) {
			current = 0;
		} else if (width > 1024) {
			current = 1;
		} else if (width > 768) {
			current = 2;
		}
		if ($(`.section${current + 1} .text`).length > 0) return;

		const state = Flip.getState(box);
		$(`.section${current + 1}`).append(box);
		Flip.from(state, { duration: 0.8, ease: 'power1.inOut', scale: true });
	};

	if( wrapper.length > 0 ){
		eventText();
	}

	if (text.length > 0) {
		gsap.delayedCall(1, eventLetter);
	}

	return {};
})($);
