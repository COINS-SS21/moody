import React, { useEffect } from "react";
import {
  addCounter,
  deleteCounter,
  fetchAllCounters,
  selectAllCounters,
  updateCounterById,
} from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import ICounterModel from "./CounterModel";
import { Box, Button, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Loader from "../components/Loader";

function Counter(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(fetchAllCounters());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const counters: ICounterModel[] = useAppSelector(selectAllCounters);
  const loading: boolean = useAppSelector((state) => state.counter.loading);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(addCounter())}
      >
        Add
      </Button>
      {loading ? (
        <Loader />
      ) : (
        counters.map((counter) => (
          <Box mt={1} key={counter.id}>
            <Button
              aria-label="Increment value"
              onClick={() => {
                dispatch(
                  updateCounterById({
                    id: counter.id!,
                    value: counter.value + 1,
                  })
                );
              }}
            >
              Increment
            </Button>
            <Typography component="span">{counter.value}</Typography>
            <Button
              aria-label="Decrement value"
              onClick={() => {
                dispatch(
                  updateCounterById({
                    id: counter.id!,
                    value: counter.value - 1,
                  })
                );
              }}
            >
              Decrement
            </Button>
            <Button
              style={{ color: red[400] }}
              onClick={() => dispatch(deleteCounter(counter.id!))}
            >
              Remove
            </Button>
          </Box>
        ))
      )}
    </>
  );
}

export default Counter;
