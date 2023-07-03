import React from 'react';
import { NavLink } from 'react-router-dom';

import { FormRoutes } from '../route-to-component-relation';

const RegistrationAddress: React.FC = () => (
    <div>
        <h1>ЧМО</h1>
        <input type="text" />
        <div>
            <NavLink to={ FormRoutes.RESIDENTIAL }>Дальше</NavLink>
        </div>
    </div>
);

export default RegistrationAddress;
