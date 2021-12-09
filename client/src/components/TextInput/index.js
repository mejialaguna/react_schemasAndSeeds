import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS, QUERY_CATEGORY } from "../../utils/queries";

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

export default function FreeSolo({ setProducts }) {
  const [searchInput, setSearchInput] = useState("");

  const { loading: productLoading, data: productData } =
    useQuery(QUERY_PRODUCTS);
  const products = productData?.products || [];
  const { loading: categoryLoading, data: categoryData } = useQuery(
    QUERY_CATEGORY,
    {
      variables: {
        category: searchInput,
      },
    }
  );

  // const categories = products.filter((category) => {
  //   return category.category === searchInput;
  // });

  const handleSubmit = async (event) => {
    event.persist();
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    if (productLoading) {
      return <div>loading...</div>;
    }

    if (searchInput === "products") {
      try {
        const response = await products;

        if (!response) {
          throw new Error("something went wrong!");
        }

        const items = await response; //.json();
        const Data = items.map((item) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          rating: item.rating,
          category: item.category,
          stock: item.stock,
          images: [item.images[0].url],
        }));

        setProducts(Data);
      } catch (err) {
        console.error(err);
      }
      // setSearchInput(" ");
    } else {
      try {
        if (categoryLoading) {
          return <div>loading...</div>;
        }
        const response = await categoryData;

        if (!response) {
          throw new Error("something went wrong!");
        }

        const items = await response; //.json();
        // console.log(typeof items);
        const Data = items.category.map((item) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          rating: item.rating,
          category: item.category,
          stock: item.stock,
          images: [item.images[0].url],
        }));

        setSearchInput(" ");
        setProducts(Data); // global props sending products to main component
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <form style={display.form} onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ width: 500 }}>
          <Autocomplete
            id="size-small-outlined"
            size="small"
            options={Categories}
            onSelect={(e) => setSearchInput(e.target.value)}
            getOptionLabel={(option) => option.title}
            type="submit"
            renderInput={(params) => (
              <TextField
                {...params}
                name="searchInput"
                label="Search"
                placeholder="Categories"
              />
            )}
          />
        </Stack>

        {/* <Button variant="outlined" type="submit">
          <img
            src="https://img.icons8.com/ios-glyphs/20/000000/search--v2.png"
            alt="submit btn"
          />
        </Button> */}
      </form>
    </div>
  );
}
