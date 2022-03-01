import { Button } from "@material-ui/core";
import React from "react";
import Filter from "../components/Filter";
import Table from "../components/Table";
import { NavLink } from "react-router-dom";

export default function UserList() {
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
      <Table />
    </div>
  );
}
