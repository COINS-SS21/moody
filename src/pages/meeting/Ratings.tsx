import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  fetchActiveMeetingRatings,
  selectActiveMeetingRatings,
  subscribeToActiveMeetingRatings,
} from "../../meetings/ratingsSlice";
import { Box, Typography } from "@material-ui/core";
import Loader from "../../components/Loader";
import { Alert } from "@material-ui/lab";
import RatingsBarChart from "./RatingsBarChart";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Ratings(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActiveMeetingRatings());

    let subscription: any;
    const subscribeToRatings = async () => {
      subscription = unwrapResult(
        await dispatch(subscribeToActiveMeetingRatings())
      );
    };
    subscribeToRatings();
    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  const ratingsLength = useAppSelector(
    (state) => selectActiveMeetingRatings(state).length
  );
  const loading = useAppSelector(
    (state) => state.ratings.loading && state.ratings.ids.length === 0
  );

  return loading ? (
    <Loader />
  ) : (
    <>
      <Typography variant="h3" gutterBottom>
        Ratings (N={ratingsLength})
      </Typography>
      {ratingsLength === 0 ? (
        <Alert severity="info">
          <Typography variant="body1">
            There are no ratings yet. Create a feedback link after you finished
            the meeting and send it to your audience.
            <br />
            <strong>
              Note: Feedback links are only valid for 30 minutes after the
              meeting has ended.
            </strong>
          </Typography>
        </Alert>
      ) : (
        <Box display="inline-block">
          <RatingsBarChart />
        </Box>
      )}
    </>
  );
}
