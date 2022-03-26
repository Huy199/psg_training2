import {
  Checkbox,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ListItemText,
  OutlinedInput,
  Collapse,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ICountry,
  IState,
  IUserCommonRole,
  IUserFilter,
} from "../../../models/user";
import { AppState } from "../../../redux/reducer";
import {
  KeyboardDoubleArrowDownRounded,
  KeyboardDoubleArrowUpRounded,
} from "@mui/icons-material";
import { DateRange, DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { IProductFilter } from "../../../models/product";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 220,
      //   backgroundColor: "#323258",
    },
  },
};
const styledForField = {
  "& .MuiSelect-select": {
    color: "white",
    backgroundColor: "#1b1b38",
  },

  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    color: "white",
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "#252547",
    transitionDuration: ".15s",
    transitionProperty: "border,background-color,color,box-shadow",
    transitionTimingFunction: "ease-in",
    "&:hover": {
      backgroundColor: "#1B1B38",
      color: "white",
    },
    "& fieldset": {
      borderColor: "#1B1B38",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
};
const styledForSelect = {
  color: "#fff",
};
export interface Props {
  setFilterProduct(filter: IProductFilter): void;
}

const UserFilter = (props: Props) => {
  const { setFilterProduct } = props;
  const { categories } = useSelector((state: AppState) => ({
    categories: state.data.categories,
  }));
  const [filter, setFilter] = useState<IProductFilter>({
    search: "",
    category: "0",
    stock_status: "all",
    availability: "all",
    vendor: {},
    sort: "name",
    order_by: "ASC",
    search_type: "",
  });

  const handleFilter = () => {
    setFilterProduct(filter);
  };
  const handleSearchChange = (e: any) => {
    setFilter({ ...filter, search: `${e.target.value}` });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alighItems: "center",
        backgroundColor: "#323259",
        padding: "20px",
        marginBottom: "40px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField
            size="small"
            sx={{ width: "100%", ...styledForField }}
            label="Search keywords"
            type="search"
            value={filter.search}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              MenuProps={MenuProps}
              onChange={(e) =>
                setFilter({ ...filter, category: `${e.target.value}` })
              }
            >
              <MenuItem value={"0"}>Any category</MenuItem>
              {categories?.map((category) => (
                <MenuItem
                  value={category.id}
                >{`----${category.name}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl size="small" sx={{ width: "140%" }}>
            <InputLabel id="demo-simple-select-label">Stock Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={(e) =>
                setFilter({ ...filter, stock_status: `${e.target.value}` })
              }
            >
              <MenuItem value={"all"}>Any stock status</MenuItem>
              <MenuItem value={"in"}>In stock</MenuItem>
              <MenuItem value={"low"}>Low stock</MenuItem>
              <MenuItem value={"out"}>SOLD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button
            color="secondary"
            variant="contained"
            sx={{ marginLeft: "78px" }}
            onClick={handleFilter}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default UserFilter;
