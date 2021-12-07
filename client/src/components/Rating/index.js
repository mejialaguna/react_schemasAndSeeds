import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function Rate({item}) {
  return (
    <Stack spacing={2}>
      <Rating
        name="half-rating-read"
        defaultValue={item.rating}
        precision={0.5}
        readOnly
      />
    </Stack>
  );
}
