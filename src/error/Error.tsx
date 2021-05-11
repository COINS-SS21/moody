import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { Alert, AlertTitle } from "@material-ui/lab";
import { clearError } from "./errorSlice";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export default function Error(): JSX.Element | null {
  const errors: string[] = useAppSelector((state) => state.error.errors);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  return errors.length > 0 ? (
    <Box className={classes.root} mt={2}>
      {errors.map((error, index) => (
        <Alert
          key={error + index}
          severity="error"
          onClose={() => {
            dispatch(clearError(index));
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ))}
    </Box>
  ) : null;
}
