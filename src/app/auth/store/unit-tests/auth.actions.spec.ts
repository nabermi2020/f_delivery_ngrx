import { UserData } from "./../../auth.interfaces";
import * as fromAuth from './../auth.reducers';
import {
  SignUp,
  TrySignIn,
  Credentials,
  LogOut,
  TrySignUp,
  CleanUserData,
  SetUserData
} from "./../auth.actions";
import { SignIn } from "../auth.actions";
import { User } from "../../user.model";

describe("Auth Actions", () => {
  // if you have entities which can be shared better to add them to json file and require in places where you need it
  const mockUserData = {
    firstName: "Michael",
    lastName: "Oherni",
    login: "John9992222",
    phone: "+380501865210",
    email: "naber2008@ukr.net",
    address: "LA, New Walley 145/85",
    password: "test123",
    userId: 33
  };

  // from my point of view actions we can leave without tests but if you have it - good
  it("Sign In", () => {
    const action = SignIn();
    expect({ ...action }).toEqual({ type: "[AUTH] SIGN_IN" });
  });

  it("Sign Up", () => {
    const action = SignUp();
    expect({ ...action }).toEqual({ type: "[AUTH] SIGN_UP" });
  });

  it("Try Sign In", () => {
    const payload: Credentials = {
      login: "John",
      password: "test@123"
    };

    const action = TrySignIn(payload);

    expect({ ...action }).toEqual({
      type: "[AUTH] TRY_SIGN_IN",
      ...payload
    });
  });

  it("Log Out", () => {
    const action = LogOut();
    expect({ ...action }).toEqual({ type: "[AUTH] LOG_OUT" });
  });

  it("Try Sign Up", () => {
    const user = new User(mockUserData);
    const action = TrySignUp(user);

    expect({ ...action }).toEqual({
      type: "[AUTH] TRY_SIGN_UP",
      ...user
    });
  });

  it("Clean User Data", () => {
    const action = CleanUserData();
    expect({ ...action }).toEqual({ type: "[AUTH] CLEAN_USER_DATA" });
  });

  it("Set User Data", () => {
    const user = new User(mockUserData);
    let users: Array<User> = [];
    users.push(user);

    const action = SetUserData(users);
    // master it is latest source of truth, so it is always should be clean, so no console logs or etc, you can easily use them locally or inside you dev branches but never in the master, please try to get used to it
    console.log({...action});
    console.log({type: "[AUTH] SET_USER_DATA", payload: users});

    // also related to hidden code, if it is hidden then you do not need it, so why to keep it?
    // expect(action).toEqual({
    //   type: "[AUTH] SET_USER_DATA",
    //   ...users
    // });
  });
});
