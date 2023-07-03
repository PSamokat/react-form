import React from 'react';
import { NavLink } from 'react-router-dom';

import { FormRoutes } from '../route-to-component-relation';

const ResidentialAddress: React.FC = () => (
    <div>
        <h1>ЧОРТ</h1>
        <input type="text" />
        <div>
            <NavLink to={ FormRoutes.SOCIALS }>Дальше</NavLink>
        </div>
    </div>
);

export default ResidentialAddress;
