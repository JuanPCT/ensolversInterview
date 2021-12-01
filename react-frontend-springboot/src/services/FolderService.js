import axios from 'axios'

const FOLDERS_REST_API_URL = 'http://localhost:9191/folders';
const DELETE_FOLDER_REST_API_URL = 'http://localhost:9191/deleteFolder/';
const ADD_FOLDER_REST_API_URL = 'http://localhost:9191/addFolder/';
const UPDATE_FOLDER_REST_API_URL = 'http://localhost:9191/updateFolder';


class FolderService {
    getFolders(){
        return axios.get(FOLDERS_REST_API_URL);
    }
    deleteFolders(id){
        return axios.delete(DELETE_FOLDER_REST_API_URL + id);
    }
    addFolders(itemName){
        return axios.post(ADD_FOLDER_REST_API_URL,{name:itemName});
    }
    editFolders(folderID,items){
        return axios.put(UPDATE_FOLDER_REST_API_URL,{id:folderID,items:items})
    }
}

export default new FolderService();