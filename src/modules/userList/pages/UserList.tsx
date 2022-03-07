import { Button } from "@material-ui/core";
import { useEffect, useState, useCallback } from "react";

import Filter from "../components/Filter";
import Tables from "../components/Table";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "redux";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { IUsers } from "../../../models/users";
import TablePagination from "@mui/material/TablePagination";
import "./userList.css";
export default function UserList() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [users, setUsers] = useState<IUsers[]>();
  const [page, setPage] = useState(0);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const getUsers = useCallback(
    async function fetchLocation() {
      const json = await dispatch(
        fetchThunk(API_PATHS.admins, "post", {
          page: `${page + 1}`,
          count: `${rowsPerPage}`,
          search: "",
          memberships: [],
          types: [],
          status: [],
          country: "",
          state: "",
          address: "",
          phone: "",
          date_type: "R",
          date_range: [],
          sort: "last_login",
          order_by: "DESC",
          tz: 7,
        })
      );
      setUsers(json.data);
    },
    [dispatch, page, rowsPerPage]
  );
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleChange = (e: any) => {
    console.log("e: ", e);
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users?.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users?.map((user) =>
        user.profile_id === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  return (
    <div>
      <h2>Search for users</h2>
      <Filter />

      <NavLink
        to="/home/new-user"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Button className="mt-5" variant="contained">
          Add user
        </Button>
      </NavLink>
      <Tables
        orderDirection={orderDirection}
        valueToOrderBy={valueToOrderBy}
        data={users}
        handleChange={handleChange}
        handleRequestSort={handleRequestSort}
      />
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
