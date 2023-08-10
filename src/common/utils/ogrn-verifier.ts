import memoize from 'memoize-one';

const checkOGRN = {
    entrepreneur(ogrn: number[]): boolean {
        return (
            ogrn.length === 13 && ogrn[12] === Math.floor((Number(ogrn.join('')) / 10) % 11) % 10
        );
    },
    business(ogrn: number[]): boolean {
        return (
            ogrn.length === 15 && ogrn[14] === Math.floor((Number(ogrn.join('')) / 10) % 13) % 10
        );
    },
};

export const isValidOGRN = memoize((value: string): boolean => {
    const ogrn = value.split('').map(Number);

    return checkOGRN.business(ogrn) || checkOGRN.entrepreneur(ogrn);
});
