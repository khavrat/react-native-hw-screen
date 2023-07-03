import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });

      const { uid, displayName } = await auth.currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email: email,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    } catch (error) {
      console.log("error.message in authSignUpUser", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error in authSignInUser", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log("error  in :>> authSignOutUser", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          login: user.displayName,
          userId: user.uid,
          email: user.email,
        };
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log("error in authStateChangeUser:>> ", error.message);
  }
};

export const authChangeAvatarUser =
  ({ avatarPath }) =>
  async (dispatch, getState) => {
    try {
      await onAuthStateChanged(auth, () => {
        const userUpdatedAvatar = {
          avatarPath: avatarPath,
        };

        const { stateChange } = getState().auth;
        if (stateChange === false) {
          dispatch(authSlice.actions.updateAvatarPath(userUpdatedAvatar));
        }
        if (stateChange === true) {
          dispatch(authSlice.actions.updateAvatarPath(userUpdatedAvatar));
          dispatch(
            authSlice.actions.authStateChange({
              stateChange: true,
            })
          );
        }
      });
    } catch (error) {
      console.log("error in authChangeAvatarUser:>> ", error.message);
    }
  };
