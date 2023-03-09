import { atom } from "recoil";

type UserAtomType = { uid: string; email: string; displayName: string };

// signedin-user {uid, email, displayName}
export const userAtom = atom<UserAtomType>({
  key: "signedin-user",
  default: {
    uid: "",
    email: "",
    displayName: "",
  },
});
