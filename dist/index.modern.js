import { createElement, useRef, useLayoutEffect, useState, useEffect, Fragment, createContext, memo, useContext, useMemo, forwardRef, useCallback } from 'react';
import { VariableSizeList } from 'react-window';
import cx from 'classnames';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';
import { throttle } from 'throttle-debounce';
import deepEqual from 'fast-deep-equal';
import useResizeObserver from '@react-hook/resize-observer';

const Component = ({
  focus,
  onChange,
  value
}) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (focus) {
      var _ref$current;

      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.select();
    } else {
      var _ref$current2;

      (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.blur();
    }
  }, [focus]);
  return createElement("input", {
    className: 'dsg-input',
    ref: ref,
    style: {
      pointerEvents: focus ? 'auto' : 'none'
    },
    value: value || '',
    onChange: e => onChange(e.target.value || null)
  });
};

function textColumn({
  key,
  ...rest
}) {
  return {
    render: ({
      focus,
      rowData,
      setRowData
    }) => createElement(Component, {
      value: rowData[key],
      focus: focus,
      onChange: value => setRowData({ ...rowData,
        [key]: value
      })
    }),
    deleteValue: ({
      rowData
    }) => ({ ...rowData,
      [key]: null
    }),
    copyValue: ({
      rowData
    }) => rowData[key],
    pasteValue: ({
      rowData,
      value
    }) => ({ ...rowData,
      [key]: value || null
    }),
    ...rest
  };
}

const FALSY = ['', 'false', 'no', 'off', 'disabled', '0', 'n', 'f', 'unchecked', 'undefined', 'null', 'wrong', 'negative'];

const Component$1 = ({
  focus,
  active,
  onChange,
  value,
  done
}) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (focus) {
      onChange(!value);
      done({
        nextRow: false
      });
    }
  }, [focus, done]);
  return createElement("input", {
    className: 'dsg-checkbox',
    type: 'checkbox',
    ref: ref,
    checked: Boolean(value),
    onMouseDown: () => !active && onChange(!value),
    onChange: () => null
  });
};

function checkboxColumn({
  key,
  ...rest
}) {
  return {
    render: ({
      focus,
      active,
      setRowData,
      rowData,
      done
    }) => createElement(Component$1, {
      value: rowData[key],
      focus: focus,
      active: active,
      done: done,
      onChange: value => setRowData({ ...rowData,
        [key]: value
      })
    }),
    deleteValue: ({
      rowData
    }) => ({ ...rowData,
      [key]: false
    }),
    copyValue: ({
      rowData
    }) => rowData[key] ? 'YES' : 'NO',
    pasteValue: ({
      rowData,
      value
    }) => ({ ...rowData,
      [key]: !FALSY.includes(value.toLowerCase())
    }),
    ...rest
  };
}

const numberToString = value => typeof value === 'number' && !isNaN(value) ? String(value) : '';

const Component$2 = ({
  focus,
  onChange,
  value,
  typeObj
}) => {
  const [rawValue, setRawValue] = useState(numberToString(value));
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (focus) {
      var _ref$current;

      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.select();
    } else {
      var _ref$current2;

      (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.blur();
    }
  }, [focus]);
  useEffect(() => {
    if (!focus) {
      setRawValue(numberToString(value));
    }
  }, [focus, value]);
  return createElement("input", {
    className: 'dsg-input dsg-input-align-right',
    ref: ref,
    style: {
      pointerEvents: focus ? 'auto' : 'none'
    },
    value: rawValue ? rawValue === '0' ? '-' : Math.abs(Number(rawValue)) > 1000 ? Math.round(Number(rawValue)) : rawValue : '-',
    onChange: e => {
      if (!(typeObj !== null && typeObj !== void 0 && typeObj.includes('Formula'))) {
        const targetValue = e.target.value;
        const number = parseFloat(targetValue);
        setRawValue(targetValue);
        onChange(!isNaN(number) && targetValue ? number : null);
      }
    }
  });
};

function floatColumn({
  key,
  ...rest
}) {
  return {
    render: ({
      focus,
      rowData,
      setRowData
    }) => createElement(Component$2, {
      typeObj: rowData === null || rowData === void 0 ? void 0 : rowData['typeObj'],
      value: rowData[key],
      focus: focus,
      onChange: value => setRowData({ ...rowData,
        [key]: value
      })
    }),
    deleteValue: ({
      rowData
    }) => ({ ...rowData,
      [key]: null
    }),
    copyValue: ({
      rowData
    }) => rowData[key],
    pasteValue: ({
      rowData,
      value
    }) => {
      const number = parseFloat(value);
      return { ...rowData,
        [key]: !isNaN(number) ? number : null
      };
    },
    ...rest
  };
}

const numberToString$1 = value => typeof value === 'number' && !isNaN(value) ? String(value) : '';

const Component$3 = ({
  focus,
  onChange,
  value
}) => {
  const [rawValue, setRawValue] = useState(numberToString$1(value * 100));
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (focus) {
      var _ref$current;

      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.select();
    } else {
      var _ref$current2;

      (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.blur();
    }
  }, [focus]);
  useEffect(() => {
    if (!focus) {
      setRawValue(typeof value === 'number' ? numberToString$1(value * 100) : '');
    }
  }, [focus, value]);
  return createElement(Fragment, null, createElement("input", {
    className: 'dsg-input dsg-input-align-right',
    ref: ref,
    style: {
      pointerEvents: focus ? 'auto' : 'none'
    },
    value: rawValue,
    onChange: e => {
      const targetValue = e.target.value;
      const number = parseFloat(targetValue);
      setRawValue(targetValue);
      onChange(!isNaN(number) && targetValue ? Math.min(100, Math.max(0, number)) / 100 : null);
    }
  }), createElement("span", {
    className: 'dsg-input-suffix'
  }, "%"), createElement("div", {
    className: 'dsg-input-progress-indicator',
    style: {
      width: value * 100 + '%'
    }
  }));
};

