import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

import Filter from "../components/Filter";
import Table from "../components/Table";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "redux";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { IUsers } from "../../../models/users";

export default function UserList() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [admins, setAdmins] = useState<IUsers[]>();
  useEffect(() => {
    async function fetchLocation() {
      const json = await dispatch(fetchThunk(API_PATHS.admins, "get"));
      setAdmins(json.data);
    }
    fetchLocation();
  }, []);
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
      <Table admins={admins} />
    </div>
  );
}
