import React from 'react';
import ProductService from '../services/ItemService'

class ItemComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items:[],

            itemName:"",

            showOptions:false,

            itemID:"",
            itemNameEdit:"",

        }
        this.deleteHandler = this.deleteHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.showOptionsHandler = this.showOptionsHandler.bind(this);
    }

    deleteHandler(id){
        ProductService.deleteItems(id).then(r => {
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
        ProductService.addItems(this.state.itemName).then(r  =>
                this.setState(prevState => ({
                    items: [...prevState.items, r.data]
                }))
        )

    }

    editHandler() {
        ProductService.editItems(this.state.itemID, this.state.itemNameEdit).then(r => {

                //HARD COPY OF STATE- SPREAD OPERATOR
                let tmpStateEdit = {...this.state};

                //FILTER THE ID I WANT TO UPDATE
                const newObj = tmpStateEdit.items.map(element => {
                    if (element.id === r.data.id ) {
                        element.name = r.data.name;
                        element.quantity = r.data.quantity;
                        element.price = r.data.price;
                    }
                    return element
                })

                //UPDATES THE NEW PRODUCT
                this.setState({ items: newObj});
            }
        )
    }


    showOptionsHandler(){
        this.setState({showOptions:!this.state.showOptions});

    }

    //Change the state as you type
    changeHandler(e){
        this.setState({[e.target.name]:e.target.value});
        //console.log(this.state[e.target.name]); //Debug with the variable
    }

    componentDidMount(){
        ProductService.getItems().then(( response ) => {
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
                        <td> Item ID </td>
                        <td> Item Name </td>
                        <td> Actions </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> Null </td>
                        <td><input type="text" name="itemName" onChange={this.changeHandler}/></td>
                        <td><input type="button" value="Add Item" onClick={() => this.addHandler()}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="itemID" onChange={this.changeHandler}/></td>
                        <td><input type="text" name="itemNameEdit" onChange={this.changeHandler}/></td>
                        <td><input type="button" value="Edit Item" onClick={() => this.editHandler()}/></td>
                    </tr>
                    {
                        this.state.items.map(
                            item =>
                            <tr key = {item.id}>
                                <td> {item.id} </td>
                                <td> {item.name} </td>
                                <td> <input type="button" value="Delete" onClick={() => this.deleteHandler(item.id)}/>  </td>
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