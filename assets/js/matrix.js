const matrix = document.getElementById('matrix')
let mode

// tooltips
let tooltipsData = null

fetch('/ajax/tooltips.json')
	.then(response => response.json())
	.then(data => {
		tooltipsData = data
	})

function tooltipsInit(scope) {
	const els = scope.querySelectorAll('[data-tooltip-id]')

	tippy(els, {
		content: '',
		allowHTML: true,
		theme: 'tooltip',
		onShow(instance) {
			if(tooltipsData) {
				const id = instance.reference.dataset.tooltipId
	
				if(tooltipsData.hasOwnProperty(id)) {
					instance.setContent(tooltipsData[id])
				} else {
					return false
				}
			} else {
				instance.hide()
			}
		}
	})
}

tooltipsInit(document.body)

// matrix
function toggleResultView(container, force) {
	container.classList.toggle('matrix__section_done', force)
}

function isOverlimit(num) {
	return num > 22
}

function normalize(num) {
	if (isOverlimit(num)) {
		return normalize(num.toString().split('').map(Number).reduce((a, b) => a + b, 0))
	} else {
		return num
	}
}

function fillData({ result, container }) {
	let nodes = container.querySelectorAll('[data-mx-id]')
	const scheme = container.querySelector('.matrix-scheme__svg')

	nodes.forEach(el => el.textContent = result ? result[el.dataset.mxId] : '')
	scheme.classList.toggle('ready', result)
}

function calc(formData, container) {
	const personalResult = getPersonalResult(formData)

	if(mode === 'personal') {
		fillData({ result: personalResult[0], container })
	}

	if(mode === 'compatibility') {
		const compatibilityResult = getCompatibilityResult(formData, personalResult)

		fillData({ result: compatibilityResult, container })
	}

	toggleResultView(container, true)
}

function getPersonalResult(formData) {
	return formData.map(({ name, birthday }) => {
		const [day, month, year] = birthday.split('.')

		const a = normalize(+day),
		b = normalize(+month),
		c = normalize(+year),
		d = normalize(a + b + c),
		e = normalize(a + b + c + d),
		f = normalize(a + b),
		g = normalize(b + c),
		y = normalize(c + d),
		a1 = normalize(a + e),
		c1 = normalize(c + e),
		d1 = normalize(d + e),
		o = normalize(d1 + a1),
		d2 = normalize(d + d1),
		k = normalize(a + d),
		a2 = normalize(a + a1),
		c2 = normalize(c1 + c),
		b1 = normalize(b + e),
		b2 = normalize(b + b1),
		b3 = normalize(e + b1),
		e1 = normalize(f + g + y + k),
		e2 = normalize(e + e1),
		p1 = normalize(g + e),
		x = normalize(d1 + c1),
		x1 = normalize(x + d1),
		x2 = normalize(x + c1),
		a3 = normalize(a1 + e),
		p2 = normalize(g + p1),
		s1 = normalize(e + f),
		s2 = normalize(s1 + f),
		p3 = normalize(k + e),
		s4 = normalize(y + e),
		s3 = normalize(y + s4),
		p4 = normalize(k + p3),
		h = normalize(b + d),
		j = normalize(a + c),
		m = normalize(h + j),
		n = normalize(f + y),
		t = normalize(g + k),
		z = normalize(n + t),
		s = normalize(m + z),
		pp = normalize(z + s),
		ab1 = normalize(a1 + b1),
		ab2 = normalize(a2 + b2),
		ab3 = normalize(a3 + b3),
		cd1 = normalize(c1 + d1),
		ee = normalize(e + e),
		af = normalize(a + f),
		fb = normalize(f + b),
		bg = normalize(b + g),
		gc = normalize(g + c),
		cy = normalize(c + y),
		yd = normalize(y + d),
		dk = normalize(d + k),
		ka = normalize(k + a),
		n2 = normalize(a + af),
		n1 = normalize(a + n2),
		n3 = normalize(af + n2),
		n5 = normalize(af + f),
		n4 = normalize(af + n5),
		n6 = normalize(n5 + f),
		n8 = normalize(f + fb),
		n7 = normalize(f + n8),
		n9 = normalize(n8 + fb),
		n11 = normalize(fb + b),
		n10 = normalize(fb + n11),
		n12 = normalize(n11 + b),
		n14 = normalize(b + bg),
		n13 = normalize(b + n14),
		n15 = normalize(n14 + bg),
		n17 = normalize(bg + g),
		n16 = normalize(bg + n17),
		n18 = normalize(n17 + g),
		n20 = normalize(gc + g),
		n19 = normalize(g + n20),
		n21 = normalize(n20 + gc),
		n23 = normalize(gc + c),
		n22 = normalize(gc + n23),
		n24 = normalize(n23 + c),
		n26 = normalize(cy + c),
		n25 = normalize(c + n26),
		n27 = normalize(n26 + cy),
		n29 = normalize(cy + y),
		n28 = normalize(cy + n29),
		n30 = normalize(n29 + y),
		n32 = normalize(yd + y),
		n31 = normalize(y + n32),
		n33 = normalize(n32 + yd),
		n35 = normalize(yd + d),
		n34 = normalize(yd + n35),
		n36 = normalize(n35 + d),
		n38 = normalize(dk + d),
		n37 = normalize(d + n38),
		n39 = normalize(n38 + dk),
		n41 = normalize(dk + k),
		n40 = normalize(dk + n41),
		n42 = normalize(n41 + k),
		n44 = normalize(ka + k),
		n43 = normalize(k + n44),
		n45 = normalize(n44 + ka),
		n47 = normalize(ka + a),
		n46 = normalize(ka + n47),
		n48 = normalize(n47 + a),
		total1 = normalize(a + a2 + a1 + a3 + e + c1 + c),
		total2 = normalize(b + b2 + b1 + b3 + e + d1 + d),
		total3 = normalize(f + ab1 + ab2 + ab3 + ee + cd1 + y),
		mp = normalize(f + y),
		fp = normalize(g + k),
		social = normalize(f + y + g + k),
		key = normalize(e + social),
		age = getAge(birthday);

		let result = { a, b, c, d, e, e1, e2, f, h, j, m, n, t, s, y, z, a1, c1, d1, d2, o, g, k, a2, c2, b1, b2, b3, p1, x, x1, x2, a3, p2, s1, s2, p3, s4, s3, p4, af, fb, bg, gc, cy, yd, dk, ka, n2, n1, n3, n5, n4, n6, n8, n7, n9, n11, n10, n12, n14, n13, n15, n17, n16, n18, n20, n19, n21, n23, n22, n24, n26, n25, n27, n29, n28, n30, n32, n31, n33, n35, n34, n36, n38, n37, n39, n41, n40, n42, n44, n43, n45, n47, n46, n48, ab1, ab2, ab3, cd1, ee, total1, total2, total3, mp, fp, social, key, pp, name, birthday, age }

		return result
	})
}

