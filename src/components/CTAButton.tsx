import { Button, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.h4.fontSize,
    padding: theme.spacing(1, 4),
  },
}));

export default function CTAButton({ children, ...props }: any): JSX.Element {
  const classes = useStyles();

  return (
    <Button className={classes.root} variant="contained" {...props}>
      {children}
    </Button>
  );
}
