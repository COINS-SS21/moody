import { Button } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import { useCallback, useEffect, useMemo } from "react";
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

  const dataFiles: Record<string, object> = useMemo(() => {
    const id = meetingInformation?.id ?? "unknown-meeting-id";
    return {
      [`face-expressions-${id}.json`]: audienceFaceExpressions,
      [`voice-emotions-${id}.json`]: speakerVoiceEmotions,
      [`meeting-info-${id}.json`]: meetingInformation || {},
      [`ratings-${id}.json`]: ratings,
    };
  }, [
    audienceFaceExpressions,
    meetingInformation,
    ratings,
    speakerVoiceEmotions,
  ]);

  const handleDownload = useCallback(() => {
    Object.keys(dataFiles).forEach((filename) => {
      const jsonData = JSON.stringify(dataFiles[filename]);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    });
  }, [dataFiles]);

  return (
    <Button
      startIcon={<CloudDownload />}
      color="primary"
      onClick={handleDownload}
    >
      Export meeting data
    </Button>
  );
}
