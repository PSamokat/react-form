import React, { useCallback, useMemo, useState } from 'react';
import { Accept, DropzoneOptions, useDropzone } from 'react-dropzone';
import deleteIcon from 'src/common/assets/cross.svg';
import uploadIcon from 'src/common/assets/upload.svg';
import { AcceptedDocumentType, getDocumentTypeInfo } from 'src/common/types/customer';

import './dropfile-field.scss';

interface DropFileFieldProps extends DropzoneOptions {
    name?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    acceptedTypes?: AcceptedDocumentType[];
    onDrop?: (acceptedFiles: File[]) => void;
    onRemove?: () => void;
}

const DropFileField: React.FC<DropFileFieldProps> = ({
    name,
    label,
    required,
    disabled,
    acceptedTypes = [],
    onDrop,
    onRemove,
    ...props
}) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const accept: Accept = useMemo(
        () =>
            acceptedTypes.reduce(
                (acceptField, type) => ({ ...acceptField, [getDocumentTypeInfo(type).code]: [] }),
                {},
            ),
        [acceptedTypes],
    );
    const handleOnDrop: (files: File[]) => void = useCallback((files) => {
        setUploadedFiles(files);
        onDrop(files);
    }, [onDrop]);
    const {
        getInputProps, getRootProps, open, isDragActive, acceptedFiles,
    } = useDropzone({
        noClick: true,
        accept: acceptedTypes.length > 0 ? accept : { 'image/*': [] },
        onDrop: handleOnDrop,
        ...props,
    });

    const removeFile: (indexToRemove: number) => void = useCallback(
        (indexToRemove) => {
            setUploadedFiles((prevFiles) =>
                prevFiles.filter((_, index) => indexToRemove !== index));
            acceptedFiles.splice(indexToRemove, 1);
            onRemove();
        },
        [acceptedFiles],
    );

    return (
        <div className="dropfile">
            <div className="dropfile__label">
                { label }
                { required && ' *' }
            </div>

            <div
                className={ `dropfile__field${isDragActive ? ' active' : ''}${
                    disabled ? ' disabled' : ''
                }` }
                { ...getRootProps() }
            >
                <input { ...getInputProps() } />
                <div className="dropfile__content">
                    { isDragActive || uploadedFiles.length > 0 ? (
                        uploadedFiles.map((file, index) => (
                            <div className="dropfile__content-droped" key={ file.size }>
                                <div className="dropfile__document">{ file.name }</div>
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
        </div>
    );
};

export default DropFileField;
