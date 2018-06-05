import React, {Component} from 'react';
import {testProducts} from "../jsonData/products";
import MainTable from './../components/MainTable';
import RebuildTable from './../components/RebuildTable';
import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';

class Product extends Component{
    interval = null;
    constructor(props){
        super(props);
        this.saveIntLocalStorage(testProducts);
        this.state = {
            rebuild: false,
            showUndo: false,
            showRedo: false,
            products: testProducts
        }
    }

    newItem = (e)=> {
        e.preventDefault();
        const {products} = this.state;
        this.saveIntLocalStorage(products,"history");
        products.push({
            item: "" ,
            price:0
        });
        this.saveIntLocalStorage(products);
        this.setState({
            showUndo: true,
            showRedo: false,
            products
        });
    };

    handleChangeItem = (index,value)=>{
        const {products} = this.state;
        products[index].item = value;
        this.saveIntLocalStorage(products);
        this.setState({products});
    };

    handleChangePrice = (index,value)=>{
        const {products} = this.state;
        products[index].price = value;
        this.saveIntLocalStorage(products);
        this.setState({products});
    };

    handleDelete = (index)=>{
        const {products} = this.state;
        this.saveIntLocalStorage(products,"history");
        products.splice(index,1);
        this.saveIntLocalStorage(products);
        this.setState({
            showUndo: true,
            showRedo: false,
            products
        });
    };

    handleBack = (action)=> {
        const { products } = this.state;
        const history = JSON.parse(localStorage.getItem("history"));
        this.saveIntLocalStorage(history);
        this.saveIntLocalStorage(products,"history");
        if(action === "undo"){
            this.setState({
                showUndo: false,
                showRedo: true,
                products:history
            });
        }else{
            this.setState({
                showUndo: true,
                showRedo: false,
                products:history
            });
        }

    };

    saveIntLocalStorage = (products,key)=> {
        if(!key){
            localStorage.setItem("products", JSON.stringify(products));
        }else {
            localStorage.setItem(key, JSON.stringify(products));
        }
    };

    handleRebuildTable = ()=> {
        this.setState({
            rebuild: true,
            showUndo: false,
            showRedo: false,
        });
    };

    handleResult = (result)=> {
        this.saveIntLocalStorage(result);
        this.setState({
                rebuild: false,
                products: result,
            });
    };

    rebuildCancel = ()=>{
        this.setState({
            rebuild: false
        });
    };

    componentDidMount(){
        let products = localStorage.getItem("products");
        if(products){
            products = JSON.parse(products);
            this.setState({products});
        }
        let This = this;
        this.interval = setInterval(()=>{
            products = JSON.parse(localStorage.getItem("products"));
            if(products){
                This.setState({products});
            }

        },2000)
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const { products } = this.state;
        return(
            <Container>
                    <Row>
                        <Col sm="12" xs="12">
                            <MainTable
                                products={products}
                                newItem={this.newItem}
                                handleChangeItem={this.handleChangeItem}
                                handleChangePrice={this.handleChangePrice}
                                handleDelete={this.handleDelete}
                            />
                        </Col>
                        <Col sm="9" xs="9">
                            <Button onClick={(e) => {this.newItem(e)}}>Add new row</Button>&nbsp;
                            { this.state.showUndo && <Button onClick={(e) => {this.handleBack("undo")}}>Undo</Button>}&nbsp;
                            { this.state.showRedo && <Button onClick={(e) => {this.handleBack("redo")}}>Redo</Button>}
                        </Col>
                        <Col  sm="3" xs="3" className="text-center">
                            <Button onClick={()=>{this.handleRebuildTable()}}>{"Rebuild table"}</Button>
                        </Col>
                        <Col  sm="12" xs="12" className="text-center">
                            <hr/>
                        </Col>
                        {
                            this.state.rebuild && <Col sm="12" xs="12">
                                <RebuildTable products={products} handleResult={this.handleResult} rebuildCancel={this.rebuildCancel}/>
                            </Col>
                        }
                    </Row>
            </Container>)
    }
}
export default Product;