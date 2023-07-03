import React from 'react';
import {
    BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import { routeToComponentRelation } from '../../forms/route-to-component-relation';

import FormProgress from './form-progress';

import './App.scss';

const App: React.FC = () => (
    <BrowserRouter>
        <div className="app">
            <div className="app__form-progress">
                <FormProgress />
            </div>
            <div className="app__form">
                <Routes>
                    { Object.keys(routeToComponentRelation).map((route) => {
                        const Component = routeToComponentRelation[route];

                        return <Route key={ route } path={ route } element={ <Component /> } />;
                    }) }
                    <Route path="*" element={ <Navigate to="/general" /> } />
                </Routes>
            </div>
        </div>
    </BrowserRouter>
);

export default App;
