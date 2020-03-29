import axios from "axios"
import { AsyncStorage } from 'react-native';


var instance = axios.create({
    baseURL: 'http://10.0.0.202:5000/'
});

const DataAccessService = {
    async login(username, password) {
        if(username==null||username.length<3){
            console.log("using test account")
            username= "a@a.com"
            password= "P@ssw0rd!"
        }
        var result = await instance.post('api/login', {
            "email": username,
            "password":password,
            RemenberMe: false
        })
        if (result.status == 200 && result.data.status == 200) {
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
    },
    async buy(symbol) {
        console.log("Inside buy context");
        console.log(symbol);
        try {
            let token = await AsyncStorage.getItem("userToken")
            if (token != null) {
                token = `Bearer ${token}`
                let data = {
                    "Symbol": symbol,
                    "Count": 200,
                    "CurrentPrice": 100
                };
                let result = await instance.put("api/buy", data , {
                    headers: {
                        'Accept': '*',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).catch((e) => {
                    return e.response
                })
                return result.data
            }
        } catch (e) {
        }
        return "error!!!!!!"
    },
    async sell(symbol) {
        console.log("Inside sell context");
        try {
            let token = await AsyncStorage.getItem("userToken")
            if (token != null) {
                token = `Bearer ${token}`
                let data = {
                    "Symbol": symbol,
                    "Count": 200,
                    "CurrentPrice": 100
                };
                let result = await instance.put("api/sell", data , {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).catch((e) => {
                    return e.response
                })
                return result.data
            }
        } catch (e) {
        }
        return "error!!!!!!"
    }
};

export default DataAccessService;