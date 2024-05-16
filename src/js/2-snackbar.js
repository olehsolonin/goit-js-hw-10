import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function createPromise(delay, state) {
	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if (state === "fulfilled") {
				resolve(delay);
			}
			else {
				reject(delay);
			}
		}, delay);
	});
}

function showMessage(delay, state) {

	if (state === "fulfilled") {
		iziToast.success({
			title: '✅ Fulfilled ',
			message: `promise in ${delay}ms`,
			position: 'topRight',
		});
	} else {

		iziToast.error({
			title: "❌ Rejected",
			message: `promise in ${delay}ms`,
			position: 'topRight',
		});
	}
}

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {

	event.preventDefault();

	const delay = parseInt(form.elements.delay.value);
	const state = form.elements.state.value;

	createPromise(delay, state)
		.then((delay) => {
			showMessage(delay, state);
		})
		.catch((delay) => {
			showMessage(delay, state);
		});
});


















