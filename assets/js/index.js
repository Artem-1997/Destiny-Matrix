// modal
if(window.HTMLDialogElement === undefined) {
	const s = document.createElement('script')
	s.onload = () => {
		document.querySelectorAll('.modal').forEach(dialog => {
			dialogPolyfill.registerDialog(dialog);
		})
	}
	s.src = '/assets/js/dialog-polyfill.js'
	s.async = true
	document.head.appendChild(s)
}

document.querySelectorAll('[data-modal-trigger]').forEach(btn => {
	btn.addEventListener('click', showModal)
})

function showModal({target}) {
	const modal = document.getElementById(target.dataset.modalTrigger)
	
	modal.showModal()
	modal.addEventListener('click', handleModalClick)
}

function handleModalClick({currentTarget, target}) {
	const isClickedOnBackdrop = target === currentTarget

	if (isClickedOnBackdrop) {
		currentTarget.close();
	}
}