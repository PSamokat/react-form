import { FormRoutes } from 'src/forms/route-to-component-relation';

export const stepsComposition: FormRoutes[] = [
    FormRoutes.GENERAL,
    FormRoutes.OWNERSHIP,
    FormRoutes.REGISTRATION,
    FormRoutes.RESIDENTIAL,
    FormRoutes.SOCIALS,
];
export const STEPS = [
    'Общие',
    'Форма собственности',
    'Адрес регистрации',
    'Адрес проживания',
    'Социальные сети',
];
export enum StepStatus {
    DONE = 'done',
    CURRENT = 'current',
    UPCOMING = 'upcoming',
}
