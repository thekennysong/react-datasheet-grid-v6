import { DataSheetGridProps } from '../typings';
export declare function DataSheetGrid<TRow = any>({ data, onChange, columns: rawColumns, height, rowHeight, headerRowHeight, gutterColumnWidth, createRow, duplicateRow, isRowEmpty, counterComponent, contextMenuComponent, autoAddRow, lockRows, disableContextMenu: disableContextMenuRaw, renderGutterColumn, }: DataSheetGridProps<TRow>): JSX.Element;
