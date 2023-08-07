import { SchemaObject } from 'Src/common/types/common';
import { SocialMediasFieldsModel } from 'Src/forms/social-medias/form-model';
import { array, object, string } from 'yup';

export const socialMediasFieldsSchema = object().shape<SchemaObject<SocialMediasFieldsModel>>({
    socials: array()
        .min(1, 'Укажите как минимум одну социальную сеть')
        .of(
            object({
                platformName: string().required('Выберите из списка'),
                url: string().when('platformName', {
                    is: (platformName) => typeof platformName === 'string' && platformName.length > 0,
                    then: (schema) => schema.matches(
                        /[-a-zA-Z0-9@:%_.~#?&=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&=]*)?/gi,
                        'Введите праавильные URL адресс',
                    ).required('Заполните поле'),
                }),
            }),
        ),
});
