import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { DEFAULT_RATING_LABELS } from "./constants";
import { ChangeEvent, useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  stars: {
    fontSize: theme.typography.h1.fontSize,
  },
}));

type QuestionProps = {
  name: string;
  stars: number | null;
  onChange: (event: ChangeEvent<{}>, newHover: number | null) => void;
  question: string;
  required: boolean;
};

export default function Question({
  name,
  stars,
  onChange,
  question,
  required,
}: QuestionProps): JSX.Element {
  const classes = useStyles();
  const [hover, setHover] = useState(-1);

  return (
    <>
      <Typography variant="h2">{question}</Typography>
      <Box display="flex" alignItems="center">
        <Rating
          name={name}
          className={classes.stars}
          value={stars}
          onChange={onChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {stars !== null && (
          <Box ml={2}>
            {DEFAULT_RATING_LABELS[hover !== -1 ? hover : stars]}
          </Box>
        )}
      </Box>
      {required && <Typography variant="subtitle2">(Required)</Typography>}
    </>
  );
}