function progressColumn({
  key,
  ...rest
}) {
  return {
    render: ({
      focus,
      rowData,
      setRowData
    }) => createElement(Component$3, {
      value: rowData[key],
      focus: focus,
      onChange: value => setRowData({ ...rowData,
        [key]: value
      })
    }),
    deleteValue: ({
      rowData
    }) => ({ ...rowData,
      [key]: null
    }),
    copyValue: ({
      rowData
    }) => typeof rowData[key] === 'number' ? rowData[key] * 100 + '%' : null,
    pasteValue: ({
      rowData,
      value
    }) => {
      const number = parseFloat(value);
      return { ...rowData,
        [key]: !isNaN(number) ? Math.min(100, Math.max(0, number)) / 100 : null
      };
    },
    ...rest
  };
}

const DataSheetGridContext = createContext({
  focus: false,
  activeCell: null,
  headerRowHeight: 0,
  rowHeight: 0,
  columnWidths: [],
  columnOffsets: [],
  innerWidth: 0,
  data: [],
  columns: [],
  selection: null,
  editing: false,
  onChange: () => null,
  isCellDisabled: () => false,
  onDoneEditing: () => undefined,
  onInsertRowAfter: () => undefined,
  onDuplicateRows: () => undefined,
  onDeleteRows: () => undefined
});

const Row = memo(({
  style,
  index: rowIndex
}) => {
  const {
    innerWidth,
    selection,
    data,
    columns,
    activeCell,
    editing,
    onChange,
    isCellDisabled,
    onDoneEditing,
    columnWidths,
    columnOffsets,
    rowHeight,
    onInsertRowAfter,
    onDuplicateRows,
    onDeleteRows
  } = useContext(DataSheetGridContext);
  const headerRow = rowIndex === 0;

  if (headerRow) {
    return null;
  }

  return createElement("div", {
    className: cx({
      'dsg-row': true
    }),
    style: { ...style,
      width: `${innerWidth}px`
    }
  }, columnWidths.map((width, columnIndex) => {
    const gutterColumn = columnIndex === 0;
    const active = (activeCell === null || activeCell === void 0 ? void 0 : activeCell.col) === columnIndex - 1 && activeCell.row === rowIndex - 1;
    const disabled = isCellDisabled({
      col: columnIndex - 1,
      row: rowIndex - 1
    });
    return createElement("div", {
      key: columnIndex,
      className: cx({
        'dsg-cell': true,
        'dsg-cell-disabled': !headerRow && disabled,
        'dsg-cell-gutter': gutterColumn,
        'dsg-cell-last-column': columnIndex === columns.length - 1,
        'dsg-cell-last-row': rowIndex === data.length,
        'dsg-cell-gutter-active': gutterColumn && ((activeCell === null || activeCell === void 0 ? void 0 : activeCell.row) === rowIndex - 1 || selection && rowIndex >= selection.min.row + 1 && rowIndex <= selection.max.row + 1)
      }),
      style: {
        width: `${width}px`,
        left: `${columnOffsets[columnIndex - 1] || 0}px`,
        height: `${rowHeight}px`,
        top: 0
      }
    }, columns[columnIndex].render({
      insertRowBelow: () => {
        onInsertRowAfter(rowIndex - 1);
      },
      duplicateRow: () => {
        onDuplicateRows(rowIndex - 1);
      },
      deleteRow: () => {
        onDeleteRows(rowIndex - 1);
      },
      active,
      focus: active && editing,
      rowIndex: rowIndex - 1,
      rowData: data[rowIndex - 1],
      columnIndex: columnIndex - 1,
      done: onDoneEditing,
      disabled,
      setRowData: rowData => onChange([...data.slice(0, rowIndex - 1), rowData, ...data.slice(rowIndex)])
    }));
  }));
});

const useScrollbarWidth = () => {
  const [width, setWidth] = useState(scrollbarWidth());
  useLayoutEffect(() => {
    setTimeout(() => setWidth(scrollbarWidth()), 0);
  }, []);
  return width;
};

const useColumnWidths = (width, columns, includeScrollbar) => {
  const scrollbarWidth = useScrollbarWidth();
  const [widths, setWidths] = useState(null);
  const innerWidth = useMemo(() => widths && widths.reduce((total, w) => {
    return total + w;
  }), [widths]);
  const offsets = useMemo(() => {
    let total = 0;
    return widths && widths.map((w, i) => {
      total += w;
      return i === widths.length - 1 ? Infinity : total;
    });
  }, [widths]);
  const columnsHash = columns.map(({
    width,
    minWidth,
    maxWidth
  }) => [width, minWidth, maxWidth].join(',')).join('|');
  useEffect(() => {
    if (scrollbarWidth !== undefined || !includeScrollbar) {
      const el = document.createElement('div');
      el.style.display = 'flex';
      el.style.position = 'fixed';
      el.style.width = `${width - (includeScrollbar ? scrollbarWidth : 0)}px`;
      el.style.left = '-999px';
      el.style.top = '-1px';
      const children = columns.map(column => {
        const child = document.createElement('div');
        child.style.display = 'block';
        child.style.flex = String(column.width);
        child.style.minWidth = `${column.minWidth}px`;
        child.style.maxWidth = `${column.maxWidth}px`;
        return child;
      });
      children.forEach(child => el.appendChild(child));
      document.body.insertBefore(el, null);
      setWidths(children.map(child => child.offsetWidth));
      el.remove();
    }
  }, [width, columnsHash, scrollbarWidth, includeScrollbar]);
  return {
    widths,
    offsets,
    innerWidth
  };
};

