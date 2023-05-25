

function isValidProduct(p) {

	if ((typeof p) !== 'object') {
		return false
	} else if (p === null) {
		return false
	}

	//product-objekten ska innehålla:
	//Id (number)
	//Name (string)
	//Price (number)
	//Image: (string)
	//Tags: (string)


	let nameIsValid = (typeof p.name) === 'string'
	nameIsValid = nameIsValid && p.name !== ''

	let priceIsValid = (typeof p.price) === 'number'
	priceIsValid = priceIsValid && p.price > 0

	let imageIsValid = (typeof p.image) === 'string'
	imageIsValid = imageIsValid && p.image !== ''

	let tagsIsValid = (typeof p.tags) === 'string'
	tagsIsValid = tagsIsValid && p.tags !== ''

	if (!nameIsValid || priceIsValid || imageIsValid || tagsIsValid) {
		return false
	}
	return true

}


function isValidUser(u) {

	if ((typeof u) !== 'object') {
		return false
	} else if (u === null) {
		return false
	}

	let usernameIsValid = (typeof u.name) === 'string'
	usernameIsValid = usernameIsValid && u.name !== '' && u.name.lenght >= 4;
	

	let passwordIsValid = (typeof u.pass) === 'string'
	passwordIsValid = passwordIsValid && u.pass !== '' && u.pass.lenght >= 4;
	

	if(!usernameIsValid || !passwordIsValid) {
		return false
	}
	return true

	//User-objekten ska innehålla:
	//Id (number)
	//Name (string)
	//Password (string)
}



function generateId() {
	return Math.round(Math.random() * 1000000)
}



function isValidId() {
	let id = Number(rew.params.id)

	if (isNaN(id)) {
		return false
	}
	return id >= 0
}


export {isValidProduct, isValidUser, generateId, isValidId}