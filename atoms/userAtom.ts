import { atom } from "recoil";

// signedin-user {uid, email, displayName}
export const userAtom = atom<{ uid: string; email: string; displayName: string }>({
  key: "signedin-user",
  default: {
    uid: "",
    email: "",
    displayName: "",
  },
});
