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
import { FormControlLabel, Box } from "@material-ui/core";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

interface Props {
  data?: IUsers[];
}

export default function Tables(props: Props) {
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>Login/Email</TableCell>
            <TableCell align="right">Name</TableCell>
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
                <Checkbox />
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
