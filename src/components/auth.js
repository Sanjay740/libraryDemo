import userDatas from '../fakeData/userFakeData';

const endpoint = "http://localhost:4000/";
// async function graphqlRequest(query, variables = {}) {
//   const response = await fetch(endpoint, {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({ query, variables })
//   });  
//   const responseBody = await response.json();
//   console.log(responseBody)
//   return responseBody.data
// }
export async function login(email, password) {
    const loginData = []
    userDatas.forEach(element => {
        if (element.userName == email && element.password == password) {
            loginData.push({
                userName: element.userName,
                userId: element.userId,
                isLogin: true,
                token: element.token
            })
        }
    });
    return loginData

}

export async function signup(data) {
    console.log(data)
    const response = await fetch(endpoint + 'signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: data
    });
    const responseBody = await response.json();
    console.log(responseBody)
    return responseBody.data
    // const loginData = []
    // userDatas.forEach(element => {   
    //       if(element.userName == email && element.password== password ) 
    //        {
    //            loginData.push({
    //                userName: element.userName,
    //                userId: element.userId,
    //                isLogin :true,
    //                token: element.token
    //            })
    //        }           
    //  });
    //   return loginData

}