import { Button } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import { useEffect } from "react";
import { selectActiveMeetingAudienceFaceExpressions } from "../../meetings/audienceFaceExpressionSlice";
import { selectActiveMeeting } from "../../meetings/meetingsSelectors";
import {
  fetchActiveMeetingRatings,
  selectActiveMeetingRatings,
} from "../../meetings/ratingsSlice";
import { selectActiveMeetingSpeakerVoiceEmotions } from "../../meetings/speakerVoiceEmotionSlice";
import { AudienceFaceExpression, SpeakerVoiceEmotion } from "../../models";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";

export default function ExportButton() {
  // Ratings are lazy loaded, we load them as soon as the export button renders to make sure they are up-to-date
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchActiveMeetingRatings());
  }, [dispatch]);

  const audienceFaceExpressions: AudienceFaceExpression[] = useAppSelector(
    selectActiveMeetingAudienceFaceExpressions
  );
  const speakerVoiceEmotions: SpeakerVoiceEmotion[] = useAppSelector(
    selectActiveMeetingSpeakerVoiceEmotions
  );
  const meetingInformation = useAppSelector(selectActiveMeeting);
  const ratings = useAppSelector(selectActiveMeetingRatings);

  console.log("face", audienceFaceExpressions);
  console.log("voice", speakerVoiceEmotions);
  console.log("meetingInfo", meetingInformation);
  console.log("ratings", ratings);

  return (
    <Button startIcon={<CloudDownload />} color="primary">
      Export meeting data
    </Button>
  );
}
