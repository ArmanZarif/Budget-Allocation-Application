import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SpentSoFar = () => {
    const { expenses, Location, SpentSoFar} = useContext(AppContext);
   

    return (
        <div className='alert alert-primary'>
            <span>Spent so far: {Location.charAt(0)}{" "} {SpentSoFar}</span>
        </div>
    );
};

export default SpentSoFar;