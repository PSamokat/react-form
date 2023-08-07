import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { Accept, DropzoneOptions, useDropzone } from 'react-dropzone';
import { useField, useFormikContext } from 'formik';
import deleteIcon from 'src/common/assets/cross.svg';
import uploadIcon from 'src/common/assets/upload.svg';
import FieldError from 'src/common/components/field-error';
import { AcceptedDocumentType, getDocumentTypeInfo } from 'src/common/types/common';
import { formatSize } from 'src/common/utils/common';

import './dropfile-field.scss';

interface DropFileFieldProps extends DropzoneOptions {
    name?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    acceptedTypes?: AcceptedDocumentType[];
}

const DropFileField: React.FC<DropFileFieldProps> = ({
    name,
    label,
    disabled,
    required,
    acceptedTypes = [],
    ...props
}) => {
    const formContext = useFormikContext();
    const [field, meta, helper] = useField<File[]>(name);
    const accept: Accept = useMemo(
        () =>
            acceptedTypes.reduce(
                (acceptField, type) => ({ ...acceptField, [getDocumentTypeInfo(type).code]: [] }),
                {},
            ),
        [acceptedTypes],
    );

    const {
        getInputProps, getRootProps, open, isDragActive, acceptedFiles,
    } = useDropzone({
        noClick: true,
        disabled,
        accept: acceptedTypes.length > 0 ? accept : { 'image/*': [] },
        ...props,
    });

    const removeFile: (indexToRemove: number) => void = useCallback(
        (indexToRemove) => {
            if (disabled) {
                return;
            }
            helper.setValue(field.value.filter((_, index) => indexToRemove !== index));
            acceptedFiles.splice(indexToRemove, 1);
        },
        [acceptedFiles, field.value],
    );

    useEffect(() => {
        helper.setValue([...acceptedFiles]);
    }, [acceptedFiles]);

    useEffect(() => {
        if (formContext.values?.[name]) {
            helper.setValue([...formContext.values[name]]);
        }
    }, []);

    const isError = meta.error && meta.touched;

    return (
        <div className="dropfile">
            <div className="dropfile__label">
                { label }
                { required && ' *' }
            </div>

            <div
                className={ `dropfile__field
                    ${isDragActive ? ' active' : ''}
                    ${disabled ? ' disabled' : ''}
                    ${isError ? ' error' : ''}` }
                { ...getRootProps() }
            >
                <input { ...getInputProps() } />
                <div className="dropfile__content">
                    { isDragActive || field?.value?.length > 0 ? (
                        field?.value?.map((file, index) => (
                            <div className="dropfile__content-droped" key={ file.size }>
                                <div className="dropfile__document">
                                    <div className="dropfile__document-status">✓</div>
                                    <div className="dropfile__document-name">{ file.name }</div>
                                    <div className="dropfile__document-size">
                                        { formatSize(file.size) }
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="dropfile__delete"
                                    onClick={ () => removeFile(index) }
                                >
                                    <img src={ deleteIcon } alt="del" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="dropfile__content-empty">
                            <div className="dropfile__placeholder">
                                Выберите или перетащите файл{ ' ' }
                                { acceptedTypes.map((type) => getDocumentTypeInfo(type).name) }
                            </div>

                            <button type="button" onClick={ open } className="dropfile__button">
                                <img src={ uploadIcon } alt="Open" />
                            </button>
                        </div>
                    ) }
                </div>
            </div>
            { isError && <FieldError errorMessage={ meta.error } /> }
        </div>
    );
};

export default DropFileField;
