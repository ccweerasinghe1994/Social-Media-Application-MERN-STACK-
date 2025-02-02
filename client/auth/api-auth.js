const signin = async (user) => {
    try {
        let response = await fetch('/auth/signin/', {
            method: "POST",
            headers: {
                "Accept": 'application/jason',
                "Content-Type": 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(user)
        })
        return await response.json();
    } catch (e) {
        console.log("-----------------------------signin---------------------------------------",e)
    }
}

const signout = async () => {
    try {
        let response = await fetch('/auth/signout', {
            method: 'GET'
        })

        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

export {
    signout, signin
}