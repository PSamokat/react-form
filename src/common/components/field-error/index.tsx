import React from 'react';

import './field-error.scss';

interface FieldErrorProps {
    visibility?: boolean;
    errorMessage?: string;
}

const FieldError: React.FC<FieldErrorProps> = ({
    visibility,
    errorMessage,
}) => (
    <div className={ `field-error${visibility ? ' visible' : ''}` }>
        { errorMessage }
    </div>
);

export default FieldError;
