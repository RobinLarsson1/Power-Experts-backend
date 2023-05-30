import express from 'express'
import { getDb } from '../Data/database.js'

const router = express.Router()
const db = getDb()


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

    let tagsIsValid = Array.isArray(p.tags) && p.tags.length > 0;

    if (!nameIsValid || !priceIsValid || !imageIsValid || !tagsIsValid) {
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
    usernameIsValid = usernameIsValid && u.name !== ''

    let passwordIsValid = (typeof u.pass) === 'string'
    passwordIsValid = passwordIsValid && u.pass !== ''


    if (!usernameIsValid || !passwordIsValid) {
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



function isValidId(x) {
    let id = Number(x)

    if (isNaN(id)) {
        return false
    }
    return id >= 0
}



function isSearchValid(s) {
    if (typeof s !== 'string' || s === '') {
        return false;
    }
    return true;
}

function hasID(object) {
    let idIsValid = (typeof object.id) === "number"
    idIsValid = idIsValid && object.id > 0
    return idIsValid
}

export { isValidProduct, isValidUser, generateId, isValidId, isSearchValid, hasID }