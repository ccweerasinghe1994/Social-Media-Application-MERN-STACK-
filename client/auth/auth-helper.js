import {signout} from "./api-auth";

const authenticate = (jwt, cb) => {

    if (typeof window !== "undefined") {
        sessionStorage.setItem('jwt', JSON.stringify(jwt))
    }
    cb();

}

const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false
    }
    if (sessionStorage.getItem('jwt')) {
        return JSON.parse(sessionStorage.getItem('jwt'))
    }
    return false
}

const clearJwt = (cb) => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('jwt')
    }
    cb();
    signout().then((data) => {
        document.cookie = "t=; expires=Thu, 01 Jan 1970\n" +
            "00:00:00\n" +
            "UTC; path=/;\""
    })

}

export {
    signout,authenticate,clearJwt,isAuthenticated

}