const buildSquare = (top, right, bottom, left) => {
  return [[left, top], [right, top], [right, bottom], [left, bottom], [left, top]];
};

const buildClipPath = (top, right, bottom, left) => {
  const values = [...buildSquare(0, '100%', '100%', 0), ...buildSquare(top, right, bottom, left)];
  return `polygon(evenodd, ${values.map(pair => pair.map(value => typeof value === 'number' && value !== 0 ? value + 'px' : value).join(' ')).join(',')})`;
};

const InnerContainer = forwardRef(({
  children,
  ...rest
}, ref) => {
  const {
    activeCell,
    columnWidths,
    columnOffsets,
    innerWidth,
    rowHeight,
    headerRowHeight,
    selection,
    data,
    editing,
    columns,
    isCellDisabled
  } = useContext(DataSheetGridContext);

  const extraPixelV = rowI => {
    return rowI < data.length - 1 ? 1 : 0;
  };

  const extraPixelH = colI => {
    return colI < columns.length - 2 ? 1 : 0;
  };

  const activeCellRect = activeCell && {
    width: columnWidths[activeCell.col + 1] + extraPixelH(activeCell.col),
    height: rowHeight + extraPixelV(activeCell.row),
    left: columnWidths.slice(0, activeCell.col + 1).reduce((a, b) => a + b, 0),
    top: rowHeight * activeCell.row + headerRowHeight
  };
  const selectionRect = selection && {
    width: columnWidths.slice(selection.min.col + 1, selection.max.col + 2).reduce((a, b) => a + b, extraPixelH(selection.max.col)),
    height: rowHeight * (selection.max.row - selection.min.row + 1) + extraPixelV(selection.max.row),
    left: columnWidths.slice(0, selection.min.col + 1).reduce((a, b) => a + b, 0),
    top: rowHeight * selection.min.row + headerRowHeight
  };
  const selectionIsDisabled = useMemo(() => {
    if (!selection) {
      return false;
    }

    for (let col = selection.min.col; col <= selection.max.col; ++col) {
      for (let row = selection.min.row; row <= selection.max.row; ++row) {
        if (!isCellDisabled({
          col,
          row
        })) {
          return false;
        }
      }
    }

    return true;
  }, [isCellDisabled, selection]);
  return createElement("div", Object.assign({
    ref: ref
  }, rest), createElement("div", {
    className: cx({
      'dsg-header-row': true
    }),
    style: {
      height: `${headerRowHeight}px`,
      width: `${innerWidth}px`
    }
  }, columnWidths.map((width, columnIndex) => {
    const gutterColumn = columnIndex === 0;
    return createElement("div", {
      key: columnIndex,
      className: cx({
        'dsg-cell': true,
        'dsg-cell-header': true,
        'dsg-cell-gutter': gutterColumn,
        'dsg-cell-last-column': columnIndex === columns.length - 1,
        'dsg-cell-header-active': (activeCell === null || activeCell === void 0 ? void 0 : activeCell.col) === columnIndex - 1 || selection && columnIndex >= selection.min.col + 1 && columnIndex <= selection.max.col + 1
      }),
      style: {
        width: `${width}px`,
        left: `${columnOffsets[columnIndex - 1] || 0}px`,
        height: `${headerRowHeight}px`,
        top: 0
      }
    }, columns[columnIndex].title);
  })), children, activeCellRect && createElement("div", {
    className: cx({
      'dsg-active-cell': true,
      'dsg-active-cell-focus': editing,
      'dsg-active-cell-disabled': activeCell && isCellDisabled(activeCell)
    }),
    style: activeCellRect
  }), selectionRect && activeCellRect && createElement("div", {
    className: cx({
      'dsg-selection-rect': true,
      'dsg-selection-rect-disabled': selectionIsDisabled
    }),
    style: { ...selectionRect,
      clipPath: buildClipPath(activeCellRect.top - selectionRect.top, activeCellRect.left - selectionRect.left, activeCellRect.top + activeCellRect.height - selectionRect.top, activeCellRect.left + activeCellRect.width - selectionRect.left)
    }
  }));
});

const compute = (resultRef, ref) => {
  var _ref$current;

  resultRef.current = ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect()) || null;
};

const throttledCompute = throttle(200, (resultRef, ref, force = false) => {
  if (force) {
    compute(resultRef, ref);
  } else {
    setTimeout(() => compute(resultRef, ref), 0);
  }
});
const useGetBoundingRect = ref => {
  const boundingRect = useRef(null);
  return (force = false) => {
    throttledCompute(boundingRect, ref, force);
    return boundingRect.current;
  };
};

const useDocumentEventListener = (type, listener) => {
  useEffect(() => {
    document.addEventListener(type, listener);
    return () => {
      document.removeEventListener(type, listener);
    };
  }, [listener, type]);
};

const AddRowsCounter = memo(({
  addRows
}) => {
  const [value, setValue] = useState(1);
  const [rawValue, setRawValue] = useState(String(value));
  return createElement("button", {
    className: 'dsg-add-row',
    type: 'button',
    onClick: e => {
      if (e.target.tagName !== 'INPUT') {
        addRows(value);
      }
    }
  }, "Add", createElement("input", {
    className: 'dsg-add-row-input',
    value: rawValue,
    onBlur: () => setRawValue(String(value)),
    onChange: e => {
      setRawValue(e.target.value);
      setValue(Math.max(1, Math.round(parseInt(e.target.value) || 0)));
    },
    onKeyPress: event => {
      if (event.key === 'Enter') {
        addRows(value);
      }
    }
  }), "rows");
});

