import React from 'react';
import { useField } from 'formik';

type ExpectedProps = {
    name?: string;
    disable?: boolean;
    placeholder?: string;
    label?: string;
};

type ExpectedComponent<P> = React.ComponentType<P> | React.ForwardRefExoticComponent<P>;

export function connectToFormik<Props extends ExpectedProps>(
    OriginalComponent: ExpectedComponent<Props>,
) {
    const NewField: React.FC<Props> = ({
        name,
        ...otherOriginalComponentProps
    }) => {
        const [field, meta] = useField(name);

        return (
            <OriginalComponent
                { ...(otherOriginalComponentProps as any) }
                { ...field }
                { ...meta }
            />
        );
    };

    NewField.displayName = `${OriginalComponent.displayName || OriginalComponent.name}Connected`;

    return NewField;
}
