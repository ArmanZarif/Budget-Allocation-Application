// this is the Budget allocation app
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';





import { AppProvider } from './context/AppContext';
import Remaining from './components/Remaining';
import ExpenseList from './components/ExpenseList';
import ItemSelected from './components/ItemSelected';
import Budget from './components/Budget';
import SpentSoFar from './components/SpentSoFar';
import Currency from './components/Currency';

const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                <h1 className='mt-3'>Company's Budget Allocation</h1>
                <div className='row mt-3'> 

                    <div className='col-sm'>
                        <Budget />
                    </div>

                    <div className='col-sm'>
                        <Remaining />
                    </div>
                    
                    <div className='col-sm'>
                        <SpentSoFar />
                    </div>
                    <div className='col-sm'>
                        <Currency />
                    </div>
                </div>
                <h3 className='mt-3'>Allocation</h3>
                <div className='row '>
                    <div className='col-sm'>
                        <ExpenseList />
                    </div>
                </div>
                <h3 className='mt-3'>Change allocation</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <ItemSelected/>
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};
export default App;