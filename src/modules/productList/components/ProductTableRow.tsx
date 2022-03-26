import { DeleteOutlineRounded } from "@mui/icons-material";
import {
  FormControlLabel,
  ListItemText,
  TableRow,
  Checkbox,
  Link,
  styled,
  tableCellClasses,
  TableCell,
  Button,
} from "@mui/material";
import moment from "moment";
import { memo, useRef } from "react";
import { IProduct, IProducts } from "../../../models/product";
import { ROUTES } from "../../../configs/routes";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "redux";
import { replace } from "connected-react-router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "0.5rem",
    borderColor: "#1B1B38",
    color: theme.palette.common.white,
    [`& > .MuiFormControlLabel-root > .MuiCheckbox-root`]: {
      color: theme.palette.common.white,
    },
    [`& > a`]: {
      color: "#0d6efd",
    },
    [`& > .MuiListItemText-root > .MuiTypography-root`]: {
      color: theme.palette.common.white,
    },
    [`& > .MuiListItemText-root > .MuiTypography-root > a`]: {
      color: "#0d6efd",
    },
  },
}));
interface Props {
  product: IProduct;
  setSelectProducts(id: string, checked: boolean): void;
  selected: boolean;
}

const UserDataTableRow = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { product, setSelectProducts, selected } = props;
  const selectedRef = useRef<any>();
  const handleNameClick = (e: any) =>
    dispatch(
      replace(`/pages${ROUTES.products}${ROUTES.detailProduct}/${product.id}`)
    );
  const handleDeleteIconClick = (e: any) => {
    selectedRef.current && selectedRef.current.click();
  };

  return (
    <TableRow>
      <StyledTableCell align="center" component="th" scope="row">
        <FormControlLabel
          ref={selectedRef}
          label=""
          sx={{
            borderRight: "1px dotted #fff",
            m: 0,
          }}
          control={
            <Checkbox
              checked={selected}
              onChange={(e) => setSelectProducts(product.id, e.target.checked)}
            />
          }
        />
      </StyledTableCell>
      <StyledTableCell align="left">
        <ListItemText primary={<Link href="#">{product.sku}</Link>} />
      </StyledTableCell>
      <StyledTableCell align="left">
        <Link onClick={handleNameClick}>{product.name}</Link>
      </StyledTableCell>
      <StyledTableCell align="left">{product.category}</StyledTableCell>
      <StyledTableCell align="left">{product.price}</StyledTableCell>
      <StyledTableCell align="left">{product.amount}</StyledTableCell>
      <StyledTableCell align="left">{product.vendor}</StyledTableCell>
      <StyledTableCell align="left">
        {moment(+product.arrivalDate).format("MMMM D, YYYY, hh:mm A")}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ marginLeft: "8px" }}>
        <FormControlLabel
          label=""
          sx={{
            borderLeft: "1px dotted #fff",
            m: 0,
          }}
          control={
            <Button
              sx={{ marginLeft: "10px" }}
              color="secondary"
              variant="contained"
              onClick={handleDeleteIconClick}
            >
              <DeleteOutlineRounded />
            </Button>
          }
        />
      </StyledTableCell>
    </TableRow>
  );
};
export default memo(UserDataTableRow);
