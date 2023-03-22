"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
const Input_1 = __importDefault(require("../elements/input/Input"));
function SearchBar({ className, searchTerm, onSearchChange }) {
    const handleSearch = (event) => {
        onSearchChange(event.target.value);
    };
    //   const handleClear = () => {
    //     onSearchChange('')
    //   }
    if (searchTerm === undefined) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Input_1.default, { "data-testid": test_helpers_1.default('search'), icon: "search", placeholder: "Search", value: searchTerm, onChange: handleSearch, className: clsx_1.default(className), type: "search" })));
}
exports.default = SearchBar;
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
//# sourceMappingURL=SearchBar.js.map