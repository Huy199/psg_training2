import {
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { replace } from "connected-react-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { API_PATHS } from "../../../configs/api";
import { ROUTES } from "../../../configs/routes";
import { IUserDetail, IUserDetails, IUserFilter } from "../../../models/user";
import { AppState } from "../../../redux/reducer";
import {
  setCommonsRole,
  setCountries,
  setLoading,
  setStates,
  setUsers,
} from "../../common/redux/dataReducer";
import { fetchThunk } from "../../common/redux/thunk";
import UserDataTable from "../components/UserDataTable";
import UserFilter from "../components/UserFilter";
interface Props {
  url: string;
}
const UserListPage = (props: Props) => {
  const { url } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { users, pageInfo } = useSelector((state: AppState) => ({
    users: state.data.users,
    pageInfo: state.data.pageInfo,
  }));
  const [filter, setFilter] = useState<IUserFilter>();
  const [cloneUsers, setCloneUsers] = useState<IUserDetails>();
  const [selectedUsers, setSelectedUsers] = useState<Array<IUserDetail>>([]);
  const [modal, setModal] = useState<{ openConfirmDelete: boolean }>({
    openConfirmDelete: false,
  });

  // No checked when pagination change
  // useEffect(() => {
  //   setSelectedUsers([]);
  // }, [users]);

  // Redirect to add User
  const handleAddUserClick = (e: any) => {
    dispatch(replace(`${url}${ROUTES.user}${ROUTES.newUser}`));
  };

  // handleFilter
  const handleSetFilterForUserFilter = useCallback((filter: IUserFilter) => {
    setFilter((prevFilter) => {
      return {
        ...filter,
        sort: prevFilter?.sort || "",
        order_by: prevFilter?.order_by || "ASC",
      };
    });
  }, []);

  // handle sort on table
  const handleSortForUserDataTable = useCallback(
    (sort: string, order_by: "ASC" | "DESC") => {
      setFilter((prevFilter) => {
        return prevFilter ? { ...prevFilter, sort, order_by } : prevFilter;
      });
    },
    []
  );

  //Delete
  const deleteUsers = useCallback(async () => {
    if (selectedUsers.length < 1) {
      return;
    }
    dispatch(setLoading(true));
    const json = await dispatch(
      fetchThunk(API_PATHS.usersEdit, "post", {
        params: [...selectedUsers].map((item) => {
          return { id: item.profile_id, delete: 1 };
        }),
      })
    );
    dispatch(setLoading(false));
    if (!json?.errors) {
      console.log(json);
      getUsers();
      return;
    }
    // eslint-disable-next-line
  }, [dispatch, selectedUsers]);

  const handleRemoveSelectedClick = () => {
    setModal({ ...modal, openConfirmDelete: false });
    deleteUsers();
  };

  //get listUser
  const getUsers = useCallback(async () => {
    if (!filter) {
      return;
    }
    dispatch(setLoading(true));
    const json = await dispatch(
      fetchThunk(API_PATHS.usersList, "post", {
        ...filter,
        page: pageInfo.index + 1,
        count: pageInfo.count,
      })
    );
    dispatch(setLoading(false));
    if (!json?.errors) {
      dispatch(
        setUsers({
          detail: [...json.data],
          recordsTotal: json.recordsTotal,
          recordsFiltered: json.recordsFiltered,
        })
      );
      return;
    }
  }, [dispatch, filter, pageInfo]);

  // get userType
  const getUserTypes = useCallback(async () => {
    dispatch(setLoading(true));
    const json = await dispatch(fetchThunk(API_PATHS.commonsRole));
    console.log("json: ", json);
    dispatch(setLoading(false));
    if (!json?.errors) {
      dispatch(setCommonsRole(json.data));
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    getUserTypes();
  }, [getUserTypes]);

  // get Countries
  const getCountries = useCallback(async () => {
    dispatch(setLoading(true));
    const json = await dispatch(fetchThunk(API_PATHS.commonsCountry));
    dispatch(setLoading(false));
    if (!json?.errors) {
      dispatch(setCountries(json.data));
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  //get States
  const getStates = useCallback(
    async (countryCode: string) => {
      dispatch(setLoading(true));
      const json = await dispatch(
        fetchThunk(API_PATHS.commonsState, "post", { code: countryCode })
      );
      dispatch(setLoading(false));
      if (!json?.errors) {
        dispatch(setStates(json.data));
        return;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    users && setCloneUsers({ ...users });
  }, [users]);

  useEffect(() => {
    filter && getUsers();
  }, [filter, getUsers, pageInfo]);

  useEffect(() => {
    setFilter({
      search: "",
      memberships: [],
      types: [],
      status: [],
      country: "",
      state: "",
      address: "",
      phone: "",
      date_range: [null, null],
      date_type: "R",
      sort: "",
      order_by: "ASC",
      tz: 7,
    });
  }, []);

  useEffect(() => {
    return () => {
      users && dispatch(setUsers({ ...users, detail: [] }));
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      component="div"
      sx={{
        overflow: "auto",
        position: "relative",
        maxHeight: "100vh",
        maxWidth: 1,
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
      p={4}
    >
      <Typography variant="h4" pb={2} sx={{ color: "#fff" }}>
        Search for users
      </Typography>
      <Box component="div" pb={2}>
        <UserFilter
          getStates={(countryCode: string) => {
            getStates(countryCode);
          }}
          setFilterByPage={handleSetFilterForUserFilter}
        />
      </Box>
      <Box component="div" pb={4} pt={4}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleAddUserClick}
        >
          Add User
        </Button>
      </Box>
      <Box component="div" sx={{ overflow: "auto" }}>
        <UserDataTable
          url={url}
          users={cloneUsers}
          setSortByPage={handleSortForUserDataTable}
          selectedUsers={selectedUsers}
          setSelectedUsers={(selected: Array<IUserDetail>) => {
            setSelectedUsers([...selected]);
          }}
        />
      </Box>
      <Box
        component="div"
        width={1}
        sx={{
          backgroundColor: "#323259",
          border: "1px solid #1b1b38",
          boxShadow: "0 0 13px 0 #b18aff",
          position: "sticky",
          bottom: "30px",
          padding: "15px 2.25rem",
          margin: "40px 0",
          borderWidth: "0 0 1px 1px",
          zIndex: 2,
        }}
      >
        <Button
          disabled={selectedUsers.length === 0}
          color="warning"
          variant="contained"
          onClick={(e) => setModal({ ...modal, openConfirmDelete: true })}
        >
          Remove selected
        </Button>
      </Box>
      <Modal
        open={modal.openConfirmDelete}
        onClose={() => setModal({ ...modal, openConfirmDelete: false })}
      >
        <Fade in={modal.openConfirmDelete}>
          <Container
            maxWidth="xs"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{
                borderRadius: 4,
                backgroundColor: "#323259",
                border: `1px solid #13132b`,
              }}
            >
              <Grid
                item
                xs={12}
                pb={1}
                p={2}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderBottom: "1px solid #1b1b38",
                }}
              >
                <Typography
                  color="#fff"
                  variant="body1"
                  fontSize=".9375rem"
                  fontWeight="bold"
                >
                  Confirm Delete
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                p={2}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderBottom: "1px solid #1b1b38",
                }}
              >
                <Typography color="#fff" variant="body1" fontSize=".9375rem">
                  Do you want to delete these users?
                </Typography>
              </Grid>
              <Box
                component="span"
                width={1}
                p={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "& .MuiTextField-root": { width: "100%", pb: 2 },
                  "& .MuiFormControl-root": { pb: 2 },
                  "& .MuiAlert-root": { mb: 2 },
                }}
              >
                <Box
                  width={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveSelectedClick}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) =>
                      setModal({ ...modal, openConfirmDelete: false })
                    }
                  >
                    No
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Container>
        </Fade>
      </Modal>
    </Box>
  );
};
export default UserListPage;
