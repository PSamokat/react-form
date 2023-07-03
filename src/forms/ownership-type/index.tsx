import React from 'react';
import { NavLink } from 'react-router-dom';

import { FormRoutes } from '../route-to-component-relation';

const OwnershipType: React.FC = () => (
    <div>
        <h1>Пидр</h1>
        <input type="text" />
        <div>
            <NavLink to={ FormRoutes.REGISTRATION }>Дальше</NavLink>
        </div>
    </div>
);

export default OwnershipType;
