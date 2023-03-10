import React from 'react'
import clsx from 'clsx'
import generateTestId from 'src/utils/test-helpers'
import Input from 'src/elements/input/Input'

interface Props {
  className?: string
  searchTerm?: string
  onSearchChange: (value: string) => any
}

export default function SearchBar({ className, searchTerm, onSearchChange }: Props) {
  const handleSearch = (event) => {
    onSearchChange(event.target.value)
  }

  //   const handleClear = () => {
  //     onSearchChange('')
  //   }

  if (searchTerm === undefined) {
    return null
  }

  return (
    <>
      {/* TODO: Add two icons here after Input is updated */}
      <Input
        data-testid={generateTestId('search')}
        icon="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className={clsx(className)}
        type="search"
      />
      {/* <TextField
          data-testid={generateTestId('search')}
          variant="outlined"
          placeholder="Search"
          className={clsx(classes.SearchBar, className)}
          onChange={this.handleSearch}
          value={searchTerm}
          type="search"
          InputProps={{
            classes: pick(['root', 'adornedStart', 'adornedEnd'], classes),
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon className={`${classes.searchIcon} searchIcon`}>
                  search
                </FontAwesomeIcon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ visibility: searchTerm.length > 0 ? '' : 'hidden' }}
              >
                <ClearIcon
                  className={classes.clearIcon}
                  color="action"
                  onClick={this.handleClear}
                />
              </InputAdornment>
            ),
          }}
        /> */}
    </>
  )
}

// class SearchBar extends PureComponent {
//     handleSearch = (event) => {
//       this.props.onSearchChange(event.target.value)
//     }

//     handleClear = () => {
//       this.props.onSearchChange('')
//     }

//     render() {
//       const { searchTerm, className } = this.props
//       return (
//         searchTerm !== undefined && (
//           //TODO: Add two icons here after Input is updated
//           <Input
//             data-testid={generateTestId('search')}
//             icon="search"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={this.handleSearch}
//             className={clsx(className)}
//             type="search"
//           />

//           // <TextField
//           //   data-testid={generateTestId('search')}
//           //   variant="outlined"
//           //   placeholder="Search"
//           //   className={clsx(classes.SearchBar, className)}
//           //   onChange={this.handleSearch}
//           //   value={searchTerm}
//           //   type="search"
//           //   InputProps={{
//           //     classes: pick(['root', 'adornedStart', 'adornedEnd'], classes),
//           //     startAdornment: (
//           //       <InputAdornment position="start">
//           //         <FontAwesomeIcon className={`${classes.searchIcon} searchIcon`}>
//           //           search
//           //         </FontAwesomeIcon>
//           //       </InputAdornment>
//           //     ),
//           //     endAdornment: (
//           //       <InputAdornment
//           //         position="end"
//           //         style={{ visibility: searchTerm.length > 0 ? '' : 'hidden' }}
//           //       >
//           //         <ClearIcon
//           //           className={classes.clearIcon}
//           //           color="action"
//           //           onClick={this.handleClear}
//           //         />
//           //       </InputAdornment>
//           //     ),
//           //   }}
//           // />
//         )
//       )
//     }
//   }

//   SearchBar.propTypes = {
//     onSearchChange: PropTypes.func.isRequired,
//     className: PropTypes.string,
//     searchTerm: PropTypes.string,
//   }

//   export default SearchBar
