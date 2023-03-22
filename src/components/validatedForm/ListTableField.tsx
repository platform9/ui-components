// TODO: Refactor this to use Grid instead of ListTable

// import React from 'react'
// import withFormContext from '../components/validatedForm/withFormContext'
// import ListTable from '../components/listTable/ListTable'
// import { ValidatedFormProps } from './model'
// import { ErrorMessage } from '../components/validatedForm/ErrorMessage'

// interface Props extends ValidatedFormProps {
//   value?: string[]
//   hasError?: boolean
//   errorMessage?: string
//   onChange?: any
//   multiSelection?: boolean
//   columns?: any
//   data: any
//   title?: string
//   extraToolbarContent?: JSX.Element
//   checkboxCond?: any
//   loading: boolean
//   uniqueIdentifier?: string
//   onReload?: any
//   searchTargets?: string[]
//   orderBy?: string
//   dataTestId?: string
// }

// export default withFormContext<any[], Props>(function(props) {
//   const {
//     onChange,
//     value = [],
//     hasError,
//     errorMessage,
//     multiSelection = false,
//     columns,
//     data,
//     title,
//     extraToolbarContent,
//     checkboxCond,
//     loading,
//     uniqueIdentifier,
//     onReload,
//     searchTargets = ['name'],
//     orderBy,
//     dataTestId,
//   } = props

//   return (
//     <>
//       <ListTable
//         onSelectedRowsChange={onChange}
//         title={title}
//         columns={columns}
//         data={data}
//         multiSelection={multiSelection}
//         selectedRows={value}
//         extraToolbarContent={extraToolbarContent}
//         checkboxCond={checkboxCond}
//         loading={loading}
//         uniqueIdentifier={uniqueIdentifier}
//         onReload={onReload}
//         searchTargets={searchTargets}
//         orderBy={orderBy}
//         dataTestId={dataTestId}
//       />
//       {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
//     </>
//   )
// })
