// The number of minutes until expiration of the survey
import { PublicMeetingInfo } from "../../models";
import { useAppDispatch } from "../../reduxHooks";
import { useCallback, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { getPublicMeetingInfo } from "../../graphql/queries";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";
import { differenceInMinutes } from "date-fns";
import { addError } from "../../error/errorSlice";
import { createRating } from "../../graphql/mutations";
import { EXPIRATION_MINUTES } from "./constants";

export const useFetchPublicMeeting = (
  id: string
): [boolean, boolean, PublicMeetingInfo | null] => {
  const dispatch = useAppDispatch();
  const [publicMeeting, setPublicMeeting] = useState<PublicMeetingInfo | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(false);

  useEffect(() => {
    const fetchPublicMeeting = async () => {
      setLoading(true);
      try {
        const result = (await API.graphql({
          query: getPublicMeetingInfo,
          variables: { id },
          authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
        })) as any;
        setPublicMeeting(result?.data?.getPublicMeetingInfo);
        if (
          Math.abs(
            differenceInMinutes(
              new Date(result?.data?.getPublicMeetingInfo?.stoppedAt),
              new Date()
            )
          ) > EXPIRATION_MINUTES
        ) {
          setExpired(true);
        }
      } catch (e) {
        dispatch(addError(e.message));
        setExpired(false);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicMeeting();
  }, [dispatch, id]);

  return [loading, expired, publicMeeting];
};

export const useSubmitAnswer = (
  publicmeetinginfoID?: string,
  owner?: string
): [
  boolean,
  boolean,
  (
    overallStars: number,
    paceStars: number | null,
    contentStars: number | null
  ) => void
] => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const callback = useCallback(
    async (
      overallStars: number,
      paceStars: number | null,
      contentStars: number | null
    ): Promise<void> => {
      try {
        if (!publicmeetinginfoID || !owner) {
          dispatch(
            addError(
              "Something went wrong! This is most likely a bug. Please contact an administrator."
            )
          );
          return;
        }

        setLoading(true);
        await API.graphql({
          query: createRating,
          variables: {
            input: {
              overallStars,
              paceStars,
              contentStars,
              publicmeetinginfoID,
              owner,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
        });
        setSubmitted(true);
      } catch (e) {
        dispatch(addError(e.message));
      } finally {
        setLoading(false);
      }
    },
    [dispatch, owner, publicmeetinginfoID]
  );

  return [loading, submitted, callback];
};
