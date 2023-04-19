
document.addEventListener('DOMContentLoaded', function () {

	const form = document.getElementById('form');

	form.addEventListener('submit', formSend);


	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		formData.append('image', formImage.files[0]);

		if (error === 0) {
			formPreview.innerHTML = '';
			form.reset()
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');


		for (let index = 0; index < formReq.length; index++) {

			const input = formReq[index];

			formRemoveError(input);


			if (input.classList.contains('_email')) {
				if (input.value === "") {
					formAddError(input, "The field is empty");
				}
				else if (emailTest(input)) {
					formAddError(input, "Incorrect e-mail");
					error++;
				}
			}
			if (input.classList.contains('_password')) {
				if (input.value === "") {
					formAddError(input, "The field is empty");
					error++;
				}
				else if (passwordTestNum(input)) {
					formAddError(input, "Contain min 1 number");
					error++;
				}
				else if (passwordTestUpperCase(input)) {
					formAddError(input, "Contain upper case symbol");
					error++;
				}
				else if (passwordTestLength(input)) {
					formAddError(input, "Min length at 6 symbols");
					error++;
				}
			}
			else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			}
			else {
				if (input.value === '') {
					formAddError(input, "The field is empty");
					error++;
				}
			}
		}
		return error;
	}


	function formAddError(input, text) {
		formRemoveError(input)
		let parrentEl = input.parentNode
		parrentEl.classList.add('_error')
		const errLable = document.createElement('lable')
		errLable.classList.add('error-lable')
		errLable.textContent = text
		parrentEl.append(errLable)
	}


	function formRemoveError(input) {

		const parent = input.parentNode
		if (parent.classList.contains('_error')) {
			parent.querySelector('.error-lable').remove()
			parent.classList.remove('_error')
		}
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	function passwordTestNum(input) {
		return !/(?=.*[0-9])/.test(input.value);
	}
	function passwordTestUpperCase(input) {
		return !/(?=.*[A-Z])/.test(input.value);
	}
	function passwordTestLength(input) {
		return !/[0-9a-zA-Z!@#$%^&*]{6,}/.test(input.value);
	}

	const formImage = document.getElementById('formImage');
	const formPreview = document.getElementById('formPreview');


	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});

	function uploadFile(file) {
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Разрешены только изображения.');
			formImage.value = '';
			return;
		}
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2 МБ.');
			return;
		}


		let reader = new FileReader();

		reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};

		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
	}
});