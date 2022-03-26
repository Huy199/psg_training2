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
  setCategories,
  setCommonsRole,
  setCountries,
  setLoading,
  setProducts,
  setStates,
  setUsers,
} from "../../common/redux/dataReducer";
import { fetchThunk } from "../../common/redux/thunk";
import UserDataTable from "../components/ProductsTable";
import UserFilter from "../components/UserFilter";
import { IProduct, IProductFilter, IProducts } from "../../../models/product";
import { ICategory } from "../../../models/category";
interface Props {
  url: string;
}
const UserListPage = (props: Props) => {
  const { url } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [selectProducts, setSelectProducts] = useState<Array<IProduct>>([]);

  const { products, pageProduct, total } = useSelector((state: AppState) => ({
    total: state.data.products?.recordsTotal,
    products: state.data.products?.data,
    pageProduct: state.data.pageProduct,
  }));
  console.log("products: ", products);
  const [filter, setFilter] = useState<IProductFilter>();

  const [modal, setModal] = useState<{ openConfirmDelete: boolean }>({
    openConfirmDelete: false,
  });

  useEffect(() => {
    setFilter({
      search: "",
      category: "0",
      stock_status: "all",
      availability: "all",
      vendor: {},
      sort: "name",
      order_by: "ASC",
      search_type: "",
    });
  }, []);

  //handleFilter
  const handleFilter = useCallback((filter: IProductFilter) => {
    setFilter((preFilter) => {
      return {
        ...filter,
        sort: "name",
        order_by: "ASC",
      };
    });
  }, []);

  //getCategory
  const getCategory = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.category, "post", {}));
    if (json.success) {
      console.log("json: ", json.data);
      dispatch(setCategories(json.data));
    }
  }, [dispatch]);

  useEffect(() => {
    getCategory();
  }, []);

  const handleSort = useCallback((sort: string, order_by: "ASC" | "DESC") => {
    setFilter((prevFilter) => {
      return prevFilter ? { ...prevFilter, sort, order_by } : prevFilter;
    });
  }, []);

  // getProducts
  const getProducts = useCallback(async () => {
    if (!filter) {
      return;
    }
    dispatch(setLoading(true));
    const json = await dispatch(
      fetchThunk(API_PATHS.pruductList, "post", {
        ...filter,
        page: pageProduct.index + 1,
        count: pageProduct.count,
      })
    );
    dispatch(setLoading(false));
    if (!json?.errors) {
      dispatch(setProducts(json));
      return;
    }
  }, [filter, dispatch, pageProduct]);

  useEffect(() => {
    filter && getProducts();
  }, [filter, getProducts, pageProduct]);

  const handleRemoveSelectedClick = () => {
    setModal({ ...modal, openConfirmDelete: false });
    deleteUsers();
  };
  const deleteUsers = useCallback(async () => {
    if (selectProducts.length < 1) {
      return;
    }
    dispatch(setLoading(true));
    const json = await dispatch(
      fetchThunk(API_PATHS.usersEdit, "post", {
        params: [...selectProducts].map((item) => {
          return { id: item.id, delete: 1 };
        }),
      })
    );
    dispatch(setLoading(false));
    if (!json?.errors) {
      console.log(json);
      getProducts();
      return;
    }
    // eslint-disable-next-line
  }, [dispatch, selectProducts]);
  const handleAddUserClick = (e: any) => {
    dispatch(replace(`/pages${ROUTES.products}${ROUTES.newProduct}`));
    console.log(url, `${url}${ROUTES.products}${ROUTES.newProduct}`);
  };

  return (
    <Box
      component="div"
      sx={{
        overflow: "auto",
        position: "relative",
        height: "100vh",
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
      <Typography pb={2} variant="h4" sx={{ color: "#fff" }}>
        Productss
      </Typography>
      <Box pb={2}>
        <UserFilter setFilterProduct={handleFilter} />
      </Box>
      <Box component="div" pb={4}>
        <Button
          color="secondary"
          variant="contained"
          sx={{ fontSize: "12px", padding: "8px" }}
          onClick={handleAddUserClick}
        >
          Add Products
        </Button>
      </Box>
      <Box component="div" sx={{ overflow: "auto" }}>
        <UserDataTable
          handleSort={handleSort}
          total={total}
          selectProducts={selectProducts}
          products={products}
          setSelectProducts={(selected: Array<IProduct>) => {
            setSelectProducts([...selected]);
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
          disabled={selectProducts.length === 0}
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
              pb={1}
              p={2}
              sx={{
                justifyContent: "flex-start",
                alignItems: "center",
                borderBottom: "1px solid #1b1b38",
              }}
            >
              <Typography color="#fff" variant="body1" fontSize=".9375rem">
                Do you want to delete these product?
              </Typography>
            </Grid>
            <Box
              p={2}
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
          </Grid>
        </Container>
      </Modal>
    </Box>
  );
};
export default UserListPage;
