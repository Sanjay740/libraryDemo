import axios from "axios";

const setAuthToken = token => {    
if (token) {
    console.log("sdd",token)
axios.defaults.headers.common["Authorization"] = token;
} else {
    console.log("asdas",token)
delete axios.defaults.headers.common["Authorization"];
}
};

export default setAuthToken;