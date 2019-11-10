import * as fromAuthSelectors from "./../store/auth.selectors";

describe("Auth Module selectors", () => {
  const mockState = {
    userMockInfoSuccess: [
      {
        firstName: "johnny",
        lastName: "sidness",
        login: "John999",
        password: "test123",
        phone: "0501865210",
        email: "nab@op.op",
        address: "LA, New Walley 145/85",
        userId: 988,
        id: 24
      }
    ],
    userMockInfoFailure: [],
    authStatusSuccess: true,
    authStatusFalse: false
  };

  it("getAuthStatus success selector", () => {
    expect(
      fromAuthSelectors.getAuthStatus.projector({
        authStatus: mockState.authStatusSuccess
      })
    ).toBe(true);
  });

  it("getAuthStatus failure selector", () => {
    expect(
      fromAuthSelectors.getAuthStatus.projector({
        authStatus: mockState.authStatusFalse
      })
    ).toBe(false);
  });

  it("getUserData failure selector", () => {
    expect(
      fromAuthSelectors.getUserData.projector({
        userData: mockState.userMockInfoFailure
      })
    ).toBe(undefined);
  });

  it("getUserData success selector", () => {
    expect(
      fromAuthSelectors.getUserData.projector({
        userData: mockState.userMockInfoSuccess
      })
    ).toBe(mockState.userMockInfoSuccess[0]);
  });
});
