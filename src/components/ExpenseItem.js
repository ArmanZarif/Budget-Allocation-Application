import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaPlusCircle,FaMinusCircle } from 'react-icons/fa';

const ExpenseItem = (props) => {
    const { dispatch, Location} = useContext(AppContext);

    const handleDeleteItem = () => {
        const item = {
            name: props.name,
        };

        dispatch({
            type: 'DELETE_ITEM',
            payload: item,
        });
    };

    const handleIncreaseByTen = () => {
        dispatch({
            type:'ADD_QUANTITY',
            payload:{name:props.name,quantity:10}
        })
    }
    const handleDecreaseByTen = () => {
        dispatch({
            type:'RED_QUANTITY',
            payload:{name:props.name,quantity:10}
        })
    }


    return (
        <tr>
        <td>{props.name}</td>
        <td>{Location.charAt(0)} {props.quantity}</td>
        <td><FaPlusCircle size='2.2em' color="green" onClick={handleIncreaseByTen}></FaPlusCircle></td>
        <td><FaMinusCircle  size='2.2em' color="red" onClick={handleDecreaseByTen}></FaMinusCircle ></td>
        
        <td onClick={handleDeleteItem}>❌</td>
        </tr>
    );
};

export default ExpenseItem;