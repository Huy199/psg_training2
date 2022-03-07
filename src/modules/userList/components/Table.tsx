import React from "react";
import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IUsers } from "../../../models/users";
import { Checkbox } from "@mui/material";
import { FormControlLabel, Box, TableSortLabel } from "@material-ui/core";

interface Props {
  data?: IUsers[];
  handleChange(e: any): void;
  orderDirection: any;
  valueToOrderBy: string;
  handleRequestSort(event: any, property: any): void;
}

export default function Tables(props: Props) {
  const {
    data,
    handleChange,
    orderDirection,
    valueToOrderBy,
    handleRequestSort,
  } = props;
  console.log("data: ", data);

  const handleChanges = (e: any) => {
    handleChange(e);
  };

  const createSortHandler = (property: any) => (event: any) => {
    handleRequestSort(event, property);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                type="checkbox"
                className="form-check-input"
                name="allSelect"
                checked={
                  data?.filter((user) => user.isChecked !== true).length == 0
                    ? true
                    : false
                }
                onChange={handleChanges}
              />
            </TableCell>
            <TableCell key="vendor" align="right">
              <TableSortLabel
                active={valueToOrderBy === "vendor"}
                direction={valueToOrderBy === "vendor" ? orderDirection : "asc"}
                onClick={createSortHandler("vendor")}
              >
                Login/Email
              </TableSortLabel>
            </TableCell>
            <TableCell key="name" align="right">
              <TableSortLabel
                active={valueToOrderBy === "name"}
                direction={valueToOrderBy === "name" ? orderDirection : "asc"}
                onClick={createSortHandler("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Access level</TableCell>
            <TableCell align="right">Products</TableCell>
            <TableCell align="right">Orders</TableCell>
            <TableCell align="right">Wishlist</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Last Login</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.vendor}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={row.profile_id}
                  checked={row.isChecked ? true : false}
                  onChange={handleChanges}
                />
              </TableCell>

              <TableCell component="th" scope="row">
                {row.vendor}
              </TableCell>
              <TableCell align="right">{row.fistName}</TableCell>
              <TableCell align="right">{row.access_level}</TableCell>
              <TableCell align="right">{row.product}</TableCell>
              <TableCell align="right">{row.order.order_as_buyer}</TableCell>
              <TableCell align="right">{row.wishlist}</TableCell>
              <TableCell align="right">{row.created}</TableCell>
              <TableCell align="right">{row.last_login}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
