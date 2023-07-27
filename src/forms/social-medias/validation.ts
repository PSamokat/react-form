import * as Yup from 'yup';

export const socialMediasFieldsSchema = Yup.object({
    socials: Yup.array()
        .min(1, 'Укажите как минимум одну социальную сеть')
        .of(
            Yup.object({
                platformName: Yup.string().required('Выберите из списка'),
                url: Yup.string().when('platformName', {
                    is: (platformName) => typeof platformName === 'string' && platformName.length > 0,
                    then: (schema) => schema.matches(
                        /[-a-zA-Z0-9@:%_.~#?&=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&=]*)?/gi,
                        'Введите праавильные URL адресс',
                    ).required('Заполните поле'),
                }),

            }),
        ),
});
