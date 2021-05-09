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

  console.log("Render");
  return (
    <div>
      <button onClick={() => dispatch(addCounter())}>Add</button>
      {loading
        ? "Loading ..."
        : counters.map((counter) => (
            <div style={{ marginTop: "12px" }} key={counter.id}>
              <button
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
              </button>
              <span>{counter.value}</span>
              <button
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
              </button>
              <button onClick={() => dispatch(deleteCounter(counter.id!))}>
                Remove
              </button>
            </div>
          ))}
    </div>
  );
}

export default Counter;
