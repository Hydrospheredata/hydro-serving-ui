import { capitalizeString } from '@shared/utils/capitalize-string';

export const fromSnakeToCamel = (str: string): string => {
    const [head, ...tail] = str.split('_');
    const res = tail
        .map( w => capitalizeString(w))
        .join();
    return head + res;
};
