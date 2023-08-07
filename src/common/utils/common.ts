const units = ['Б', 'КБ', 'МБ', 'ГБ'];
const base = 1024;

export const formatSize: (size: number) => string = (size) => {
    const { value, unit } = units.reduce(
        (acc, _, index) => {
            if (acc.value >= base && index < units.length - 1) {
                return { value: acc.value / base, unit: units[index + 1] };
            }

            return acc;
        },
        { value: size, unit: units[0] },
    );

    return `${value.toFixed(1)} ${unit}`;
};
