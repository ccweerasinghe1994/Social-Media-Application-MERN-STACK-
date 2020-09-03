const authenticate = (jwt,cb) => {

    if(typeof window !== "undefined"){
        sessionStorage.setItem('jwt',JSON.stringify(jwt))
    }
    cb();

}