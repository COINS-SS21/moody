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
    const downloadFile = (filename: string, data: object) => {
      const jsonData = JSON.stringify(data);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    };

    let index = 0;
    const downloadFiles = () => {
      if (index < Object.entries(dataFiles).length) {
        const [filename, data] = Object.entries(dataFiles)[index];
        const downloadButton = document.createElement("a");
        downloadButton.style.display = "none";
        downloadButton.addEventListener("click", () =>
          downloadFile(filename, data)
        );
        document.body.appendChild(downloadButton);
        downloadButton.click();
        document.body.removeChild(downloadButton);
        index++;
        setTimeout(downloadFiles, 100); // Add a small delay of 100ms
      }
    };

    downloadFiles();
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
