import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getMeeting, listMeetings } from "../graphql/queries";
import { createAudienceFaceExpression } from "../graphql/mutations";

export default function Meetings(): JSX.Element {
  useEffect(() => {
    const fetchMeetings = async () => {
      console.log(await API.graphql(graphqlOperation(listMeetings)));
      console.log(
        await API.graphql(
          graphqlOperation(getMeeting, {
            id: "eaa2aa70-1fc0-4e24-abf6-e78a450a1d2f",
          })
        )
      );
    };
    fetchMeetings();
  }, []);
  return <h1>Meetings</h1>;
}
