import userDatas from '../fakeData/userFakeData';


export async function login(email, password) {
    const loginData = []
   return userDatas.forEach(element => {   
         if(element.userName == email && element.password== password ) 
          {
              loginData.push({
                  userName: element.userName,
                  userId: element.userId
              })
          }  
    });
    // console.log(userData)
    
  }