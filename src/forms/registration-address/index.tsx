import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormRoutes } from 'src/forms/route-to-component-relation';

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
