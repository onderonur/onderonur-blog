import React from 'react';
import { Grid } from '@material-ui/core';

const GridCardList = ({ data, getItemKey, renderItem }) => {
  return (
    <Grid container spacing={4}>
      {data.map((item) => (
        <Grid key={getItemKey(item)} item xs={12} sm={6} md={4}>
          {renderItem(item)}
        </Grid>
      ))}
    </Grid>
  );
};

export default GridCardList;
