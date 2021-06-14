import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { SpeakerVoiceEmotion } from "../models";
import { DataStore } from "aws-amplify";
import { RootState } from "../reduxStore";
import last from "lodash-es/last";
import { PaulEkmanVoiceEmotion } from "./speakerVoiceEmotionUtils";

export const addVoiceEmotionScore = createAsyncThunk(
  "speakerVoiceEmotion/addScore",
  async (data: {
    score: number;
    meetingID: string;
    raw: PaulEkmanVoiceEmotion;
  }) => {
    return (await DataStore.save(
      new SpeakerVoiceEmotion({
        score: data.score,
        meetingID: data.meetingID,
        ...data.raw,
        timestamp: Date.now(),
      })
    )) as SpeakerVoiceEmotion;
  }
);

const speakerVoiceEmotionAdapter = createEntityAdapter<SpeakerVoiceEmotion>({
  sortComparer: (a: SpeakerVoiceEmotion, b: SpeakerVoiceEmotion) =>
    a.timestamp - b.timestamp,
});
const initialState = speakerVoiceEmotionAdapter.getInitialState();

export const speakerVoiceEmotionSlice = createSlice({
  name: "speakerVoiceEmotions",
  initialState,
  reducers: {
    fetchSpeakerVoiceEmotions: speakerVoiceEmotionAdapter.upsertMany,
    deleteSpeakerVoiceEmotions: speakerVoiceEmotionAdapter.removeMany,
  },
  extraReducers: (builder) => {
    builder.addCase(
      addVoiceEmotionScore.fulfilled,
      speakerVoiceEmotionAdapter.upsertOne
    );
  },
});

export const { fetchSpeakerVoiceEmotions, deleteSpeakerVoiceEmotions } =
  speakerVoiceEmotionSlice.actions;

export const { selectAll: selectAllSpeakerVoiceEmotions } =
  speakerVoiceEmotionAdapter.getSelectors(
    (state: RootState) => state.speakerVoiceEmotions
  );

export const selectActiveMeetingSpeakerVoiceEmotions = createSelector(
  [
    (state: RootState) => state.meetings.activeMeeting,
    selectAllSpeakerVoiceEmotions,
  ],
  (activeMeetingId: string | null, emotions: SpeakerVoiceEmotion[]) =>
    emotions.filter((e) => e.meetingID === activeMeetingId) || []
);

export const selectActiveMeetingSpeakerVoiceEmotionsCurrentScore =
  createSelector(selectActiveMeetingSpeakerVoiceEmotions, (emotions) =>
    last(emotions)
  );

export default speakerVoiceEmotionSlice.reducer;
