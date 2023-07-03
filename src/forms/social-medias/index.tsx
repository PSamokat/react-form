import React from 'react';
import { NavLink } from 'react-router-dom';

const SocialMedias: React.FC = () => (
    <div>
        <h1>ПОПУСК</h1>
        <input type="text" />
        <div>
            <NavLink to="/">Сохранить</NavLink>
        </div>
    </div>
);

export default SocialMedias;
