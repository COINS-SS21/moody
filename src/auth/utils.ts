import { Auth } from "aws-amplify";
import { store } from "../reduxStore";
import { signIn, signOut } from "./authSlice";

export const syncUserWithRedux = async () => {
  try {
    const currentUser: any | null = await Auth.currentAuthenticatedUser();
    if (currentUser) {
      console.log(currentUser);
      store.dispatch(
        signIn({
          name: currentUser.attributes.name,
          email: currentUser.attributes.email,
          id: currentUser.username,
        })
      );
    } else {
      store.dispatch(signOut());
    }
  } catch (e) {
    store.dispatch(signOut());
  }
};
