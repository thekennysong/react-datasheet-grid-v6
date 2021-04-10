import { Column } from '../typings';
export declare function textColumn<TRow = any>({ key, ...rest }: Partial<Column<TRow>> & {
    key: string;
}): Partial<Column<TRow>>;
