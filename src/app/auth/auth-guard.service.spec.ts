import { FormsModule } from "@angular/forms";
import { SignInComponent } from "./sign-in/sign-in.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { Store } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { TestBed } from "@angular/core/testing";
import { BehaviorSubject, Observable } from "rxjs";
import { async } from "@angular/core/testing";
import * as fromAuth from "./store/auth.reducers";
import { Routes, Router } from "@angular/router";
import { Location } from "@angular/common";

const routes: Routes = [
  { path: "", redirectTo: "authentication/signin", pathMatch: "full" },
  { path: "", component: SignInComponent }
];

export class TestStore<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  dispatch(action: any) {}
}

class MockAuthFacade {
  constructor(private mockStore: TestStore<fromAuth.AuthState>) {}

  public authModuleStatus$ = this.mockStore.select("authModule");
}

describe("Auth Guard", () => {
  let store: MockStore<{ authStatus: boolean; userData: Array<any> }>;
  const initialState = { authStatus: false, userData: [] };
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule],
      declarations: [SignInComponent],
      providers: [provideMockStore({ initialState })]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    store = TestBed.get(Store);
    router.initialNavigation();
  }));

  // subject does not really good and semantic
  it("checkAuthenticationStatus && canActivate", () => {
    let store = new TestStore<fromAuth.AuthState>();
    store.setState({
      authStatus: true,
      userData: []
    });
    let isAuthorized: boolean;
    let authorizedStatus: boolean;

    let mockFacade = new MockAuthFacade(store);
    let userInfo: boolean = true;
    // do not forget to unsubscribe in afterAll or afterEach section
    mockFacade.authModuleStatus$.subscribe(authRes => {
      isAuthorized = authRes.authStatus;
    });
    expect(isAuthorized).toEqual(true);
    // it is not good practice to add logic like if or for loops or etc to tests
    if (isAuthorized && userInfo) {
      authorizedStatus = true;
    } else {
      isAuthorized = false;
    }

    expect(authorizedStatus).toEqual(true);

    authorizedStatus = false;
    router.navigate([""]).then(() => {
      expect(authorizedStatus).toEqual(false);
      expect(location.path()).toBe("/");
    });
  });
});
