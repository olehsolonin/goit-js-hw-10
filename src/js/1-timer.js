import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let userSelectedDate;


const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		userSelectedDate = selectedDates[0];
		const now = new Date();
		if (userSelectedDate <= now) {
			iziToast.error({
				title: 'Error',
				message: 'Please choose a date in the future',
			});
			startButton.disabled = true;
		} else {
			startButton.disabled = false;
		}
	},
};

flatpickr(datetimePicker, options);

function calculateTimeDifference(endDate) {
	const msDifference = endDate - new Date();
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const days = Math.floor(msDifference / day);
	const hours = Math.floor((msDifference % day) / hour);
	const minutes = Math.floor(((msDifference % day) % hour) / minute);
	const seconds = Math.floor((((msDifference % day) % hour) % minute) / second);
	return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
	return value < 10 ? `0${value}` : value;
}

startButton.addEventListener('click', () => {
	startButton.disabled = true;
	datetimePicker.disabled = true;
	const countdownInterval = setInterval(() => {
		const { days, hours, minutes, seconds } = calculateTimeDifference(userSelectedDate);
		daysValue.textContent = addLeadingZero(days);
		hoursValue.textContent = addLeadingZero(hours);
		minutesValue.textContent = addLeadingZero(minutes);
		secondsValue.textContent = addLeadingZero(seconds);
		if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
			clearInterval(countdownInterval);
			iziToast.success({
				title: 'Success',
				message: 'Countdown finished!',
			});
			startButton.disabled = false;
			datetimePicker.disabled = false;
		}
	}, 1000);
});









