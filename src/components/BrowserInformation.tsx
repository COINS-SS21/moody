import { Alert, AlertTitle } from "@material-ui/lab";
import { GoogleChromeIcon } from "./GoogleChromeIcon";
import { Typography } from "@material-ui/core";

export function BrowserInformation(): JSX.Element {
  return (
    <Alert severity="info" icon={<GoogleChromeIcon />}>
      <AlertTitle>Browser information</AlertTitle>
      <Typography variant="body1">
        We recommend using Google Chrome for the best experience.
      </Typography>
    </Alert>
  );
}
