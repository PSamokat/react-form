import React from 'react';
import { Button } from 'antd';

import './action-buttons.scss';

interface ActionButtonProps {
    rejectText?: string;
    acceptText?: string;
    onAccept?: (value: unknown) => Promise<void>;
    onReject?: (value: unknown) => Promise<void>;
    isLoading?: boolean;
}
const ActionButtons: React.FC<ActionButtonProps> = ({
    rejectText,
    acceptText,
    onAccept,
    onReject,
    isLoading,
}) => (
    <div className="actions">
        <div className="actions__container">
            <Button className="actions__button reject" type="link" size="large" onClick={ onReject }>
                { rejectText || 'Отмена' }
            </Button>

        </div>
        <div className="actions__container">
            <Button
                className="actions__button accept"
                type="primary"
                size="large"
                loading={ isLoading }
                htmlType="submit"
                onClick={ onAccept }
            >
                { acceptText || 'Далее' }
            </Button>

        </div>

    </div>
);

export default ActionButtons;
