import * as React from 'react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Column } from '../typings'

const numberToString = (value: any): string =>
  typeof value === 'number' && !isNaN(value) ? String(value) : ''

const Component = ({ focus, onChange, value, typeObj }) => {
  const [rawValue, setRawValue] = useState<string>(numberToString(value))
  const ref = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (focus) {
      ref.current?.select()
    } else {
      ref.current?.blur()
    }
  }, [focus])

  useEffect(() => {
    if (!focus) {
      setRawValue(numberToString(value))
    }
  }, [focus, value])

  return (
    <input
      className='dsg-input dsg-input-align-right'
      ref={ref}
      style={{ pointerEvents: focus ? 'auto' : 'none' }}
      value={rawValue ? rawValue === '0' ? '-' : Math.abs(Number(rawValue)) > 1000 ? Math.round(Number(rawValue)) : rawValue : '-'}
      onChange={(e) => {
        if(!typeObj?.includes('Formula')){
          const targetValue = e.target.value
          const number = parseFloat(targetValue)
          setRawValue(targetValue)
          onChange(!isNaN(number) && targetValue ? number : null)
        }
      }}
    />
  )
}

export function floatColumn<TRow = any>({
  key,
  ...rest
}: Partial<Column<TRow>> & { key: string }): Partial<Column<TRow>> {
  return {

    render: ({ focus, rowData, setRowData }) => (
      <Component
        typeObj={rowData?.['typeObj']}
        value={rowData[key]}
        focus={focus}
        onChange={(value) => setRowData({ ...rowData, [key]: value })}
      />
    ),
    deleteValue: ({ rowData }) => ({ ...rowData, [key]: null }),
    copyValue: ({ rowData }) => rowData[key],
    pasteValue: ({ rowData, value }) => {
      const number = parseFloat(value)
      return { ...rowData, [key]: !isNaN(number) ? number : null }
    },
    ...rest,
  }
}