const renderItem = item => {
  if (item.type === 'DELETE_ROW') {
    return 'Delete row';
  }

  if (item.type === 'DELETE_ROWS') {
    return createElement(Fragment, null, "Delete rows ", createElement("b", null, item.fromRow), " to ", createElement("b", null, item.toRow));
  }

  if (item.type === 'INSERT_ROW_BELLOW') {
    return 'Insert row below';
  }

  if (item.type === 'DUPLICATE_ROW') {
    return 'Duplicate row';
  }

  if (item.type === 'DUPLICATE_ROWS') {
    return createElement(Fragment, null, "Duplicate rows ", createElement("b", null, item.fromRow), " to ", createElement("b", null, item.toRow));
  }

  return item.type;
};

const ContextMenu = ({
  clientX,
  clientY,
  items,
  close
}) => {
  const containerRef = useRef(null);
  const onClickOutside = useCallback(event => {
    var _containerRef$current;

    const clickInside = (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.contains(event.target);

    if (!clickInside) {
      close();
    }
  }, [close]);
  useDocumentEventListener('mousedown', onClickOutside);
  return createElement("div", {
    className: 'dsg-context-menu',
    style: {
      left: clientX + 'px',
      top: clientY + 'px'
    },
    ref: containerRef
  }, items.map(item => createElement("div", {
    key: item.type,
    onClick: item.action,
    className: 'dsg-context-menu-item'
  }, renderItem(item))));
};

const DEFAULT_DATA = [];
const DEFAULT_COLUMNS = [];

const DEFAULT_CREATE_ROW = () => ({});

const DEFAULT_ON_CHANGE = () => null;

const DEFAULT_DUPLICATE_ROW = ({
  rowData
}) => ({ ...rowData
});

const DEFAULT_IS_ROW_EMPTY = ({
  rowData
}) => Object.values(rowData).every(value => !value);

const DEFAULT_RENDER_GUTTER_COLUMN = ({
  rowIndex
}) => rowIndex + 1;

function setStateDeepEqual(newValue) {
  return oldValue => {
    const newVal = typeof newValue === 'function' ? newValue(oldValue) : newValue;
    return deepEqual(oldValue, newVal) ? oldValue : newVal;
  };
}

function DataSheetGrid({
  data = DEFAULT_DATA,
  onChange = DEFAULT_ON_CHANGE,
  columns: rawColumns = DEFAULT_COLUMNS,
  height = 400,
  rowHeight = 40,
  headerRowHeight = rowHeight,
  gutterColumnWidth = '0 0 40px',
  createRow = DEFAULT_CREATE_ROW,
  duplicateRow = DEFAULT_DUPLICATE_ROW,
  isRowEmpty = DEFAULT_IS_ROW_EMPTY,
  counterComponent = AddRowsCounter,
  contextMenuComponent = ContextMenu,
  autoAddRow = false,
  lockRows = false,
  disableContextMenu: disableContextMenuRaw = false,
  renderGutterColumn = DEFAULT_RENDER_GUTTER_COLUMN
}) {
  const disableContextMenu = disableContextMenuRaw || lockRows;
  const columns = useMemo(() => [{
    width: gutterColumnWidth,
    minWidth: 0,
    title: createElement("div", {
      className: 'dsg-corner-indicator'
    }),
    render: renderGutterColumn
  }, ...rawColumns].map(column => ({
    width: 1,
    minWidth: 100,
    render: () => null,
    disableKeys: false,
    disabled: false,
    keepFocus: false,
    deleteValue: ({
      rowData
    }) => rowData,
    copyValue: () => null,
    pasteValue: ({
      rowData
    }) => rowData,
    ...column
  })), [gutterColumnWidth, rawColumns, renderGutterColumn]);
  const [width, setWidth] = useState(0);
  const innerHeight = headerRowHeight + rowHeight * data.length;
  const verticalScrollBar = height < innerHeight;
  const {
    widths: columnWidths,
    offsets: columnOffsets,
    innerWidth
  } = useColumnWidths(width - 1, columns, verticalScrollBar);
  const horizontalScrollBar = (innerWidth || 0) >= width;
  const scrollbarWidth = useScrollbarWidth() || 0;
  const listRef = useRef(null);
  const containerRef = useRef(null);
  const outsideContainerRef = useRef(null);
  const getContainerBoundingRect = useGetBoundingRect(containerRef);
  useLayoutEffect(() => {
    setWidth(w => {
      var _outsideContainerRef$;

      return ((_outsideContainerRef$ = outsideContainerRef.current) === null || _outsideContainerRef$ === void 0 ? void 0 : _outsideContainerRef$.getBoundingClientRect().width) || w;
    });
  }, []);
  useResizeObserver(outsideContainerRef, entry => setWidth(entry.contentRect.width));
  const [editing, setEditing] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [contextMenuItems, setContextMenuItems] = useState([]);
  const [activeCell, setActiveCell] = useState(null);
  const [selectionCell, setSelectionCell] = useState(null);
  const [selectionMode, setSelectionMode] = useState({
    columns: false,
    rows: false,
    active: false
  });
  const selection = useMemo(() => activeCell && selectionCell && {
    min: {
      col: Math.min(activeCell.col, selectionCell === null || selectionCell === void 0 ? void 0 : selectionCell.col),
      row: Math.min(activeCell.row, selectionCell === null || selectionCell === void 0 ? void 0 : selectionCell.row)
    },
    max: {
      col: Math.max(activeCell.col, selectionCell === null || selectionCell === void 0 ? void 0 : selectionCell.col),
      row: Math.max(activeCell.row, selectionCell === null || selectionCell === void 0 ? void 0 : selectionCell.row)
    }
  }, [activeCell, selectionCell]);
  const scrollTo = useCallback(cell => {
    var _listRef$current, _listRef$current2;

    const topMax = cell.row * rowHeight;
    const topMin = (cell.row + 1) * rowHeight + headerRowHeight - ((_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.props.height) + 1;
    const scrollTop = (_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 ? void 0 : _listRef$current2.state.scrollOffset;

    if (scrollTop > topMax) {
      var _listRef$current3;

      (_listRef$current3 = listRef.current) === null || _listRef$current3 === void 0 ? void 0 : _listRef$current3.scrollTo(topMax);
    } else if (scrollTop < topMin) {
      var _listRef$current4;

      (_listRef$current4 = listRef.current) === null || _listRef$current4 === void 0 ? void 0 : _listRef$current4.scrollTo(topMin);
    }

    if (columnOffsets && columnWidths) {
      var _listRef$current5;

      const leftMax = columnOffsets[cell.col] - columnOffsets[0];
      const leftMin = columnOffsets[cell.col] + columnWidths[cell.col + 1] - width + 1;
      const outerRef = (_listRef$current5 = listRef.current) === null || _listRef$current5 === void 0 ? void 0 : _listRef$current5._outerRef;
      const scrollLeft = outerRef.scrollLeft;

      if (scrollLeft > leftMax) {
        outerRef.scrollLeft = 0;
      } else if (scrollLeft < leftMin) {
        outerRef.scrollLeft = 0;
      }
    }
  }, [rowHeight, headerRowHeight, columnOffsets, width, columnWidths]);
  useEffect(() => {
    if (selectionCell) {
      scrollTo(selectionCell);
    }
  }, [selectionCell, scrollTo]);
  useEffect(() => {
    if (activeCell) {
      scrollTo(activeCell);
    }
  }, [activeCell, scrollTo]);
  useEffect(() => {
    if (activeCell !== null) {
      document.activeElement.blur();
    }
  }, [activeCell !== null]);
  const getCursorIndex = useCallback((event, force = false) => {
    var _outsideContainerRef$2;

    const boundingClientRect = getContainerBoundingRect(force);
    const outsideBoundingClientRect = force && ((_outsideContainerRef$2 = outsideContainerRef.current) === null || _outsideContainerRef$2 === void 0 ? void 0 : _outsideContainerRef$2.getBoundingClientRect());

    if (boundingClientRect && columnOffsets) {
      let x = event.clientX - boundingClientRect.left;
      let y = event.clientY - boundingClientRect.top;

      if (outsideBoundingClientRect) {
        if (event.clientY - outsideBoundingClientRect.top <= headerRowHeight) {
          y = 0;
        }

        if (event.clientX - outsideBoundingClientRect.left <= columnOffsets[0]) {
          x = 0;
        }
      }

      return {
        col: columnOffsets.findIndex(right => x < right) - 1,
        row: Math.min(data.length - 1, Math.max(-1, Math.floor((y - headerRowHeight) / rowHeight)))
      };
    }

    return null;
  }, [getContainerBoundingRect, columnOffsets, data.length, headerRowHeight, rowHeight]);
  const isCellDisabled = useCallback(cell => {
    const disabled = columns[cell.col + 1].disabled;
    return Boolean(typeof disabled === 'function' ? disabled({
      rowData: data[cell.row]
    }) : disabled);
  }, [columns, data]);
  const onInsertRowAfter = useCallback((row, count = 1) => {
    if (!createRow) {
      return;
    }

    setSelectionCell(null);
    setEditing(false);

    if (lockRows) {
      return;
    }

    onChange([...data.slice(0, row + 1), ...new Array(count).fill(0).map(createRow), ...data.slice(row + 1)]);
    setActiveCell(setStateDeepEqual(a => ({
      col: (a === null || a === void 0 ? void 0 : a.col) || 0,
      row: row + count
    })));
  }, [createRow, data, lockRows, onChange]);
  const onDoneEditing = useCallback(({
    nextRow: _nextRow = true
  } = {}) => {
    if ((activeCell === null || activeCell === void 0 ? void 0 : activeCell.row) === data.length - 1) {
      if (_nextRow && autoAddRow) {
        onInsertRowAfter(activeCell.row);
      } else {
        setEditing(false);
      }
    } else {
      setEditing(false);

      if (_nextRow) {
        setActiveCell(setStateDeepEqual(a => a && { ...a,
          row: a.row + 1
        }));
      }
    }
  }, [activeCell, autoAddRow, data.length, onInsertRowAfter]);
  const onDuplicateRows = useCallback((rowMin, rowMax = rowMin) => {
    if (lockRows) {
      return;
    }

    onChange([...data.slice(0, rowMax + 1), ...data.slice(rowMin, rowMax + 1).map(rowData => duplicateRow({
      rowData
    })), ...data.slice(rowMax + 1)]);
    setActiveCell(setStateDeepEqual({
      col: 0,
      row: rowMax + 1
    }));
    setSelectionCell(setStateDeepEqual({
      col: columns.length - 2,
      row: 2 * rowMax - rowMin + 1
    }));
    setEditing(false);
  }, [columns.length, data, duplicateRow, lockRows, onChange]);
  const onDeleteRows = useCallback((rowMin, rowMax = rowMin) => {
    if (lockRows) {
      return;
    }

    setEditing(false);
    setActiveCell(setStateDeepEqual(a => {
      const row = Math.min(data.length - 2 - rowMax + rowMin, rowMin);

      if (row < 0) {
        return null;
      }

      return a && { ...a,
        row
      };
    }));
    setSelectionCell(null);
    onChange([...data.slice(0, rowMin), ...data.slice(rowMax + 1)]);
  }, [data, lockRows, onChange]);
  const onDelete = useCallback(() => {
    if (!activeCell) {
      return;
    }

    const min = (selection === null || selection === void 0 ? void 0 : selection.min) || activeCell;
    const max = (selection === null || selection === void 0 ? void 0 : selection.max) || activeCell;

    if (data.slice(min.row, max.row + 1).every(rowData => isRowEmpty({
      rowData
    }))) {
      onDeleteRows(min.row, max.row);
      return;
    }

    const newData = [...data];

    for (let row = min.row; row <= max.row; ++row) {
      for (let col = min.col; col <= max.col; ++col) {
        if (!isCellDisabled({
          col,
          row
        })) {
          const {
            deleteValue = ({
              rowData
            }) => rowData
          } = columns[col + 1];
          newData[row] = deleteValue({
            rowData: newData[row]
          });
        }
      }
    }

    if (deepEqual(newData, data)) {
      setActiveCell(setStateDeepEqual({
        col: 0,
        row: min.row
      }));
      setSelectionCell(setStateDeepEqual({
        col: columns.length - 2,
        row: max.row
      }));
      return;
    }

    onChange(newData);
  }, [activeCell, columns, data, isCellDisabled, isRowEmpty, onChange, onDeleteRows, selection]);
  const onCopy = useCallback(event => {
    if (!editing && activeCell) {
      var _event$clipboardData;

      const copyData = [];
      const min = (selection === null || selection === void 0 ? void 0 : selection.min) || activeCell;
      const max = (selection === null || selection === void 0 ? void 0 : selection.max) || activeCell;

      for (let row = min.row; row <= max.row; ++row) {
        copyData.push([]);

        for (let col = min.col; col <= max.col; ++col) {
          const {
            copyValue = () => null
          } = columns[col + 1];
          copyData[row - min.row].push(copyValue({
            rowData: data[row]
          }));
        }
      }

      (_event$clipboardData = event.clipboardData) === null || _event$clipboardData === void 0 ? void 0 : _event$clipboardData.setData('text/plain', copyData.map(row => row.join('\t')).join('\n'));
      event.preventDefault();
    }
  }, [activeCell, columns, data, editing, selection]);
  useDocumentEventListener('copy', onCopy);
  const onCut = useCallback(event => {
    if (!editing && activeCell) {
      onCopy(event);
      onDelete();
      event.preventDefault();
    }
  }, [activeCell, editing, onCopy, onDelete]);
  useDocumentEventListener('cut', onCut);
  const onPaste = useCallback(async event => {
    if (!editing && activeCell) {
      var _event$clipboardData2;

      const pasteData = ((_event$clipboardData2 = event.clipboardData) === null || _event$clipboardData2 === void 0 ? void 0 : _event$clipboardData2.getData('text').replace(/\r/g, '').split('\n').map(row => row.split('\t'))) || [];
      const min = (selection === null || selection === void 0 ? void 0 : selection.min) || activeCell;
      const max = (selection === null || selection === void 0 ? void 0 : selection.max) || activeCell;

      if (pasteData.length === 1) {
        const newData = [...data];

        for (let columnIndex = 0; columnIndex < pasteData[0].length; columnIndex++) {
          var _columns;

          const pasteValue = (_columns = columns[min.col + columnIndex + 1]) === null || _columns === void 0 ? void 0 : _columns.pasteValue;

          if (pasteValue) {
            for (let rowIndex = min.row; rowIndex <= max.row; rowIndex++) {
              if (!isCellDisabled({
                col: columnIndex + min.col,
                row: rowIndex
              })) {
                newData[rowIndex] = await pasteValue({
                  rowData: newData[rowIndex],
                  value: pasteData[0][columnIndex]
                });
              }
            }
          }
        }

        onChange(newData);
        setActiveCell(setStateDeepEqual({
          col: min.col,
          row: min.row
        }));
        setSelectionCell(setStateDeepEqual({
          col: min.col + pasteData[0].length - 1,
          row: max.row
        }));
      } else {
        let newData = [...data];
        const missingRows = min.row + pasteData.length - data.length;

        if (missingRows > 0) {
          if (!lockRows) {
            newData = [...newData, ...new Array(missingRows).fill(0).map(() => createRow())];
          } else {
            pasteData.splice(pasteData.length - missingRows, missingRows);
          }
        }

        for (let columnIndex = 0; columnIndex < pasteData[0].length && min.col + columnIndex < columns.length - 1; columnIndex++) {
          var _columns2;

          const pasteValue = (_columns2 = columns[min.col + columnIndex + 1]) === null || _columns2 === void 0 ? void 0 : _columns2.pasteValue;

          if (pasteValue) {
            for (let rowIndex = 0; rowIndex < pasteData.length; rowIndex++) {
              if (!isCellDisabled({
                col: min.col + columnIndex,
                row: min.row + rowIndex
              })) {
                newData[min.row + rowIndex] = await pasteValue({
                  rowData: newData[min.row + rowIndex],
                  value: pasteData[rowIndex][columnIndex]
                });
              }
            }
          }
        }

        onChange(newData);
        setActiveCell(setStateDeepEqual({
          col: min.col,
          row: min.row
        }));
        setSelectionCell(setStateDeepEqual({
          col: Math.min(min.col + pasteData[0].length - 1, columns.length - 2),
          row: min.row + pasteData.length - 1
        }));
      }

      event.preventDefault();
    }
  }, [activeCell, columns, createRow, data, editing, isCellDisabled, lockRows, onChange, selection]);
  useDocumentEventListener('paste', onPaste);
  const onMouseMove = useCallback(event => {
    if (selectionMode.active) {
      const cursorIndex = getCursorIndex(event);
      setSelectionCell(setStateDeepEqual(cursorIndex && {
        col: selectionMode.columns ? Math.max(0, cursorIndex.col) : columns.length - 2,
        row: selectionMode.rows ? Math.max(0, cursorIndex.row) : data.length - 1
      }));
      setEditing(false);
    }
  }, [getCursorIndex, selectionMode, columns.length, data.length]);
  useDocumentEventListener('mousemove', onMouseMove);
  const onMouseDown = useCallback(event => {
    var _containerRef$current;

    const rightClick = event.button === 2;
    const clickInside = ((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.contains(event.target)) || false;
    const cursorIndex = clickInside ? getCursorIndex(event, true) : null;

    if (contextMenuItems.length) {
      return;
    }

    if (!clickInside && editing && activeCell && columns[activeCell.col + 1].keepFocus) {
      return;
    }

    const clickOnActiveCell = cursorIndex && activeCell && activeCell.col === cursorIndex.col && activeCell.row === cursorIndex.row && !isCellDisabled(activeCell);

    if (clickOnActiveCell && editing) {
      return;
    }

    const rightClickInSelection = rightClick && selection && cursorIndex && cursorIndex.row >= selection.min.row && cursorIndex.row <= selection.max.row && cursorIndex.col >= selection.min.col && cursorIndex.col <= selection.max.col;
    const rightClickOnSelectedHeaders = rightClick && selection && cursorIndex && cursorIndex.row === -1 && cursorIndex.col >= selection.min.col && cursorIndex.col <= selection.max.col;
    const rightClickOnSelectedGutter = rightClick && selection && cursorIndex && cursorIndex.row >= selection.min.row && cursorIndex.row <= selection.max.row && cursorIndex.col === -1;

    if (rightClick && !disableContextMenu) {
      setTimeout(() => setContextMenu({
        x: event.clientX,
        y: event.clientY
      }), 0);
    }

    setEditing(clickOnActiveCell && !rightClick || false);
    setActiveCell(setStateDeepEqual(cursorIndex && {
      col: (rightClickInSelection || rightClickOnSelectedHeaders) && activeCell ? activeCell.col : Math.max(0, cursorIndex.col),
      row: (rightClickInSelection || rightClickOnSelectedGutter) && activeCell ? activeCell.row : Math.max(0, cursorIndex.row)
    }));

    if (cursorIndex && !rightClick) {
      setSelectionMode(setStateDeepEqual({
        columns: cursorIndex.col !== -1,
        rows: cursorIndex.row !== -1,
        active: true
      }));
    }

    if (!rightClickInSelection) {
      if ((cursorIndex === null || cursorIndex === void 0 ? void 0 : cursorIndex.col) === -1 || (cursorIndex === null || cursorIndex === void 0 ? void 0 : cursorIndex.row) === -1) {
        let col = cursorIndex.col;
        let row = cursorIndex.row;

        if (cursorIndex.col === -1) {
          col = columns.length - 2;
        }

        if (cursorIndex.row === -1) {
          row = data.length - 1;
        }

        if (rightClickOnSelectedHeaders && selectionCell) {
          col = selectionCell.col;
        }

        if (rightClickOnSelectedGutter && selectionCell) {
          row = selectionCell.row;
        }

        setSelectionCell(setStateDeepEqual({
          col,
          row
        }));
      } else {
        setSelectionCell(null);
      }
    }

    if (clickInside) {
      event.preventDefault();
    }
  }, [disableContextMenu, selectionCell, getCursorIndex, activeCell, isCellDisabled, editing, columns, data.length, selection, contextMenuItems.length]);
  useDocumentEventListener('mousedown', onMouseDown);
  const onMouseUp = useCallback(() => {
    setSelectionMode(setStateDeepEqual({
      columns: false,
      rows: false,
      active: false
    }));
  }, []);
  useDocumentEventListener('mouseup', onMouseUp);
  const onContextMenu = useCallback(event => {
    var _containerRef$current2;

    const clickInside = ((_containerRef$current2 = containerRef.current) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.contains(event.target)) || false;
    const cursorIndex = clickInside ? getCursorIndex(event, true) : null;
    const clickOnActiveCell = cursorIndex && activeCell && activeCell.col === cursorIndex.col && activeCell.row === cursorIndex.row && editing;

    if (clickInside && !clickOnActiveCell) {
      event.preventDefault();
    }
  }, [getCursorIndex, activeCell, editing]);
  useDocumentEventListener('contextmenu', onContextMenu);
  const onKeyDown = useCallback(event => {
    if (!activeCell) {
      return;
    }

    if (event.key.startsWith('Arrow') || event.key === 'Tab') {
      if (editing && columns[activeCell.col + 1].disableKeys) {
        return;
      }

      if (editing && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
      }

      const add = ([x, y], cell) => cell && {
        col: Math.max(0, Math.min(columns.length - 2, cell.col + x)),
        row: Math.max(0, Math.min(data.length - 1, cell.row + y))
      };

      if (event.key === 'Tab' && event.shiftKey) {
        setActiveCell(setStateDeepEqual(cell => add([-1, 0], cell)));
        setSelectionCell(null);
      } else {
        const direction = {
          ArrowDown: [0, 1],
          ArrowUp: [0, -1],
          ArrowLeft: [-1, 0],
          ArrowRight: [1, 0],
          Tab: [1, 0]
        }[event.key];

        if (event.ctrlKey || event.metaKey) {
          direction[0] *= columns.length;
          direction[1] *= data.length;
        }

        if (event.shiftKey) {
          setSelectionCell(setStateDeepEqual(cell => add(direction, cell || activeCell)));
        } else {
          setActiveCell(setStateDeepEqual(cell => add(direction, cell)));
          setSelectionCell(null);
        }
      }

      setEditing(false);
      event.preventDefault();
    } else if (event.key === 'Escape') {
      if (!editing && !selectionCell) {
        setActiveCell(null);
      }

      setSelectionCell(null);
      setEditing(false);
    } else if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) {
      setSelectionCell(null);

      if (editing) {
        if (!columns[activeCell.col + 1].disableKeys) {
          onDoneEditing();
        }
      } else if (!isCellDisabled(activeCell)) {
        setEditing(true);
        scrollTo(activeCell);
      }
    } else if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey && !event.altKey && event.shiftKey) {
      onInsertRowAfter((selection === null || selection === void 0 ? void 0 : selection.max.row) || activeCell.row);
    } else if (event.key === 'd' && (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey) {
      onDuplicateRows((selection === null || selection === void 0 ? void 0 : selection.min.row) || activeCell.row, selection === null || selection === void 0 ? void 0 : selection.max.row);
      event.preventDefault();
    } else if (event.key.match(/^[a-zA-Z0-9 ,.+-]$/) && !event.ctrlKey && !event.metaKey && !event.altKey) {
      if (!editing && !isCellDisabled(activeCell)) {
        setSelectionCell(null);
        setEditing(true);
        scrollTo(activeCell);
      }
    } else if (['Backspace', 'Delete'].includes(event.key)) {
      if (!editing) {
        onDelete();
        event.preventDefault();
      }
    } else if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
      if (!editing) {
        setActiveCell(setStateDeepEqual({
          col: 0,
          row: 0
        }));
        setSelectionCell(setStateDeepEqual({
          col: columns.length - 2,
          row: data.length - 1
        }));
        event.preventDefault();
      }
    }
  }, [scrollTo, activeCell, columns, data.length, editing, isCellDisabled, onDelete, onDoneEditing, onDuplicateRows, onInsertRowAfter, selection, selectionCell]);
  useDocumentEventListener('keydown', onKeyDown);
  useEffect(() => {
    if (!contextMenu && contextMenuItems.length) {
      setContextMenuItems([]);
    }

    if (contextMenu && !contextMenuItems.length) {
      const items = [];

      if (selection) {
        items.push({
          type: 'INSERT_ROW_BELLOW',
          action: () => {
            setContextMenu(null);
            onInsertRowAfter(selection.max.row);
          }
        });
      } else if (activeCell) {
        items.push({
          type: 'INSERT_ROW_BELLOW',
          action: () => {
            setContextMenu(null);
            onInsertRowAfter(activeCell.row);
          }
        });
      }

      if (selection && selection.min.row !== selection.max.row) {
        items.push({
          type: 'DUPLICATE_ROWS',
          fromRow: selection.min.row + 1,
          toRow: selection.max.row + 1,
          action: () => {
            setContextMenu(null);
            onDuplicateRows(selection.min.row, selection.max.row);
          }
        });
      } else if (activeCell) {
        items.push({
          type: 'DUPLICATE_ROW',
          action: () => {
            setContextMenu(null);
            onDuplicateRows(activeCell.row);
          }
        });
      }

      if (selection && selection.min.row !== selection.max.row) {
        items.push({
          type: 'DELETE_ROWS',
          fromRow: selection.min.row + 1,
          toRow: selection.max.row + 1,
          action: () => {
            setContextMenu(null);
            onDeleteRows(selection.min.row, selection.max.row);
          }
        });
      } else if (activeCell) {
        items.push({
          type: 'DELETE_ROW',
          action: () => {
            setContextMenu(null);
            onDeleteRows(activeCell.row);
          }
        });
      }

      if (items.length) {
        setContextMenuItems(items);
      } else {
        setContextMenu(null);
      }
    }
  }, [contextMenu, selection, onInsertRowAfter, onDeleteRows, onDuplicateRows, contextMenuItems.length, activeCell]);
  const ContextMenuComponent = contextMenuComponent;
  const CounterComponent = counterComponent;
  const counterAddRows = useCallback((batchSize = 1) => onInsertRowAfter((data === null || data === void 0 ? void 0 : data.length) - 1, Math.max(1, Math.round(Number(batchSize)))), [data === null || data === void 0 ? void 0 : data.length, onInsertRowAfter]);
  const focus = Boolean(activeCell);
  const gridContext = useMemo(() => ({
    focus: focus,
    editing,
    activeCell: activeCell,
    columnWidths: columnWidths || columns.map(() => 0),
    columnOffsets: columnOffsets || columns.map(() => 0),
    innerWidth: innerWidth || 0,
    rowHeight,
    headerRowHeight,
    selection,
    columns,
    data,
    onChange,
    onDoneEditing,
    isCellDisabled,
    onInsertRowAfter,
    onDuplicateRows,
    onDeleteRows
  }), [focus, editing, activeCell, columnWidths, columnOffsets, innerWidth, rowHeight, headerRowHeight, selection, columns, data, onChange, onDoneEditing, isCellDisabled, onInsertRowAfter, onDuplicateRows, onDeleteRows]);
  return createElement(DataSheetGridContext.Provider, {
    value: gridContext
  }, createElement("div", {
    ref: outsideContainerRef
  }, createElement(VariableSizeList, {
    ref: listRef,
    innerRef: containerRef,
    innerElementType: InnerContainer,
    estimatedItemSize: rowHeight,
    itemSize: i => i === 0 ? headerRowHeight : rowHeight,
    height: Math.min(height, innerHeight + (horizontalScrollBar ? scrollbarWidth : 0) + 1),
    itemCount: columnWidths && data.length + 1 || 0,
    className: 'dsg-container',
    width: '100%',
    children: Row
  }), createRow && !lockRows && createElement(CounterComponent, {
    addRows: counterAddRows
  }), contextMenu && contextMenuItems.length > 0 && createElement(ContextMenuComponent, {
    clientX: contextMenu.x,
    clientY: contextMenu.y,
    items: contextMenuItems,
    close: () => setContextMenu(null)
  })));
}

var index = {
  DataSheetGrid,
  textColumn,
  checkboxColumn,
  floatColumn,
  progressColumn
};

export default index;
export { DataSheetGrid, checkboxColumn, floatColumn, progressColumn, textColumn };
//# sourceMappingURL=index.modern.js.map
