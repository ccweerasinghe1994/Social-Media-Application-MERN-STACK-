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
        return response.json();
    } catch (e) {
        console.log(e)
    }
}