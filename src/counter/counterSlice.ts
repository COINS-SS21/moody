import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import db from "../db";
import ICounterModel from "./CounterModel";
import { RootState } from "../reduxStore";

export const fetchAllCounters = createAsyncThunk(
  "counter/fetchAll",
  async () => {
    return (await db.counters.toArray()) as ICounterModel[];
  }
);

export const updateCounterById = createAsyncThunk(
  "counter/updateById",
  async (data: { id: number; value: number }) => {
    return (await db.counters
      .update(data.id, { value: data.value })
      .then(() => db.counters.get(data.id))) as ICounterModel;
  }
);

export const addCounter = createAsyncThunk("counter/add", async () => {
  return (await db.counters
    .add({ value: 0 })
    .then((newId) => db.counters.get(newId))) as ICounterModel;
});

export const deleteCounter = createAsyncThunk(
  "counter/delete",
  async (id: number) => {
    await db.counters.delete(id);
    return id as number;
  }
);

const countersAdapter = createEntityAdapter<ICounterModel>();
const initialState = countersAdapter.getInitialState({ loading: false });

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCounters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCounters.fulfilled, (state, { payload }) => {
        countersAdapter.upsertMany(state, payload);
        state.loading = false;
      })
      .addCase(updateCounterById.fulfilled, (state, { payload }) => {
        const { id, ...changes } = payload;
        if (id) {
          countersAdapter.updateOne(state, { id, changes });
        }
      })
      .addCase(addCounter.fulfilled, countersAdapter.addOne)
      .addCase(deleteCounter.fulfilled, countersAdapter.removeOne);
  },
});

export const { selectAll: selectAllCounters } = countersAdapter.getSelectors(
  (state: RootState) => state.counter
);

export default counterSlice.reducer;
