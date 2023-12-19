import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { Remaining, Location} = useContext(AppContext);    

    return (
        <div className='alert alert-primary'>
            <span>Remaining: {Location.charAt(0)}{" "}{Remaining}</span>
        </div>
    );
};

export default Remaining;