import axios from "axios"
import { AsyncStorage } from 'react-native';

const instance = axios.create({
    baseURL: 'https://finnhub.io/api/v1/'
});
const API_KEY='bpnt9vnrh5ra872dvu20'

const DataAccessService = {
    async getQuote( user_symbol){
        let result = await instance.get("quote",{
            params:{
                token:API_KEY,
                symbol:user_symbol
            }
        })
        console.log(result)
        if(result.status!=200){
            return{error:"API call error"}
        }
        if(result.data=="Symbol not supported"){
            return{error:"Symbol not supported"}
        }else{
            return result.data
        }

    },
    async getCandidate(){
        console.log("fetch API candidate")
              
        let result= await instance.get("stock/symbol",{
            params:{
                exchange:"US",
                token:API_KEY
            }
        })
        if(result.status!=200){
            return{error:"API call error"}
        }
        let data=result.data
        // data.map(e=> {return {name:(e.discription+"-"+e.symbol),symbol:e.symbol}})
        let output=[]
        data.forEach(e => {
            output.push({name:(`(${e.symbol})${e.description}`),data:e.symbol})
        })
        console.log(output)
        return output
    }
}

export default DataAccessService;