import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listMeetings } from "../graphql/queries";
import { RootState } from "../reduxStore";
import { Meeting } from "../API";

export const fetchAllMeetings = createAsyncThunk(
  "meetings/fetchAll",
  async () => {
    const {
      data: {
        listMeetings: { items },
      },
    } = (await API.graphql(graphqlOperation(listMeetings))) as any;

    return items as Meeting[];
  }
);

const meetingsAdapter = createEntityAdapter<Meeting>();
const initialState = meetingsAdapter.getInitialState({ loading: false });

export const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMeetings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMeetings.fulfilled, (state, { payload }) => {
        meetingsAdapter.upsertMany(state, payload);
        state.loading = false;
      })
      .addCase(fetchAllMeetings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { selectAll: selectAllMeetings } = meetingsAdapter.getSelectors(
  (state: RootState) => state.meetings
);

export default meetingsSlice.reducer;
