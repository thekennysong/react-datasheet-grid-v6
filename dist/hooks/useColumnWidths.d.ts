import { Column } from '../typings';
export declare const useColumnWidths: (width: number, columns: Column[], includeScrollbar: boolean) => {
    widths: number[] | null;
    offsets: number[] | null;
    innerWidth: number | null;
};
