import React from 'react';
import ItemService from "../services/ItemService";

class ItemComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items:[],

            itemName:"",

            showOptions:false,

            itemID:"",
            itemNameEdit:"",

            itemNameEditID:[],

        }
        this.deleteHandler = this.deleteHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeHandlerID = this.changeHandlerID.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.showOptionsHandler = this.showOptionsHandler.bind(this);
    }

    deleteHandler(id){
        ItemService.deleteItems(id).then(r => {
            //HARD COPY OF STATE- SPREAD OPERATOR
            let tmpState = { ...this.state };
            //FILTER THE ID I WANT TO DELETE OUT
            const newObj = tmpState.items.filter(element => {
                return element.id !== id;
            })
            //SETS THE NEW STATE WITHOUT THE ID I DELETED
            this.setState({items:newObj});
            alert(r.data);
        });

    }

    addHandler(){
        ItemService.addItems(this.state.itemName).then(r  =>
                this.setState(prevState => ({
                    items: [...prevState.items, r.data]
                }))
        )

    }

    editHandler(id,checkbox) {

        ItemService.editItems(id, this.state.itemNameEditID[id],checkbox).then(r => {

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
        const list = this.state.itemNameEditID.slice();
        list[id] = e.target.value;
        this.setState({itemNameEditID:list})
        //console.log(this.state.itemNameEditID[id]);

    }

    componentDidMount(){
        ItemService.getItems().then(( response ) => {
            this.setState( { items: response.data})
        })
    }


    render(){
        return(
        <div>
            {/*<h1 className = "text-center"> Actions List </h1>*/}
            {/*<input type="button" value="Show Options" onClick={this.showOptionsHandler}/>*/}
            {/*{ this.state.showOptions ?*/}
            {/*<table className="table table-striped">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <td> Item ID</td>*/}
            {/*        <td> Item Name</td>*/}
            {/*        <td> Submit</td>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}

            {/*    <tbody>*/}

            {/*    </tbody>*/}

            {/*    <tbody>*/}

            {/*    </tbody>*/}
            {/*</table> : null*/}
            {/*}*/}

            <h1 className = "text-center"> To-Do Items List </h1>

            <table className = "table table-striped">
                <thead>
                    <tr>
                        <td> Checkbox </td>
                        <td> Item ID </td>
                        <td> Item Name </td>
                        <td> Delete </td>
                        <td> Insert Name </td>
                        <td> Update / Create </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> Null </td>
                        <td> TBD </td>
                        <td> TBD </td>
                        <td> Null </td>
                        <td> <input type="text" name="itemName" onChange={this.changeHandler}/> </td>
                        <td> <input type="button" value="Add Item" onClick={() => this.addHandler()}/> </td>
                    </tr>
                    {
                        this.state.items.map(
                            item =>
                            <tr key = {item.id}>
                                <td> <input type="checkbox" checked={item.checkbox} onChange={(e) => this.editCheckedHandler(e,item.id)}/> </td>
                                <td> {item.id} </td>
                                <td> {item.name} </td>
                                <td> <input type="button" value="Delete" onClick={() => this.deleteHandler(item.id)}/>  </td>
                                <td><input type="text" name="itemNameEditID" onChange={(e) => this.changeHandlerID(e,item.id)}/></td>
                                <td> <input type="button" value="Update" onClick={() => this.editHandler(item.id,0)}/>  </td>
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