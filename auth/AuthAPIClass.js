import axios from "axios"
import { AsyncStorage } from 'react-native';


var instance = axios.create({
    baseURL: 'http://192.168.1.100:5000/'
});

const DataAccessService = {
    async login(username, password) {
        if(username==null||username.length<3){
            console.log("using test account")
            username="xxx@email.com"
            password= "P@ssw0rd!"
        }
        var result = await instance.post('api/login', {
            "email": username,
            "password":password,
            RemenberMe: false
        })
        if (result.status == 200 && result.data.status == "OK") {
            return {status:200,token:result.data.token};
        } else {
            return { status: 400 }
        }

    },
    instance() {
        return instance
    },
    setToken(token) {
        instance.defaultConfig.headers.Authorization = `Bearer ${token}` // return _request('DELETE', url);
    },
    async getTestData() {
        try {
            let token = await AsyncStorage.getItem("userToken")
            if (token != null) {
                token = `Bearer ${token}`
                let result = await instance.get("api/login/list", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).catch((e) => {
                    console.log(e.response.data)
                    console.log(e.response.headers)
                    console.log(e.response.status)
                    return e.response.headers
                })
                console.log("=======================================")
                console.log(result.data)
                return result

            }
        } catch (e) {

        }
        return "error!!!!!!"

    },
    async SignUp(username, password, comfirmPassword) {
        console.log("Sign up!!!!")
        // let result = await 
       var result=await instance.post('api/register', {
            "email": username,
            "password": password,
            "confirmpassword": comfirmPassword
         }).catch((e)=>{
             console.log("====error====:")
          console.log(e.response)
        })//.then(function (response) {
        //     console.log("=========Regi 0k==========");
        //     console.log(response.data);
        //     console.log(response.status);
        //     console.log(response.statusText);
        //     console.log(response.headers);
        //     console.log(response.config);
        // }).catch(function (error) {
        //     console.log("===========Regi Not OK==========");
        //    // console.log(error);
        //     console.log(error.response);
        // });
        console.log("=======final=======")
        console.log(result)
        return result
    }
};

export default DataAccessService;