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
import { IUserDetail } from "../../../models/user";
import { ROUTES } from "../../../configs/routes";
import { useDispatch } from "react-redux";
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
  user: IUserDetail;
  selected: boolean;
  setSelected: (profile_id: string, selected: boolean) => void;
  url: string;
}

const UserDataTableRow = (props: Props) => {
  const { user, selected, setSelected, url } = props;
  const linkToDetail = `${url}${ROUTES.user}${ROUTES.detailUser}/${user.profile_id}`;
  const selectedRef = useRef<any>();
  const dispatch = useDispatch();

  const handleDeleteIconClick = (e: any) => {
    selectedRef.current && selectedRef.current.click();
  };
  return (
    <TableRow>
      <StyledTableCell align="center" component="th" scope="row">
        <FormControlLabel
          label=""
          sx={{
            borderRight: "1px dotted #fff",
            m: 0,
          }}
          control={
            <Checkbox
              ref={selectedRef}
              checked={selected}
              onChange={(e) => setSelected(user.profile_id, e.target.checked)}
            />
          }
        />
      </StyledTableCell>
      <StyledTableCell align="left">
        <ListItemText
          primary={
            <Link onClick={(e) => dispatch(replace(linkToDetail))}>
              {user.vendor}
            </Link>
          }
          secondary={user.storeName}
        />
      </StyledTableCell>
      <StyledTableCell align="left">
        <Link href="#">{user.fistName + " " + user.lastName}</Link>
      </StyledTableCell>
      <StyledTableCell align="left">{user.access_level}</StyledTableCell>
      <StyledTableCell align="left">{user.product}</StyledTableCell>
      <StyledTableCell align="left">
        {user.order.order_as_buyer_total > 0 ? (
          <Link href="#">{user.order.order_as_buyer_total}</Link>
        ) : (
          user.order.order_as_buyer_total
        )}
      </StyledTableCell>
      <StyledTableCell align="left">{user.wishlist}</StyledTableCell>
      <StyledTableCell align="left">
        {moment(+user.created).format("MMMM D, YYYY, hh:mm A")}
      </StyledTableCell>
      <StyledTableCell align="left">
        {moment(+user.last_login - new Date().getTime()).format(
          "MMMM D, YYYY, hh:mm A"
        )}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ borderLeft: "1px dotted #fff" }}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleDeleteIconClick}
        >
          <DeleteOutlineRounded />
        </Button>
      </StyledTableCell>
    </TableRow>
  );
};
export default memo(UserDataTableRow);
