import React, {Component} from 'react';
import PropTypes from 'prop-types';
import
{
    Table,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText } from 'reactstrap';

class MainTable extends  Component {
    render(){
        return(
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Cost per lb/kg </th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.products.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <Input type="text" id="item" value={value.item} onChange={(e)=>{this.props.handleChangeItem(index,e.target.value)}}/>
                                    </td>
                                    <td>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>$</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="number" min={0.0} step={0.1} id="price" value={value.price} onChange={(e)=>{this.props.handleChangePrice(index,e.target.value)}}/>
                                        </InputGroup>
                                    </td>
                                    <td><Button color="danger" onClick={()=>{this.props.handleDelete(index)}}>delete</Button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
        );
    }
}

MainTable.propTypes = {
    products: PropTypes.array,
    handleChangeItem: PropTypes.func.isRequired,
    handleChangePrice: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    newItem: PropTypes.func.isRequired,
};

export default MainTable;