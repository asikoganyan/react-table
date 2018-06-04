import React, {Component} from 'react';
import PropTypes from 'prop-types';
import
{
    Table,
    Button,
    Input
} from 'reactstrap';

class RebuildTable extends  Component {
    constructor(props){
        super(props);
        this.state = {
            products:[]
        };
    }
    componentDidMount(){
        const {products} = this.props;
        for(let product of products ){
            product.checked = false;
        }
        this.setState({
            products
        });
    }

    handleSelect(key){
        const {products} = this.state;
        products[key].checked = !products[key].checked;
        this.setState({
            products
        });
    }

    save = ()=>{
        const { products } = this.state;
        const result = [];
        for(let product of products){
            if(product.checked){
                delete product.checked;
                result.push(product);
            }
        }
        this.props.handleResult(result);
    };

    render(){
        return(
            <section>
                <Table>
                    <thead>
                    <tr>
                        <th className="text-center">Check</th>
                        <th className="text-center">#</th>
                        <th className="text-center">Item</th>
                        <th className="text-center">Cost per lb/kg </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.products.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">
                                        <Input type="checkbox" onClick={()=>{this.handleSelect(index)}} checked={value.checked}/>
                                    </td>
                                    <th scope="row" className="text-center">{index + 1}</th>
                                    <td className="text-center">
                                        {value.item}
                                    </td>
                                    <td className="text-center">
                                        ${value.price}
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
                <Button onClick={()=>{this.save()}}>Save</Button>&nbsp;
                <Button onClick={()=>{this.props.rebuildCancel()}}>Cancel</Button>
            </section>
        );
    }
}

RebuildTable.propTypes = {
    products: PropTypes.array,
    handleResult: PropTypes.func,
    rebuildCancel: PropTypes.func,
};

export default RebuildTable;