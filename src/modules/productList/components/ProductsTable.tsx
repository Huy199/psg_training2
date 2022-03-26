import { TableSortLabel } from "@material-ui/core";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FirstPageRounded,
  LastPageRounded,
  ArrowDownwardRounded,
  ArrowUpwardRounded,
} from "@mui/icons-material";
import {
  TableContainer,
  useTheme,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableFooter,
  TableHead,
  FormControlLabel,
  Checkbox,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IProduct, IProducts } from "../../../models/product";
import { IUserDetail, IUserDetails } from "../../../models/user";
import { AppState } from "../../../redux/reducer";
import { setPageInfo, setPageProduct } from "../../common/redux/dataReducer";
import UserDataTableRow from "./ProductTableRow";
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageRounded /> : <FirstPageRounded />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageRounded /> : <LastPageRounded />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    padding: "0.4rem",
    minWidth: "78px",
    borderColor: "#1B1B38",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.head} > .MuiFormControlLabel-root > .MuiCheckbox-root`]:
    {
      color: theme.palette.common.white,
    },
}));
interface Props {
  handleSort(sort: string, order_by: "ASC" | "DESC"): void;
  products?: Array<IProduct>;
  total?: string;
  selectProducts: Array<IProduct>;
  setSelectProducts(select: Array<IProduct>): void;
}

const UserDataTable = (props: Props) => {
  const { products, setSelectProducts, handleSort, selectProducts, total } =
    props;
  console.log("selectProducts: ", products);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [sortBy, setSortBy] = useState<{
    sort: string;
    order_by: "ASC" | "DESC";
  }>({ sort: "", order_by: "ASC" });
  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (users ? users.detail.length : 0)) : 0;
  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );
  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  useEffect(() => {
    dispatch(setPageProduct({ index: page, count: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const isSelectedAll = () => {
    const productSelect = [...selectProducts];
    const currentProducts = [...(products ?? [])];
    productSelect.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    currentProducts.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    return JSON.stringify(productSelect) === JSON.stringify(currentProducts);
  };

  //Icon sort
  const getSortIcon = useCallback(
    (column: string) => {
      let icon = <></>;
      if (sortBy.sort === column) {
        icon =
          sortBy.order_by === "ASC" ? (
            <ArrowUpwardRounded />
          ) : (
            <ArrowDownwardRounded />
          );
      }
      return icon;
    },
    [sortBy]
  );

  // select All in table
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleSelectAll: ");
    if (!products) {
      return;
    }
    if (!event.target.checked) {
      setSelectProducts([]);
      return;
    }

    setSelectProducts([...products]);
  };

  // select one in table
  const handleSelectOne = (id: string, checked: boolean) => {
    console.log("handleSelectOne: ");
    if (!products) {
      return;
    }
    if (!checked) {
      const currentProduct = [...selectProducts].filter(
        (product) => product.id !== id
      );
      setSelectProducts(currentProduct);
      return;
    }
    const currentProduct = products.find((product) => product.id === id);
    const newSelect = [...selectProducts];
    if (currentProduct) {
      newSelect.push(currentProduct);
    }
    setSelectProducts(newSelect);
  };

  const isSelected = (id: string) => {
    const isCheck = selectProducts.find((product) => product.id === id);
    return isCheck ? true : false;
  };

  const handleSwitchSortBy = useCallback(
    (sort: string) => {
      setSortBy({
        sort: sort,
        order_by: sortBy.order_by === "ASC" ? "DESC" : "ASC",
      });
    },
    [sortBy]
  );

  useEffect(() => {
    handleSort(sortBy.sort, sortBy.order_by);
  }, [sortBy, handleSort]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        "&::-webkit-scrollbar": {
          height: "10px",
          width: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#b18aff",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#13132b",
          borderRadius: "3px",
        },
      }}
    >
      <Table
        sx={{
          width: 1,
          backgroundColor: "#323259",
        }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <FormControlLabel
                label=""
                sx={{ m: 0 }}
                control={
                  <Checkbox
                    value=""
                    checked={isSelectedAll()}
                    onChange={handleSelectAll}
                  />
                }
              />
            </StyledTableCell>
            <StyledTableCell
              align="left"
              sx={{ cursor: "pointer" }}
              onClick={(e) => handleSwitchSortBy("sku")}
            >
              SKU&nbsp;{getSortIcon("sku")}
            </StyledTableCell>
            <StyledTableCell
              align="left"
              sx={{ cursor: "pointer" }}
              onClick={(e) => handleSwitchSortBy("name")}
            >
              Name&nbsp;{getSortIcon("name")}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ cursor: "pointer" }}>
              Category
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ cursor: "pointer" }}>
              Price
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ cursor: "pointer" }}>
              In Stock
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ cursor: "pointer" }}>
              Vendor
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ cursor: "pointer" }}>
              Arrival Date
            </StyledTableCell>
            <StyledTableCell
              align="left"
              sx={{ cursor: "pointer" }}
            ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <UserDataTableRow
              setSelectProducts={handleSelectOne}
              key={product.id}
              selected={isSelected(product.id)}
              product={product}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                25,
                50,
                75,
                100,
                { label: "All", value: -1 },
              ]}
              colSpan={10}
              count={parseInt(total ?? "") ? +parseInt(total ?? "") : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
export default UserDataTable;
