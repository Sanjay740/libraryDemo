const endpoint = "http://localhost:4000/";

export async function login(email, password) {
    let data = {
        email : email,
        password: password
    }
    const response = await fetch(endpoint + 'login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    });
    const responseBody = await response.json();
    console.log(responseBody)
    return responseBody

}

export async function signup(data) {
    const response = await fetch(endpoint + 'signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    });
    const responseBody = await response.json();
    return responseBody

}