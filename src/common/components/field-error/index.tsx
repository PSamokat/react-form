import React from 'react';

import './field-error.scss';

interface FieldErrorProps {
    errorMessage?: string;
}

const FieldError: React.FC<FieldErrorProps> = ({
    errorMessage,
}) => (
    <div className="field-error">
        { errorMessage }
    </div>
);

export default FieldError;
