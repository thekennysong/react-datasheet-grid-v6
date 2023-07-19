import { createElement, useRef, useLayoutEffect, useState, useEffect, Fragment, createContext, memo, useContext, useMemo, forwardRef, useCallback } from 'react';
import { VariableSizeList } from 'react-window';
import cx from 'classnames';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';
import { throttle } from 'throttle-debounce';
import deepEqual from 'fast-deep-equal';
import useResizeObserver from '@react-hook/resize-observer';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var Component = function Component(_ref) {
  var focus = _ref.focus,
      _onChange = _ref.onChange,
      value = _ref.value;
  var ref = useRef(null);
  useLayoutEffect(function () {
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
    onChange: function onChange(e) {
      return _onChange(e.target.value || null);
    }
  });
};

function textColumn(_ref2) {
  var key = _ref2.key,
      rest = _objectWithoutPropertiesLoose(_ref2, ["key"]);

  return _extends({
    render: function render(_ref3) {
      var focus = _ref3.focus,
          rowData = _ref3.rowData,
          setRowData = _ref3.setRowData;
      return createElement(Component, {
        value: rowData[key],
        focus: focus,
        onChange: function onChange(value) {
          var _extends2;

          return setRowData(_extends({}, rowData, (_extends2 = {}, _extends2[key] = value, _extends2)));
        }
      });
    },
    deleteValue: function deleteValue(_ref4) {
      var _extends3;

      var rowData = _ref4.rowData;
      return _extends({}, rowData, (_extends3 = {}, _extends3[key] = null, _extends3));
    },
    copyValue: function copyValue(_ref5) {
      var rowData = _ref5.rowData;
      return rowData[key];
    },
    pasteValue: function pasteValue(_ref6) {
      var _extends4;

      var rowData = _ref6.rowData,
          value = _ref6.value;
      return _extends({}, rowData, (_extends4 = {}, _extends4[key] = value || null, _extends4));
    }
  }, rest);
}

var FALSY = ['', 'false', 'no', 'off', 'disabled', '0', 'n', 'f', 'unchecked', 'undefined', 'null', 'wrong', 'negative'];

var Component$1 = function Component(_ref) {
  var focus = _ref.focus,
      active = _ref.active,
      onChange = _ref.onChange,
      value = _ref.value,
      done = _ref.done;
  var ref = useRef(null);
  useLayoutEffect(function () {
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
    onMouseDown: function onMouseDown() {
      return !active && onChange(!value);
    },
    onChange: function onChange() {
      return null;
    }
  });
};

function checkboxColumn(_ref2) {
  var key = _ref2.key,
      rest = _objectWithoutPropertiesLoose(_ref2, ["key"]);

  return _extends({
    render: function render(_ref3) {
      var focus = _ref3.focus,
          active = _ref3.active,
          setRowData = _ref3.setRowData,
          rowData = _ref3.rowData,
          done = _ref3.done;
      return createElement(Component$1, {
        value: rowData[key],
        focus: focus,
        active: active,
        done: done,
        onChange: function onChange(value) {
          var _extends2;

          return setRowData(_extends({}, rowData, (_extends2 = {}, _extends2[key] = value, _extends2)));
        }
      });
    },
    deleteValue: function deleteValue(_ref4) {
      var _extends3;

      var rowData = _ref4.rowData;
      return _extends({}, rowData, (_extends3 = {}, _extends3[key] = false, _extends3));
    },
    copyValue: function copyValue(_ref5) {
      var rowData = _ref5.rowData;
      return rowData[key] ? 'YES' : 'NO';
    },
    pasteValue: function pasteValue(_ref6) {
      var _extends4;

      var rowData = _ref6.rowData,
          value = _ref6.value;
      return _extends({}, rowData, (_extends4 = {}, _extends4[key] = !FALSY.includes(value.toLowerCase()), _extends4));
    }
  }, rest);
}

var numberToString = function numberToString(value) {
  return typeof value === 'number' && !isNaN(value) ? String(value) : '';
};

