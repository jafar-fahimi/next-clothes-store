import { atom } from "recoil";

// signedin-user {uid, email, displayName}
export const userAtom = atom<{ uid: null | string; email: null | string; displayName: null | string }>({
  key: "signedin-user",
  default: {
    uid: null,
    email: null,
    displayName: null,
  },
});
