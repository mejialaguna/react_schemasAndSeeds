import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useQuery } from "@apollo/client";
import {QUERY_PRODUCTS} from "../../utils/queries";


const Categories = [
  { title: "jewelery" },
  { title: "electronics" },
  { title: "women's clothing" },
  { title: "men's clothing" },
  { title: "products" },
];

const display = {
  form: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  select: {
    width: "800px",
  },
  btn: {
    width: "200px",
  },
  margin: {
    paddingBottom: 60,
  },
};

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}


export default function FreeSolo({ setProducts }) {
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading1 = open && options.length === 0;

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  // const products = data?.products || {};

  // console.log(data)

  const handleSubmit = async (event) => {
    event.persist();
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

      if (loading) {
        return <div>loading...</div>;
      }


    if (searchInput === "products") {
      try {
        const response = await data.products;
        console.log(searchInput);
        console.log(response);

        if (!response) {
          throw new Error("something went wrong!");
        }

        const items = await response //.json();
        // console.log(items);
        const Data = items.map((item) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          rating: item.rating,
          category: item.category,
          stock: item.stock,
          images: [item.images[0].url],
        }));
           console.log(Data)
       
         setProducts(Data);
        setSearchInput("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  React.useEffect(() => {
    let active = true;

    if (!loading1) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...Categories]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading1]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div>
      <form style={display.form} onSubmit={handleSubmit}>
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 400 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={options}
          loading1={loading1}
          renderInput={(params) => (
            <TextField
              {...params}
              style={{
                marginTop: 3,
                backgroundColor: "white",
              }}
              name="searchInput"
              value={searchInput}
              onBlur={(e) => setSearchInput(e.target.value)}
              label="Search Category"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading1 ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />

        <Button variant="outlined" type="submit">
          <img src="https://img.icons8.com/ios-glyphs/20/000000/search--v2.png" alt="submit btn" />
        </Button>
      </form>
    </div>
  );
}