function getCompatibilityResult(formData, personalResults) {
	const ids = ['a', 'f', 'b', 'g', 'c', 'd', 'e', 'k', 'y' ]
	let result = {}

	ids.forEach(id => {
		result[id + id] = normalize(personalResults[0][id] + personalResults[1][id])
	})

	const p1 = normalize(result.aa + result.ee),
	p2 = normalize(result.aa + p1),
	p3 = normalize(result.bb + result.ee),
	p4 = normalize(result.bb + p3),
	p5 = normalize(result.cc + result.ee),
	p6 = normalize(result.cc + p5),
	p7 = normalize(result.dd + result.ee),
	p8 = normalize(result.dd + p7),
	p9 = normalize(p5 + p7),
	p10 = normalize(p5 + p9),
	p11 = normalize(p7 + p9),
	cs = normalize(result.bb + result.dd),
	ce = normalize(result.aa + result.cc),
	cr = normalize(cs + ce),
	cm = normalize(result.ff + result.yy),
	cf = normalize(result.gg + result.kk),
	cps = normalize(cm + cf),
	cu = normalize(cr + cps),
	cp = normalize(cr + cps + cu)

	formData.forEach((obj, index) => {
		for(let key in obj) {
			result[`${key}-${index}`] = obj[key]
			result[`age-${index}`] = getAge(obj.birthday)
		}
	})

	result = { ...result, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, cs, ce, cr, cm, cf, cps, cu, cp }

	return result
}

function getAge(birthDateString) {
	const [day, month, year] = birthDateString.split('.').map(Number)
	const birthDate = new Date(year, month - 1, day)
	const today = new Date()
	let age = today.getFullYear() - birthDate.getFullYear()
	const monthDifference = today.getMonth() - birthDate.getMonth()
	if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
		age--
	}
	return age
}

function init(e) {
	const section = e.target.closest('.matrix__section')
	const formGroups = e.target.querySelectorAll('.matrix-form__group')
	mode = e.target.dataset.mode

	const formData = [...formGroups].map(group => {
		const name = group.querySelector('input[name="name"]').value
		const birthday = group.querySelector('input[name="birthday"]').value

		return { name, birthday }
	})

	calc(formData, section)
}

let svgInlined

async function inlineSvg() {
	const schemes = document.querySelectorAll('.matrix-scheme__svg')
	const promises = [...schemes].map(img => {
		return fetch(img.src)
			.then(response => response.text())
			.then(svg => {
				const parent = img.parentNode

				parent.innerHTML = svg
				tooltipsInit(parent)
			})
			.catch(error => {
				console.error('Помилка під час завантаження SVG:', error)
			})
	})

	await Promise.all(promises)
}

matrix.querySelectorAll('.matrix-form').forEach(form => {
	form.addEventListener('submit', async (e) => {
		e.preventDefault()
		
		if (!svgInlined) {
			svgInlined = inlineSvg()
		}

		await svgInlined
		init(e)
	})
})

matrix.querySelectorAll('.matrix-details__btn').forEach(btn => {
	btn.addEventListener('click', () => {
		const container = btn.closest('.matrix__section')
		fillData({container})
		toggleResultView(container, false)
		container.scrollIntoView()
	})
})

document.querySelectorAll('.js-matrix-date-mask').forEach(input => {
	IMask(input, {
		mask: Date,
		min: new Date(1924, 0, 1),
		max: new Date()
	})
})