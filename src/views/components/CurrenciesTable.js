import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table'
import { ReactSVG } from 'react-svg'
import numeral from 'numeral'
const reqSvgs = require.context ( '../../../node_modules/cryptocurrency-icons/svg/color', true, /\.svg$/ )
const svgs = reqSvgs
.keys ()
.reduce ( (allPaths,filePath) =>{
    const parts = filePath.split('.')
    const symbol = parts[parts.length-2].slice(1)
    allPaths[symbol] = reqSvgs( filePath )
    return allPaths
    }, {} )



const columns = [
    {
      Header: 'rank',
      accessor: 'rank'
    },
    {
      Header: 'Symbol',
      accessor: ({symbol}) => 
            <div>
                <ReactSVG src={svgs[symbol.toLowerCase()] || svgs['generic']}/>
                {symbol}
           </div>,
      sortType: (a,b) => a.original.symbol > b.original.symbol ? 1 : -1
    },
    {
      Header: 'Currency',
      accessor: 'name'
    },
    {
      Header: 'Price (USD)',
      accessor: ({priceUsd}) => numeral(priceUsd).format( priceUsd > 2 ? '$0,0.00' : '$0,0.0000'),
      sortType: (a,b) => numeral(a).value() -  numeral(b).value()
    },
    {
      Header: 'Supply',
      accessor: ({supply}) => numeral(supply).format('0.0a'),
      sortType: (a,b) => numeral(a).value() -  numeral(b).value()
    },
    {
      Header: 'Market Cap (USD)',
      accessor: ({marketCapUsd}) => numeral(marketCapUsd).format('$0.0a'),
      sortType: (a,b) => numeral(a).value() -  numeral(b).value()
    },
    {
      Header: '% Change (24H)',
      accessor: ({changePercent24Hr}) => (
        <p style={{color: parseFloat(changePercent24Hr) > 0 ? '#02C973' : '#FF0009'}}>
            {parseFloat(changePercent24Hr) > 0 ? '▲' : '▼'}
            {' '}
            {numeral(changePercent24Hr/100).format('0.00%')}
        </p>),
      sortType: (a,b) => Number(parseFloat(a.original.changePercent24Hr))  -  Number(parseFloat(b.original.changePercent24Hr))
    }
  ]

function Table({currencies}) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      pageCount,
      prepareRow,
      pageOptions,
      page,
      state: { pageIndex, pageSize },
      gotoPage,
      previousPage,
      nextPage,
      setPageSize,
      canPreviousPage,
      canNextPage,
    } = useTable({
      columns,
      data: currencies,
    }, useSortBy, usePagination)

    return(
        <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' ▼ ' : ' ▲ ') : ' ⇳ '}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
  )
}

export default Table;