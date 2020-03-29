import axios from "axios"
import { AsyncStorage } from 'react-native';

const instance = axios.create({
    baseURL: 'https://finnhub.io/api/v1/'
});
const API_KEY='bpnt9vnrh5ra872dvu20'

const DataAccessService = {
    async getQuote(user_symbol){
        let result = await instance.get(`quote?token=${API_KEY}&symbol=${user_symbol}`)
        if(result.status!=200){
            console.log(result);
            return {error:"API call error"}
        }
        if(result.data=="Symbol not supported"){
            console.log(result);
            return {error:"Symbol not supported"}
        }else{
            // console.log("FINNHUB START");
            // console.log(result.data.c);
            // console.log("FINNHUB END");
            return result.data
        }

    },
    async getCandidate(){

    }
}

export default DataAccessService;