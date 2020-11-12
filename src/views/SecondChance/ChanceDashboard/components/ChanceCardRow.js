import { Typography, Grid } from '@material-ui/core'
import React from 'react'

export const ChanceCardRow = ({
  title,
  value
}) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography align="left">
          {title}
        </Typography>
      </Grid>
      
      <Grid item>
      <Typography align="right">
        {value}
      </Typography>
      </Grid>
      
    </Grid>
  )
}
