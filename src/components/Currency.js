import React, { useContext, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { AppContext } from "../context/AppContext";




const Currency = ()=>{

    const {Location,dispatch} = useContext(AppContext)
    
    const handleCurrencyChange = (currencyLoc)=>{
        dispatch({
            type:'CHG_LOCATION',
            payload:currencyLoc
        })
    }

    return(
        <Dropdown>
      <Dropdown.Toggle size="lg" variant="info" id="dropdown-basic" className="col-12">
        Currency ({Location})
      </Dropdown.Toggle>

      <Dropdown.Menu className="col-12 bg-success-subtle">
      <Dropdown.Item onClick={() => handleCurrencyChange('$ Dollar')}>$ Dollar</Dropdown.Item>
        <Dropdown.Item onClick={() => handleCurrencyChange('£ Pound')}>£ Pound</Dropdown.Item>
        <Dropdown.Item onClick={() => handleCurrencyChange('€ Euro')}>€ Euro</Dropdown.Item>
        <Dropdown.Item onClick={() => handleCurrencyChange('₹ Rupee')}>₹ Rupee</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
    )

}


export default Currency;