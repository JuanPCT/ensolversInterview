import React from 'react';
import ItemService from "../services/ItemService";
import FolderService from "../services/FolderService";

class ItemComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items:[],

            folders:[],

            itemNameID:[],
            folderName:"",

            showOptions:false,

            itemID:"",
            itemNameEdit:"",

            itemNameEditID:[],

        }
        this.deleteHandler = this.deleteHandler.bind(this);
        this.deleteHandlerFolder = this.deleteHandlerFolder.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeHandlerID = this.changeHandlerID.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.showOptionsHandler = this.showOptionsHandler.bind(this);
    }

    deleteHandler(id,idFolder){
        ItemService.deleteItems(id).then(r => {
            //HARD COPY OF STATE- SPREAD OPERATOR
            let tmpState = { ...this.state };
            //FILTER THE ID I WANT TO DELETE OUT

            // console.log(tmpState.folders.find((e)=> e.id === idFolder).items);
            tmpState.folders.find((e)=> e.id === idFolder).items = tmpState.folders.find((e) => e.id === idFolder).items.filter(element => {
                return element.id !== id;
            });  //Delete Item from the Folder
            //SETS THE NEW STATE WITHOUT THE ID I DELETED
            this.setState({folders:tmpState.folders});
            alert(r.data);
        });

    }

    deleteHandlerFolder(id){
        FolderService.deleteFolders(id).then(r => {
            //HARD COPY OF STATE- SPREAD OPERATOR
            let tmpState = { ...this.state };
            //FILTER THE ID I WANT TO DELETE OUT
            const newObj = tmpState.folders.filter(element => {
                return element.id !== id;
            })
            //SETS THE NEW STATE WITHOUT THE ID I DELETED
            this.setState({folders:newObj});
            alert(r.data);

        })
    }

    addHandler(idFolder){
        ItemService.addItems(this.state.itemNameID[idFolder]).then(r  => {
                FolderService.editFolders(idFolder, [r.data]).then(r => {
                    let tmpState = { ...this.state };
                    tmpState.folders.find((e)=> e.id === idFolder).items = r.data.items;
                    this.setState({folders:tmpState.folders});
                })
                this.setState(prevState => ({
                    items: [...prevState.items, r.data]
            }))

            }
        )
    }

    addHandlerFolder(){
        FolderService.addFolders(this.state.folderName).then(r  =>
            this.setState(prevState => ({
                folders: [...prevState.folders, r.data]
            }))
        )

    }



    editHandler(idFolder,id,checkbox) {

        ItemService.editItems(id, this.state.itemNameEditID[id],checkbox).then(r => {

                FolderService.getFolders().then( (r) => {
                    this.setState({ folders: r.data})
                })

                //HARD COPY OF STATE- SPREAD OPERATOR
                let tmpStateEdit = {...this.state};

                //FILTER THE ID I WANT TO UPDATE
                const newObj = tmpStateEdit.items.map(element => {
                    if (element.id === r.data.id ) {
                        element.name = r.data.name;
                        element.checkbox = r.data.checkbox;
                    }
                    return element
                })

                //UPDATES THE NEW PRODUCT
                this.setState({ items: newObj});
            }
        )
    }

    //Modified the Checkbox only.
    editCheckedHandler(e,id){
        ItemService.editItemCheckbox(id, this.state.items.find((e)=> e.id === id).name, e.target.checked ? 1 : 0).then(r => {

                //HARD COPY OF STATE- SPREAD OPERATOR
                let tmpStateEdit = {...this.state};

                //FILTER THE ID I WANT TO UPDATE
                const newObj = tmpStateEdit.items.map(element => {
                    if (element.id === r.data.id ) {
                        element.checkbox = r.data.checkbox;
                    }
                    return element
                })

                //UPDATES THE NEW PRODUCT
                this.setState({ items: newObj});
            }
        )

    }

    //Handler for showing or not some information
    showOptionsHandler(){
        this.setState({showOptions:!this.state.showOptions});
    }

    //Change Handler for New Items
    changeHandler(e){
        this.setState({[e.target.name]:e.target.value});
        console.log(e.target.name);
        //console.log(this.state[e.target.name]); //Debug with the variable
    }

    //Change Handler for Existing Items
    changeHandlerID(e,id){
        const list = this.state[e.target.name].slice();
        list[id] = e.target.value;
        this.setState({[e.target.name]:list})
        //console.log(this.state.itemNameEditID[id]);

    }

    componentDidMount(){
        ItemService.getItems().then(( response ) => {
            this.setState( { items: response.data})
        })
        FolderService.getFolders().then( (r) => {
            this.setState({ folders: r.data})
        })
    }


    render(){
        return(
        <div>
            <h1 className = "text-center"> To-Do Items List </h1>

            <table className = "table table-striped">
                <thead>
                    <tr>
                        <td> Checkbox </td>
                        <td> Item ID </td>
                        <td> Item Name </td>
                        <td> Insert Name </td>
                        <td> Create </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> Null </td>
                        <td> TBD </td>
                        <td> TBD </td>

                        <td> <input type="text" name="folderName" onChange={this.changeHandler}/> </td>
                        <td> <input type="button" value="Add Folder" onClick={() => this.addHandlerFolder()}/> </td>
                    </tr>

                </tbody>
            </table>
            <br/>
            <table className = "table table-striped">
                <thead>
                <tr>
                    <td> Folder ID </td>
                    <td> Folder Name </td>
                    <td> Delete </td>
                    <td> Item name: </td>
                    <td> Add </td>
                    <td> Items </td>

                </tr>
                </thead>
                <tbody>
                {
                    this.state.folders.map(
                        folder =>
                            <tr key={folder.id}>
                                <td> {folder.id}</td>
                                <td> {folder.name} </td>
                                <td> <input type="button" value="Delete" onClick={() => this.deleteHandlerFolder(folder.id)}/>  </td>
                                <td> <input type="text" name="itemNameID" onChange={(e)=> this.changeHandlerID(e,folder.id)}/> </td>
                                <td> <input type="button" value="Add Item" onClick={() => this.addHandler(folder.id)}/> </td>
                                <td> {folder.items.map(
                                    item =>
                                        <tr key = {item.id}>
                                            <td> <input type="checkbox" defaultChecked={item.checkbox} onChange={(e) => this.editCheckedHandler(e,item.id)}/> </td>
                                            <td> {item.id} </td>
                                            <td> {item.name} </td>
                                            <td> <input type="button" value="Delete" onClick={() => this.deleteHandler(item.id,folder.id)}/>  </td>
                                            <td> <input type="text" name="itemNameEditID" onChange={(e) => this.changeHandlerID(e,item.id)}/> </td>
                                            <td> <input type="button" value="Update" onClick={() => this.editHandler(folder.id,item.id,0)}/>  </td>
                                        </tr>

                                )} </td>

                            </tr>
                    )
                }
                </tbody>

            </table>
        </div>
        )
    }
}

export default ItemComponent