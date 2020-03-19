import axios from "axios"
import { AsyncStorage} from 'react-native';


export default axios.create({
    baseURL: 'http://192.168.1.100:5000/'
  });