var Component$2 = function Component(_ref) {
  var focus = _ref.focus,
      _onChange = _ref.onChange,
      value = _ref.value,
      typeObj = _ref.typeObj;

  var _useState = useState(numberToString(value)),
      rawValue = _useState[0],
      setRawValue = _useState[1];

  var ref = useRef(null);
  useLayoutEffect(function () {
    if (focus) {
      var _ref$current;

      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.select();
    } else {
      var _ref$current2;

      (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.blur();
    }
  }, [focus]);
  useEffect(function () {
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
    onChange: function onChange(e) {
      if (!(typeObj !== null && typeObj !== void 0 && typeObj.includes('Formula'))) {
        var targetValue = e.target.value;
        var number = parseFloat(targetValue);
        setRawValue(targetValue);

        _onChange(!isNaN(number) && targetValue ? number : null);
      }
    }
  });
};

function floatColumn(_ref2) {
  var key = _ref2.key,
      rest = _objectWithoutPropertiesLoose(_ref2, ["key"]);

  return _extends({
    render: function render(_ref3) {
      var focus = _ref3.focus,
          rowData = _ref3.rowData,
          setRowData = _ref3.setRowData;
      return createElement(Component$2, {
        typeObj: rowData === null || rowData === void 0 ? void 0 : rowData['typeObj'],
        value: rowData[key],
        focus: focus,
        onChange: function onChange(value) {
          var _extends2;

          return setRowData(_extends({}, rowData, (_extends2 = {}, _extends2[key] = value, _extends2)));
        }
      });
    },
    deleteValue: function deleteValue(_ref4) {
      var _extends3;

      var rowData = _ref4.rowData;
      return _extends({}, rowData, (_extends3 = {}, _extends3[key] = null, _extends3));
    },
    copyValue: function copyValue(_ref5) {
      var rowData = _ref5.rowData;
      return rowData[key];
    },
    pasteValue: function pasteValue(_ref6) {
      var _extends4;

      var rowData = _ref6.rowData,
          value = _ref6.value;
      var number = parseFloat(value);
      return _extends({}, rowData, (_extends4 = {}, _extends4[key] = !isNaN(number) ? number : null, _extends4));
    }
  }, rest);
}

var numberToString$1 = function numberToString(value) {
  return typeof value === 'number' && !isNaN(value) ? String(value) : '';
};

var Component$3 = function Component(_ref) {
  var focus = _ref.focus,
      _onChange = _ref.onChange,
      value = _ref.value;

  var _useState = useState(numberToString$1(value * 100)),
      rawValue = _useState[0],
      setRawValue = _useState[1];

  var ref = useRef(null);
  useLayoutEffect(function () {
    if (focus) {
      var _ref$current;

      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.select();
    } else {
      var _ref$current2;

      (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.blur();
    }
  }, [focus]);
  useEffect(function () {
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
    onChange: function onChange(e) {
      var targetValue = e.target.value;
      var number = parseFloat(targetValue);
      setRawValue(targetValue);

      _onChange(!isNaN(number) && targetValue ? Math.min(100, Math.max(0, number)) / 100 : null);
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

function progressColumn(_ref2) {
  var key = _ref2.key,
      rest = _objectWithoutPropertiesLoose(_ref2, ["key"]);

  return _extends({
    render: function render(_ref3) {
      var focus = _ref3.focus,
          rowData = _ref3.rowData,
          setRowData = _ref3.setRowData;
      return createElement(Component$3, {
        value: rowData[key],
        focus: focus,
        onChange: function onChange(value) {
          var _extends2;

          return setRowData(_extends({}, rowData, (_extends2 = {}, _extends2[key] = value, _extends2)));
        }
      });
    },
    deleteValue: function deleteValue(_ref4) {
      var _extends3;

      var rowData = _ref4.rowData;
      return _extends({}, rowData, (_extends3 = {}, _extends3[key] = null, _extends3));
    },
    copyValue: function copyValue(_ref5) {
      var rowData = _ref5.rowData;
      return typeof rowData[key] === 'number' ? rowData[key] * 100 + '%' : null;
    },
    pasteValue: function pasteValue(_ref6) {
      var _extends4;

      var rowData = _ref6.rowData,
          value = _ref6.value;
      var number = parseFloat(value);
      return _extends({}, rowData, (_extends4 = {}, _extends4[key] = !isNaN(number) ? Math.min(100, Math.max(0, number)) / 100 : null, _extends4));
    }
  }, rest);
}

// A type of promise-like that resolves synchronously and supports only one observer
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

function _isSettledPact(thenable) {
	return thenable instanceof _Pact && thenable.s & 1;
}

// Asynchronously iterate through an object that has a length property, passing the index as the first argument to the callback (even as the length property changes)
function _forTo(array, body, check) {
	var i = -1, pact, reject;
	function _cycle(result) {
		try {
			while (++i < array.length && (!check || !check())) {
				result = body(i);
				if (result && result.then) {
					if (_isSettledPact(result)) {
						result = result.v;
					} else {
						result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
						return;
					}
				}
			}
			if (pact) {
				_settle(pact, 1, result);
			} else {
				pact = result;
			}
		} catch (e) {
			_settle(pact || (pact = new _Pact()), 2, e);
		}
	}
	_cycle();
	return pact;
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously implement a generic for loop
function _for(test, update, body) {
	var stage;
	for (;;) {
		var shouldContinue = test();
		if (_isSettledPact(shouldContinue)) {
			shouldContinue = shouldContinue.v;
		}
		if (!shouldContinue) {
			return result;
		}
		if (shouldContinue.then) {
			stage = 0;
			break;
		}
		var result = body();
		if (result && result.then) {
			if (_isSettledPact(result)) {
				result = result.s;
			} else {
				stage = 1;
				break;
			}
		}
		if (update) {
			var updateValue = update();
			if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
				stage = 2;
				break;
			}
		}
	}
	var pact = new _Pact();
	var reject = _settle.bind(null, pact, 2);
	(stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
	return pact;
	function _resumeAfterBody(value) {
		result = value;
		do {
			if (update) {
				updateValue = update();
				if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
					updateValue.then(_resumeAfterUpdate).then(void 0, reject);
					return;
				}
			}
			shouldContinue = test();
			if (!shouldContinue || (_isSettledPact(shouldContinue) && !shouldContinue.v)) {
				_settle(pact, 1, result);
				return;
			}
			if (shouldContinue.then) {
				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
				return;
			}
			result = body();
			if (_isSettledPact(result)) {
				result = result.v;
			}
		} while (!result || !result.then);
		result.then(_resumeAfterBody).then(void 0, reject);
	}
	function _resumeAfterTest(shouldContinue) {
		if (shouldContinue) {
			result = body();
			if (result && result.then) {
				result.then(_resumeAfterBody).then(void 0, reject);
			} else {
				_resumeAfterBody(result);
			}
		} else {
			_settle(pact, 1, result);
		}
	}
	function _resumeAfterUpdate() {
		if (shouldContinue = test()) {
			if (shouldContinue.then) {
				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
			} else {
				_resumeAfterTest(shouldContinue);
			}
		} else {
			_settle(pact, 1, result);
		}
	}
}

var DataSheetGridContext = createContext({
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
  onChange: function onChange() {
    return null;
  },
  isCellDisabled: function isCellDisabled() {
    return false;
  },
  onDoneEditing: function onDoneEditing() {
    return undefined;
  },
  onInsertRowAfter: function onInsertRowAfter() {
    return undefined;
  },
  onDuplicateRows: function onDuplicateRows() {
    return undefined;
  },
  onDeleteRows: function onDeleteRows() {
    return undefined;
  },
  rowClassName: ''
});

var Row = memo(function (_ref) {
  var style = _ref.style,
      rowIndex = _ref.index;

  var _useContext = useContext(DataSheetGridContext),
      innerWidth = _useContext.innerWidth,
      selection = _useContext.selection,
      data = _useContext.data,
      columns = _useContext.columns,
      activeCell = _useContext.activeCell,
      editing = _useContext.editing,
      onChange = _useContext.onChange,
      isCellDisabled = _useContext.isCellDisabled,
      onDoneEditing = _useContext.onDoneEditing,
      columnWidths = _useContext.columnWidths,
      columnOffsets = _useContext.columnOffsets,
      rowHeight = _useContext.rowHeight,
      onInsertRowAfter = _useContext.onInsertRowAfter,
      onDuplicateRows = _useContext.onDuplicateRows,
      onDeleteRows = _useContext.onDeleteRows,
      rowClassName = _useContext.rowClassName;

  var headerRow = rowIndex === 0;

  if (headerRow) {
    return null;
  }

  console.log('oh hi');
  return createElement("div", {
    className: cx('dsg-row', typeof rowClassName === 'string' ? rowClassName : null, typeof rowClassName === 'function' ? rowClassName({
      rowData: data,
      rowIndex: rowIndex
    }) : null),
    style: _extends({}, style, {
      width: innerWidth + "px"
    })
  }, columnWidths.map(function (width, columnIndex) {
    var gutterColumn = columnIndex === 0;
    var active = (activeCell === null || activeCell === void 0 ? void 0 : activeCell.col) === columnIndex - 1 && activeCell.row === rowIndex - 1;
    var disabled = isCellDisabled({
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
        width: width + "px",
        left: (columnOffsets[columnIndex - 1] || 0) + "px",
        height: rowHeight + "px",
        top: 0
      }
    }, columns[columnIndex].render({
      insertRowBelow: function insertRowBelow() {
        onInsertRowAfter(rowIndex - 1);
      },
      duplicateRow: function duplicateRow() {
        onDuplicateRows(rowIndex - 1);
      },
      deleteRow: function deleteRow() {
        onDeleteRows(rowIndex - 1);
      },
      active: active,
      focus: active && editing,
      rowIndex: rowIndex - 1,
      rowData: data[rowIndex - 1],
      columnIndex: columnIndex - 1,
      done: onDoneEditing,
      disabled: disabled,
      setRowData: function setRowData(rowData) {
        return onChange([].concat(data.slice(0, rowIndex - 1), [rowData], data.slice(rowIndex)));
      }
    }));
  }));
});

var useScrollbarWidth = function useScrollbarWidth() {
  var _useState = useState(scrollbarWidth()),
      width = _useState[0],
      setWidth = _useState[1];

  useLayoutEffect(function () {
    setTimeout(function () {
      return setWidth(scrollbarWidth());
    }, 0);
  }, []);
  return width;
};

var useColumnWidths = function useColumnWidths(width, columns, includeScrollbar) {
  var scrollbarWidth = useScrollbarWidth();

  var _useState = useState(null),
      widths = _useState[0],
      setWidths = _useState[1];

  var innerWidth = useMemo(function () {
    return widths && widths.reduce(function (total, w) {
      return total + w;
    });
  }, [widths]);
  var offsets = useMemo(function () {
    var total = 0;
    return widths && widths.map(function (w, i) {
      total += w;
      return i === widths.length - 1 ? Infinity : total;
    });
  }, [widths]);
  var columnsHash = columns.map(function (_ref) {
    var width = _ref.width,
        minWidth = _ref.minWidth,
        maxWidth = _ref.maxWidth;
    return [width, minWidth, maxWidth].join(',');
  }).join('|');
  useEffect(function () {
    if (scrollbarWidth !== undefined || !includeScrollbar) {
      var el = document.createElement('div');
      el.style.display = 'flex';
      el.style.position = 'fixed';
      el.style.width = width - (includeScrollbar ? scrollbarWidth : 0) + "px";
      el.style.left = '-999px';
      el.style.top = '-1px';
      var children = columns.map(function (column) {
        var child = document.createElement('div');
        child.style.display = 'block';
        child.style.flex = String(column.width);
        child.style.minWidth = column.minWidth + "px";
        child.style.maxWidth = column.maxWidth + "px";
        return child;
      });
      children.forEach(function (child) {
        return el.appendChild(child);
      });
      document.body.insertBefore(el, null);
      setWidths(children.map(function (child) {
        return child.offsetWidth;
      }));
      el.remove();
    }
  }, [width, columnsHash, scrollbarWidth, includeScrollbar]);
  return {
    widths: widths,
    offsets: offsets,
    innerWidth: innerWidth
  };
};

var buildSquare = function buildSquare(top, right, bottom, left) {
  return [[left, top], [right, top], [right, bottom], [left, bottom], [left, top]];
};

var buildClipPath = function buildClipPath(top, right, bottom, left) {
  var values = [].concat(buildSquare(0, '100%', '100%', 0), buildSquare(top, right, bottom, left));
  return "polygon(evenodd, " + values.map(function (pair) {
    return pair.map(function (value) {
      return typeof value === 'number' && value !== 0 ? value + 'px' : value;
    }).join(' ');
  }).join(',') + ")";
};

var InnerContainer = forwardRef(function (_ref, ref) {
  var children = _ref.children,
      rest = _objectWithoutPropertiesLoose(_ref, ["children"]);

  var _useContext = useContext(DataSheetGridContext),
      activeCell = _useContext.activeCell,
      columnWidths = _useContext.columnWidths,
      columnOffsets = _useContext.columnOffsets,
      innerWidth = _useContext.innerWidth,
      rowHeight = _useContext.rowHeight,
      headerRowHeight = _useContext.headerRowHeight,
      selection = _useContext.selection,
      data = _useContext.data,
      editing = _useContext.editing,
      columns = _useContext.columns,
      isCellDisabled = _useContext.isCellDisabled;

  var extraPixelV = function extraPixelV(rowI) {
    return rowI < data.length - 1 ? 1 : 0;
  };

  var extraPixelH = function extraPixelH(colI) {
    return colI < columns.length - 2 ? 1 : 0;
  };

  var activeCellRect = activeCell && {
    width: columnWidths[activeCell.col + 1] + extraPixelH(activeCell.col),
    height: rowHeight + extraPixelV(activeCell.row),
    left: columnWidths.slice(0, activeCell.col + 1).reduce(function (a, b) {
      return a + b;
    }, 0),
    top: rowHeight * activeCell.row + headerRowHeight
  };
  var selectionRect = selection && {
    width: columnWidths.slice(selection.min.col + 1, selection.max.col + 2).reduce(function (a, b) {
      return a + b;
    }, extraPixelH(selection.max.col)),
    height: rowHeight * (selection.max.row - selection.min.row + 1) + extraPixelV(selection.max.row),
    left: columnWidths.slice(0, selection.min.col + 1).reduce(function (a, b) {
      return a + b;
    }, 0),
    top: rowHeight * selection.min.row + headerRowHeight
  };
  var selectionIsDisabled = useMemo(function () {
    if (!selection) {
      return false;
    }

    for (var col = selection.min.col; col <= selection.max.col; ++col) {
      for (var row = selection.min.row; row <= selection.max.row; ++row) {
        if (!isCellDisabled({
          col: col,
          row: row
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
      height: headerRowHeight + "px",
      width: innerWidth + "px"
    }
  }, columnWidths.map(function (width, columnIndex) {
    var gutterColumn = columnIndex === 0;
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
        width: width + "px",
        left: (columnOffsets[columnIndex - 1] || 0) + "px",
        height: headerRowHeight + "px",
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
    style: _extends({}, selectionRect, {
      clipPath: buildClipPath(activeCellRect.top - selectionRect.top, activeCellRect.left - selectionRect.left, activeCellRect.top + activeCellRect.height - selectionRect.top, activeCellRect.left + activeCellRect.width - selectionRect.left)
    })
  }));
});

var compute = function compute(resultRef, ref) {
  var _ref$current;

  resultRef.current = ((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect()) || null;
};

var throttledCompute = throttle(200, function (resultRef, ref, force) {
  if (force === void 0) {
    force = false;
  }

  if (force) {
    compute(resultRef, ref);
  } else {
    setTimeout(function () {
      return compute(resultRef, ref);
    }, 0);
  }
});
var useGetBoundingRect = function useGetBoundingRect(ref) {
  var boundingRect = useRef(null);
  return function (force) {
    if (force === void 0) {
      force = false;
    }

    throttledCompute(boundingRect, ref, force);
    return boundingRect.current;
  };
};

var useDocumentEventListener = function useDocumentEventListener(type, listener) {
  useEffect(function () {
    document.addEventListener(type, listener);
    return function () {
      document.removeEventListener(type, listener);
    };
  }, [listener, type]);
};

var AddRowsCounter = memo(function (_ref) {
  var addRows = _ref.addRows;

  var _useState = useState(1),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState(String(value)),
      rawValue = _useState2[0],
      setRawValue = _useState2[1];

  return createElement("button", {
    className: 'dsg-add-row',
    type: 'button',
    onClick: function onClick(e) {
      if (e.target.tagName !== 'INPUT') {
        addRows(value);
      }
    }
  }, "Add", createElement("input", {
    className: 'dsg-add-row-input',
    value: rawValue,
    onBlur: function onBlur() {
      return setRawValue(String(value));
    },
    onChange: function onChange(e) {
      setRawValue(e.target.value);
      setValue(Math.max(1, Math.round(parseInt(e.target.value) || 0)));
    },
    onKeyPress: function onKeyPress(event) {
      if (event.key === 'Enter') {
        addRows(value);
      }
    }
  }), "rows");
});

var renderItem = function renderItem(item) {
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

var ContextMenu = function ContextMenu(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY,
      items = _ref.items,
      close = _ref.close;
  var containerRef = useRef(null);
  var onClickOutside = useCallback(function (event) {
    var _containerRef$current;

    var clickInside = (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.contains(event.target);

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
  }, items.map(function (item) {
    return createElement("div", {
      key: item.type,
      onClick: item.action,
      className: 'dsg-context-menu-item'
    }, renderItem(item));
  }));
};

var DEFAULT_DATA = [];
var DEFAULT_COLUMNS = [];

var DEFAULT_CREATE_ROW = function DEFAULT_CREATE_ROW() {
  return {};
};

var DEFAULT_ON_CHANGE = function DEFAULT_ON_CHANGE() {
  return null;
};

var DEFAULT_DUPLICATE_ROW = function DEFAULT_DUPLICATE_ROW(_ref) {
  var rowData = _ref.rowData;
  return _extends({}, rowData);
};

var DEFAULT_IS_ROW_EMPTY = function DEFAULT_IS_ROW_EMPTY(_ref2) {
  var rowData = _ref2.rowData;
  return Object.values(rowData).every(function (value) {
    return !value;
  });
};

var DEFAULT_RENDER_GUTTER_COLUMN = function DEFAULT_RENDER_GUTTER_COLUMN(_ref3) {
  var rowIndex = _ref3.rowIndex;
  return rowIndex + 1;
};

function setStateDeepEqual(newValue) {
  return function (oldValue) {
    var newVal = typeof newValue === 'function' ? newValue(oldValue) : newValue;
    return deepEqual(oldValue, newVal) ? oldValue : newVal;
  };
}

function DataSheetGrid(_ref4) {
  var _ref4$data = _ref4.data,
      data = _ref4$data === void 0 ? DEFAULT_DATA : _ref4$data,
      _ref4$onChange = _ref4.onChange,
      onChange = _ref4$onChange === void 0 ? DEFAULT_ON_CHANGE : _ref4$onChange,
      _ref4$columns = _ref4.columns,
      rawColumns = _ref4$columns === void 0 ? DEFAULT_COLUMNS : _ref4$columns,
      _ref4$height = _ref4.height,
      height = _ref4$height === void 0 ? 400 : _ref4$height,
      _ref4$rowHeight = _ref4.rowHeight,
      rowHeight = _ref4$rowHeight === void 0 ? 40 : _ref4$rowHeight,
      _ref4$headerRowHeight = _ref4.headerRowHeight,
      headerRowHeight = _ref4$headerRowHeight === void 0 ? rowHeight : _ref4$headerRowHeight,
      _ref4$gutterColumnWid = _ref4.gutterColumnWidth,
      gutterColumnWidth = _ref4$gutterColumnWid === void 0 ? '0 0 40px' : _ref4$gutterColumnWid,
      _ref4$createRow = _ref4.createRow,
      createRow = _ref4$createRow === void 0 ? DEFAULT_CREATE_ROW : _ref4$createRow,
      _ref4$duplicateRow = _ref4.duplicateRow,
      duplicateRow = _ref4$duplicateRow === void 0 ? DEFAULT_DUPLICATE_ROW : _ref4$duplicateRow,
      _ref4$isRowEmpty = _ref4.isRowEmpty,
      isRowEmpty = _ref4$isRowEmpty === void 0 ? DEFAULT_IS_ROW_EMPTY : _ref4$isRowEmpty,
      _ref4$counterComponen = _ref4.counterComponent,
      counterComponent = _ref4$counterComponen === void 0 ? AddRowsCounter : _ref4$counterComponen,
      _ref4$contextMenuComp = _ref4.contextMenuComponent,
      contextMenuComponent = _ref4$contextMenuComp === void 0 ? ContextMenu : _ref4$contextMenuComp,
      _ref4$autoAddRow = _ref4.autoAddRow,
      autoAddRow = _ref4$autoAddRow === void 0 ? false : _ref4$autoAddRow,
      _ref4$lockRows = _ref4.lockRows,
      lockRows = _ref4$lockRows === void 0 ? false : _ref4$lockRows,
      _ref4$disableContextM = _ref4.disableContextMenu,
      disableContextMenuRaw = _ref4$disableContextM === void 0 ? false : _ref4$disableContextM,
      _ref4$renderGutterCol = _ref4.renderGutterColumn,
      renderGutterColumn = _ref4$renderGutterCol === void 0 ? DEFAULT_RENDER_GUTTER_COLUMN : _ref4$renderGutterCol,
      _ref4$rowClassName = _ref4.rowClassName,
      rowClassName = _ref4$rowClassName === void 0 ? '' : _ref4$rowClassName;
  console.log(rowClassName, 'rowClassName');
  var disableContextMenu = disableContextMenuRaw || lockRows;
  var columns = useMemo(function () {
    return [{
      width: gutterColumnWidth,
      minWidth: 0,
      title: createElement("div", {
        className: 'dsg-corner-indicator'
      }),
      render: renderGutterColumn
    }].concat(rawColumns).map(function (column) {
      return _extends({
        width: 1,
        minWidth: 100,
        render: function render() {
          return null;
        },
        disableKeys: false,
        disabled: false,
        keepFocus: false,
        deleteValue: function deleteValue(_ref5) {
          var rowData = _ref5.rowData;
          return rowData;
        },
        copyValue: function copyValue() {
          return null;
        },
        pasteValue: function pasteValue(_ref6) {
          var rowData = _ref6.rowData;
          return rowData;
        }
      }, column);
    });
  }, [gutterColumnWidth, rawColumns, renderGutterColumn]);

  var _useState = useState(0),
      width = _useState[0],
      setWidth = _useState[1];

  var innerHeight = headerRowHeight + rowHeight * data.length;
  var verticalScrollBar = height < innerHeight;

  var _useColumnWidths = useColumnWidths(width - 1, columns, verticalScrollBar),
      columnWidths = _useColumnWidths.widths,
      columnOffsets = _useColumnWidths.offsets,
      innerWidth = _useColumnWidths.innerWidth;

  var horizontalScrollBar = (innerWidth || 0) >= width;
  var scrollbarWidth = useScrollbarWidth() || 0;
  var listRef = useRef(null);
  var containerRef = useRef(null);
  var outsideContainerRef = useRef(null);
  var getContainerBoundingRect = useGetBoundingRect(containerRef);
  useLayoutEffect(function () {
    setWidth(function (w) {
      var _outsideContainerRef$;

      return ((_outsideContainerRef$ = outsideContainerRef.current) === null || _outsideContainerRef$ === void 0 ? void 0 : _outsideContainerRef$.getBoundingClientRect().width) || w;
    });
  }, []);
  useResizeObserver(outsideContainerRef, function (entry) {
    return setWidth(entry.contentRect.width);
  });

  var _useState2 = useState(false),
      editing = _useState2[0],
      setEditing = _useState2[1];

  var _useState3 = useState(null),
      contextMenu = _useState3[0],
      setContextMenu = _useState3[1];

  var _useState4 = useState([]),
      contextMenuItems = _useState4[0],
      setContextMenuItems = _useState4[1];

  var _useState5 = useState(null),
      activeCell = _useState5[0],
      setActiveCell = _useState5[1];

  var _useState6 = useState(null),
      selectionCell = _useState6[0],
      setSelectionCell = _useState6[1];

  var _useState7 = useState({
    columns: false,
    rows: false,
    active: false
  }),
      selectionMode = _useState7[0],
      setSelectionMode = _useState7[1];

  var selection = useMemo(function () {
    return activeCell && selectionCell && {
      min: {
        col: Math.min(activeCell.col, selectionCell === null || selectionCell === void 0 ? void 0 : selectionCell.col),
        row: Math.min(activeCell.row, selectionCell === null || selectionCell === void 0 ? void 0 : selectionCell.row)
      },
      max: {
        col: Math.max(activeCell.col, selectionCell === null || selectionCell === void 0 ? void 0 : selectionCell.col),
        row: Math.max(activeCell.row, selectionCell === null || selectionCell === void 0 ? void 0 : selectionCell.row)
      }
    };
  }, [activeCell, selectionCell]);
  var scrollTo = useCallback(function (cell) {
    var _listRef$current, _listRef$current2;

    var topMax = cell.row * rowHeight;
    var topMin = (cell.row + 1) * rowHeight + headerRowHeight - ((_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.props.height) + 1;
    var scrollTop = (_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 ? void 0 : _listRef$current2.state.scrollOffset;

    if (scrollTop > topMax) {
      var _listRef$current3;

      (_listRef$current3 = listRef.current) === null || _listRef$current3 === void 0 ? void 0 : _listRef$current3.scrollTo(topMax);
    } else if (scrollTop < topMin) {
      var _listRef$current4;

      (_listRef$current4 = listRef.current) === null || _listRef$current4 === void 0 ? void 0 : _listRef$current4.scrollTo(topMin);
    }

    if (columnOffsets && columnWidths) {
      var _listRef$current5;

      var leftMax = columnOffsets[cell.col] - columnOffsets[0];
      var leftMin = columnOffsets[cell.col] + columnWidths[cell.col + 1] - width + 1;
      var outerRef = (_listRef$current5 = listRef.current) === null || _listRef$current5 === void 0 ? void 0 : _listRef$current5._outerRef;
      var scrollLeft = outerRef.scrollLeft;

      if (scrollLeft > leftMax) {
        outerRef.scrollLeft = 0;
      } else if (scrollLeft < leftMin) {
        outerRef.scrollLeft = 0;
      }
    }
  }, [rowHeight, headerRowHeight, columnOffsets, width, columnWidths]);
  useEffect(function () {
    if (selectionCell) {
      scrollTo(selectionCell);
    }
  }, [selectionCell, scrollTo]);
  useEffect(function () {
    if (activeCell) {
      scrollTo(activeCell);
    }
  }, [activeCell, scrollTo]);
  useEffect(function () {
    if (activeCell !== null) {
      document.activeElement.blur();
    }
  }, [activeCell !== null]);
  var getCursorIndex = useCallback(function (event, force) {
    var _outsideContainerRef$2;

    if (force === void 0) {
      force = false;
    }

    var boundingClientRect = getContainerBoundingRect(force);
    var outsideBoundingClientRect = force && ((_outsideContainerRef$2 = outsideContainerRef.current) === null || _outsideContainerRef$2 === void 0 ? void 0 : _outsideContainerRef$2.getBoundingClientRect());

    if (boundingClientRect && columnOffsets) {
      var x = event.clientX - boundingClientRect.left;
      var y = event.clientY - boundingClientRect.top;

      if (outsideBoundingClientRect) {
        if (event.clientY - outsideBoundingClientRect.top <= headerRowHeight) {
          y = 0;
        }

        if (event.clientX - outsideBoundingClientRect.left <= columnOffsets[0]) {
          x = 0;
        }
      }

      return {
        col: columnOffsets.findIndex(function (right) {
          return x < right;
        }) - 1,
        row: Math.min(data.length - 1, Math.max(-1, Math.floor((y - headerRowHeight) / rowHeight)))
      };
    }

    return null;
  }, [getContainerBoundingRect, columnOffsets, data.length, headerRowHeight, rowHeight]);
  var isCellDisabled = useCallback(function (cell) {
    var disabled = columns[cell.col + 1].disabled;
    return Boolean(typeof disabled === 'function' ? disabled({
      rowData: data[cell.row]
    }) : disabled);
  }, [columns, data]);
  var onInsertRowAfter = useCallback(function (row, count) {
    if (count === void 0) {
      count = 1;
    }

    if (!createRow) {
      return;
    }

    setSelectionCell(null);
    setEditing(false);

    if (lockRows) {
      return;
    }

    onChange([].concat(data.slice(0, row + 1), new Array(count).fill(0).map(createRow), data.slice(row + 1)));
    setActiveCell(setStateDeepEqual(function (a) {
      return {
        col: (a === null || a === void 0 ? void 0 : a.col) || 0,
        row: row + count
      };
    }));
  }, [createRow, data, lockRows, onChange]);
  var onDoneEditing = useCallback(function (_temp) {
    var _ref7 = _temp === void 0 ? {} : _temp,
        _ref7$nextRow = _ref7.nextRow,
        nextRow = _ref7$nextRow === void 0 ? true : _ref7$nextRow;

    if ((activeCell === null || activeCell === void 0 ? void 0 : activeCell.row) === data.length - 1) {
      if (nextRow && autoAddRow) {
        onInsertRowAfter(activeCell.row);
      } else {
        setEditing(false);
      }
    } else {
      setEditing(false);

      if (nextRow) {
        setActiveCell(setStateDeepEqual(function (a) {
          return a && _extends({}, a, {
            row: a.row + 1
          });
        }));
      }
    }
  }, [activeCell, autoAddRow, data.length, onInsertRowAfter]);
  var onDuplicateRows = useCallback(function (rowMin, rowMax) {
    if (rowMax === void 0) {
      rowMax = rowMin;
    }

    if (lockRows) {
      return;
    }

    onChange([].concat(data.slice(0, rowMax + 1), data.slice(rowMin, rowMax + 1).map(function (rowData) {
      return duplicateRow({
        rowData: rowData
      });
    }), data.slice(rowMax + 1)));
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
  var onDeleteRows = useCallback(function (rowMin, rowMax) {
    if (rowMax === void 0) {
      rowMax = rowMin;
    }

    if (lockRows) {
      return;
    }

    setEditing(false);
    setActiveCell(setStateDeepEqual(function (a) {
      var row = Math.min(data.length - 2 - rowMax + rowMin, rowMin);

      if (row < 0) {
        return null;
      }

      return a && _extends({}, a, {
        row: row
      });
    }));
    setSelectionCell(null);
    onChange([].concat(data.slice(0, rowMin), data.slice(rowMax + 1)));
  }, [data, lockRows, onChange]);
  var onDelete = useCallback(function () {
    if (!activeCell) {
      return;
    }

    var min = (selection === null || selection === void 0 ? void 0 : selection.min) || activeCell;
    var max = (selection === null || selection === void 0 ? void 0 : selection.max) || activeCell;

    if (data.slice(min.row, max.row + 1).every(function (rowData) {
      return isRowEmpty({
        rowData: rowData
      });
    })) {
      onDeleteRows(min.row, max.row);
      return;
    }

    var newData = [].concat(data);

    for (var row = min.row; row <= max.row; ++row) {
      for (var col = min.col; col <= max.col; ++col) {
        if (!isCellDisabled({
          col: col,
          row: row
        })) {
          var _columns$deleteValue = columns[col + 1].deleteValue,
              deleteValue = _columns$deleteValue === void 0 ? function (_ref8) {
            var rowData = _ref8.rowData;
            return rowData;
          } : _columns$deleteValue;
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
  var onCopy = useCallback(function (event) {
    if (!editing && activeCell) {
      var _event$clipboardData;

      var copyData = [];
      var min = (selection === null || selection === void 0 ? void 0 : selection.min) || activeCell;
      var max = (selection === null || selection === void 0 ? void 0 : selection.max) || activeCell;

      for (var row = min.row; row <= max.row; ++row) {
        copyData.push([]);

        for (var col = min.col; col <= max.col; ++col) {
          var _columns$copyValue = columns[col + 1].copyValue,
              copyValue = _columns$copyValue === void 0 ? function () {
            return null;
          } : _columns$copyValue;
          copyData[row - min.row].push(copyValue({
            rowData: data[row]
          }));
        }
      }

      (_event$clipboardData = event.clipboardData) === null || _event$clipboardData === void 0 ? void 0 : _event$clipboardData.setData('text/plain', copyData.map(function (row) {
        return row.join('\t');
      }).join('\n'));
      event.preventDefault();
    }
  }, [activeCell, columns, data, editing, selection]);
  useDocumentEventListener('copy', onCopy);
  var onCut = useCallback(function (event) {
    if (!editing && activeCell) {
      onCopy(event);
      onDelete();
      event.preventDefault();
    }
  }, [activeCell, editing, onCopy, onDelete]);
  useDocumentEventListener('cut', onCut);
  var onPaste = useCallback(function (event) {
    try {
      return Promise.resolve(function () {
        if (!editing && activeCell) {
          var _event$clipboardData2;

          var _temp10 = function _temp10() {
            event.preventDefault();
          };

          var pasteData = ((_event$clipboardData2 = event.clipboardData) === null || _event$clipboardData2 === void 0 ? void 0 : _event$clipboardData2.getData('text').replace(/\r/g, '').split('\n').map(function (row) {
            return row.split('\t');
          })) || [];
          var min = (selection === null || selection === void 0 ? void 0 : selection.min) || activeCell;
          var max = (selection === null || selection === void 0 ? void 0 : selection.max) || activeCell;

          var _temp11 = function () {
            if (pasteData.length === 1) {
              var _temp12 = function _temp12() {
                onChange(_newData);
                setActiveCell(setStateDeepEqual({
                  col: min.col,
                  row: min.row
                }));
                setSelectionCell(setStateDeepEqual({
                  col: min.col + pasteData[0].length - 1,
                  row: max.row
                }));
              };

              var _newData = [].concat(data);

              var _columnIndex = 0;

              var _temp13 = _for(function () {
                return _columnIndex < pasteData[0].length;
              }, function () {
                return _columnIndex++;
              }, function () {
                var _columns;

                var pasteValue = (_columns = columns[min.col + _columnIndex + 1]) === null || _columns === void 0 ? void 0 : _columns.pasteValue;
                return function () {
                  if (pasteValue) {
                    var _rowIndex = min.row;
                    return _for(function () {
                      return _rowIndex <= max.row;
                    }, function () {
                      return _rowIndex++;
                    }, function () {
                      var _temp2 = function () {
                        if (!isCellDisabled({
                          col: _columnIndex + min.col,
                          row: _rowIndex
                        })) {
                          return Promise.resolve(pasteValue({
                            rowData: _newData[_rowIndex],
                            value: pasteData[0][_columnIndex]
                          })).then(function (_pasteValue) {
                            _newData[_rowIndex] = _pasteValue;
                          });
                        }
                      }();

                      if (_temp2 && _temp2.then) return _temp2.then(function () {});
                    });
                  }
                }();
              });

              return _temp13 && _temp13.then ? _temp13.then(_temp12) : _temp12(_temp13);
            } else {
              var _temp14 = function _temp14() {
                onChange(_newData2);
                setActiveCell(setStateDeepEqual({
                  col: min.col,
                  row: min.row
                }));
                setSelectionCell(setStateDeepEqual({
                  col: Math.min(min.col + pasteData[0].length - 1, columns.length - 2),
                  row: min.row + pasteData.length - 1
                }));
              };

              var _newData2 = [].concat(data);

              var missingRows = min.row + pasteData.length - data.length;

              if (missingRows > 0) {
                if (!lockRows) {
                  _newData2 = [].concat(_newData2, new Array(missingRows).fill(0).map(function () {
                    return createRow();
                  }));
                } else {
                  pasteData.splice(pasteData.length - missingRows, missingRows);
                }
              }

              var _columnIndex2 = 0;

              var _temp15 = _for(function () {
                return _columnIndex2 < pasteData[0].length && min.col + _columnIndex2 < columns.length - 1;
              }, function () {
                return _columnIndex2++;
              }, function () {
                var _columns2;

                var pasteValue = (_columns2 = columns[min.col + _columnIndex2 + 1]) === null || _columns2 === void 0 ? void 0 : _columns2.pasteValue;
                return function () {
                  if (pasteValue) {
                    return _forTo(pasteData, function (rowIndex) {
                      var _temp5 = function () {
                        if (!isCellDisabled({
                          col: min.col + _columnIndex2,
                          row: min.row + rowIndex
                        })) {
                          return Promise.resolve(pasteValue({
                            rowData: _newData2[min.row + rowIndex],
                            value: pasteData[rowIndex][_columnIndex2]
                          })).then(function (_pasteValue2) {
                            _newData2[min.row + rowIndex] = _pasteValue2;
                          });
                        }
                      }();

                      if (_temp5 && _temp5.then) return _temp5.then(function () {});
                    });
                  }
                }();
              });

              return _temp15 && _temp15.then ? _temp15.then(_temp14) : _temp14(_temp15);
            }
          }();

          return _temp11 && _temp11.then ? _temp11.then(_temp10) : _temp10(_temp11);
        }
      }());
    } catch (e) {
      return Promise.reject(e);
    }
  }, [activeCell, columns, createRow, data, editing, isCellDisabled, lockRows, onChange, selection]);
  useDocumentEventListener('paste', onPaste);
  var onMouseMove = useCallback(function (event) {
    if (selectionMode.active) {
      var cursorIndex = getCursorIndex(event);
      setSelectionCell(setStateDeepEqual(cursorIndex && {
        col: selectionMode.columns ? Math.max(0, cursorIndex.col) : columns.length - 2,
        row: selectionMode.rows ? Math.max(0, cursorIndex.row) : data.length - 1
      }));
      setEditing(false);
    }
  }, [getCursorIndex, selectionMode, columns.length, data.length]);
  useDocumentEventListener('mousemove', onMouseMove);
  var onMouseDown = useCallback(function (event) {
    var _containerRef$current;

    var rightClick = event.button === 2;
    var clickInside = ((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.contains(event.target)) || false;
    var cursorIndex = clickInside ? getCursorIndex(event, true) : null;

    if (contextMenuItems.length) {
      return;
    }

    if (!clickInside && editing && activeCell && columns[activeCell.col + 1].keepFocus) {
      return;
    }

    var clickOnActiveCell = cursorIndex && activeCell && activeCell.col === cursorIndex.col && activeCell.row === cursorIndex.row && !isCellDisabled(activeCell);

    if (clickOnActiveCell && editing) {
      return;
    }

    var rightClickInSelection = rightClick && selection && cursorIndex && cursorIndex.row >= selection.min.row && cursorIndex.row <= selection.max.row && cursorIndex.col >= selection.min.col && cursorIndex.col <= selection.max.col;
    var rightClickOnSelectedHeaders = rightClick && selection && cursorIndex && cursorIndex.row === -1 && cursorIndex.col >= selection.min.col && cursorIndex.col <= selection.max.col;
    var rightClickOnSelectedGutter = rightClick && selection && cursorIndex && cursorIndex.row >= selection.min.row && cursorIndex.row <= selection.max.row && cursorIndex.col === -1;

    if (rightClick && !disableContextMenu) {
      setTimeout(function () {
        return setContextMenu({
          x: event.clientX,
          y: event.clientY
        });
      }, 0);
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
        var col = cursorIndex.col;
        var row = cursorIndex.row;

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
          col: col,
          row: row
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
  var onMouseUp = useCallback(function () {
    setSelectionMode(setStateDeepEqual({
      columns: false,
      rows: false,
      active: false
    }));
  }, []);
  useDocumentEventListener('mouseup', onMouseUp);
  var onContextMenu = useCallback(function (event) {
    var _containerRef$current2;

    var clickInside = ((_containerRef$current2 = containerRef.current) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.contains(event.target)) || false;
    var cursorIndex = clickInside ? getCursorIndex(event, true) : null;
    var clickOnActiveCell = cursorIndex && activeCell && activeCell.col === cursorIndex.col && activeCell.row === cursorIndex.row && editing;

    if (clickInside && !clickOnActiveCell) {
      event.preventDefault();
    }
  }, [getCursorIndex, activeCell, editing]);
  useDocumentEventListener('contextmenu', onContextMenu);
  var onKeyDown = useCallback(function (event) {
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

      var add = function add(_ref9, cell) {
        var x = _ref9[0],
            y = _ref9[1];
        return cell && {
          col: Math.max(0, Math.min(columns.length - 2, cell.col + x)),
          row: Math.max(0, Math.min(data.length - 1, cell.row + y))
        };
      };

      if (event.key === 'Tab' && event.shiftKey) {
        setActiveCell(setStateDeepEqual(function (cell) {
          return add([-1, 0], cell);
        }));
        setSelectionCell(null);
      } else {
        var direction = {
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
          setSelectionCell(setStateDeepEqual(function (cell) {
            return add(direction, cell || activeCell);
          }));
        } else {
          setActiveCell(setStateDeepEqual(function (cell) {
            return add(direction, cell);
          }));
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
  useEffect(function () {
    if (!contextMenu && contextMenuItems.length) {
      setContextMenuItems([]);
    }

    if (contextMenu && !contextMenuItems.length) {
      var items = [];

      if (selection) {
        items.push({
          type: 'INSERT_ROW_BELLOW',
          action: function action() {
            setContextMenu(null);
            onInsertRowAfter(selection.max.row);
          }
        });
      } else if (activeCell) {
        items.push({
          type: 'INSERT_ROW_BELLOW',
          action: function action() {
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
          action: function action() {
            setContextMenu(null);
            onDuplicateRows(selection.min.row, selection.max.row);
          }
        });
      } else if (activeCell) {
        items.push({
          type: 'DUPLICATE_ROW',
          action: function action() {
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
          action: function action() {
            setContextMenu(null);
            onDeleteRows(selection.min.row, selection.max.row);
          }
        });
      } else if (activeCell) {
        items.push({
          type: 'DELETE_ROW',
          action: function action() {
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
  var ContextMenuComponent = contextMenuComponent;
  var CounterComponent = counterComponent;
  var counterAddRows = useCallback(function (batchSize) {
    if (batchSize === void 0) {
      batchSize = 1;
    }

    return onInsertRowAfter((data === null || data === void 0 ? void 0 : data.length) - 1, Math.max(1, Math.round(Number(batchSize))));
  }, [data === null || data === void 0 ? void 0 : data.length, onInsertRowAfter]);
  var focus = Boolean(activeCell);
  var gridContext = useMemo(function () {
    return {
      focus: focus,
      editing: editing,
      activeCell: activeCell,
      columnWidths: columnWidths || columns.map(function () {
        return 0;
      }),
      columnOffsets: columnOffsets || columns.map(function () {
        return 0;
      }),
      innerWidth: innerWidth || 0,
      rowHeight: rowHeight,
      headerRowHeight: headerRowHeight,
      selection: selection,
      columns: columns,
      data: data,
      onChange: onChange,
      onDoneEditing: onDoneEditing,
      isCellDisabled: isCellDisabled,
      onInsertRowAfter: onInsertRowAfter,
      onDuplicateRows: onDuplicateRows,
      onDeleteRows: onDeleteRows,
      rowClassName: rowClassName
    };
  }, [focus, editing, activeCell, columnWidths, columnOffsets, innerWidth, rowHeight, headerRowHeight, selection, columns, data, onChange, onDoneEditing, isCellDisabled, onInsertRowAfter, onDuplicateRows, onDeleteRows, rowClassName]);
  return createElement(DataSheetGridContext.Provider, {
    value: gridContext
  }, createElement("div", {
    ref: outsideContainerRef
  }, createElement(VariableSizeList, {
    ref: listRef,
    innerRef: containerRef,
    innerElementType: InnerContainer,
    estimatedItemSize: rowHeight,
    itemSize: function itemSize(i) {
      return i === 0 ? headerRowHeight : rowHeight;
    },
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
    close: function close() {
      return setContextMenu(null);
    }
  })));
}

var index = {
  DataSheetGrid: DataSheetGrid,
  textColumn: textColumn,
  checkboxColumn: checkboxColumn,
  floatColumn: floatColumn,
  progressColumn: progressColumn
};

export default index;
export { DataSheetGrid, checkboxColumn, floatColumn, progressColumn, textColumn };
//# sourceMappingURL=index.modern.js.map
