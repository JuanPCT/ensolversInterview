import axios from 'axios'

const ITEMS_REST_API_URL = 'http://localhost:9191/items';
const DELETE_ITEM_REST_API_URL = 'http://localhost:9191/delete/';
const ADD_ITEM_REST_API_URL = 'http://localhost:9191/addItem/';
const UPDATE_ITEM_REST_API_URL = 'http://localhost:9191/update';


class ItemService {
    getProducts(){
        return axios.get(ITEMS_REST_API_URL);
    }
    deleteProduct(id){
        return axios.delete(DELETE_ITEM_REST_API_URL + id);
    }
    addProduct(productName){
        return axios.post(ADD_ITEM_REST_API_URL,{name:productName});
    }
    editProduct(productID, productNameEdit){
        return axios.put(UPDATE_ITEM_REST_API_URL,{id:productID,name:productNameEdit})
    }
}

export default new ItemService();