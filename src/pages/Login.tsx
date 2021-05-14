import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";

export default function Login(): JSX.Element {
  return (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            label: "Name *",
            placeholder: "Enter your name",
            inputProps: {
              type: "text",
            },
            type: "name",
            required: true,
          },
          { type: "email" },
          { type: "password" },
        ]}
      />
    </AmplifyAuthenticator>
  );
}
