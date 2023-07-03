import React from 'react';
import plusImage from 'src/common/assets/group-plus.svg';

import './header-icon.scss';

const HeaderIcon = ({ image }) => (
    <div className="header-icon">
        <img className="header-icon__image" src={ image } alt="icon" />
        <img className="header-icon__plus" src={ plusImage } alt="+" />
    </div>
);

export default HeaderIcon;
