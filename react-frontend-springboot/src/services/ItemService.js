import axios from 'axios'

const ITEMS_REST_API_URL = 'http://localhost:9191/items';
const DELETE_ITEM_REST_API_URL = 'http://localhost:9191/delete/';
const ADD_ITEM_REST_API_URL = 'http://localhost:9191/addItem/';
const UPDATE_ITEM_REST_API_URL = 'http://localhost:9191/update';


class ItemService {
    getItems(){
        return axios.get(ITEMS_REST_API_URL);
    }
    deleteItems(id){
        return axios.delete(DELETE_ITEM_REST_API_URL + id);
    }
    addItems(itemName){
        return axios.post(ADD_ITEM_REST_API_URL,{name:itemName});
    }
    editItems(itemID, itemNameEditID){
        return axios.put(UPDATE_ITEM_REST_API_URL,{id:itemID,name:itemNameEditID})
    }
}

export default new ItemService();