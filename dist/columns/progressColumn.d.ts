import { Column } from '../typings';
export declare function progressColumn<TRow = any>({ key, ...rest }: Partial<Column<TRow>> & {
    key: string;
}): Partial<Column<TRow>>;
