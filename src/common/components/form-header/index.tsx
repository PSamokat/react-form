import React from 'react';
import plusImage from 'src/common/assets/group-plus.svg';

import './form-header.scss';

interface FormHeaderProps {
    image: string;
    title: string;
    description: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ image, title, description }) => (
    <div className="header">
        <div className="header__icon">
            <img className="header__image" src={ image } alt="icon" />
            <img className="header__plus" src={ plusImage } alt="+" />
        </div>
        <div className="header__text">
            <div className="header__title">{ title }</div>
            <div className="header__description">{ description }</div>
        </div>
    </div>
);

export default FormHeader;
