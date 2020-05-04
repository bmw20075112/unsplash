import axios from "axios";
import accessKeys from './access-key';
export function searchPhotos(term,params){
    return axios({
        method:'get',
        url:'https://api.unsplash.com/search/photos/',
        params:{
            client_id:accessKeys.client_id,
            query:term,
            page:1,
            per_page:10,
            ...params
        }
    })
}