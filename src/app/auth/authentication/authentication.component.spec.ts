import { Credentials } from "./../store/auth.actions";
import { FooterComponent } from "./../../shared/footer/footer.component";
import { HeaderComponent } from "./../../shared/header/header.component";
import { LoadingComponent } from "./../../shared/loading/loading.component";
import { ProductDashboardComponent } from "./../../dashboard/product-dashboard/product-dashboard.component";
import { ProductItemComponent } from "./../../dashboard/product-item/product-item.component";
import { FilterProductsPipe } from "./../../dashboard/filter-products.pipe";
import { FiltersComponent } from "./../../dashboard/filters/filters.component";
import { ProductGridComponent } from "./../../dashboard/product-grid/product-grid.component";
import { AuthFacade } from "./../store/auth.facade";
import { Location } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router, Routes } from "@angular/router";
import { AuthenticationComponent } from "./authentication.component";
import { Store } from "@ngrx/store";
import * as fromAuth from "./../store/auth.reducers";
import { Observable, BehaviorSubject } from "rxjs";
import { SignInComponent } from "../sign-in/sign-in.component";
import { FormsModule } from "@angular/forms";
import { SideBarComponent } from "src/app/shared/side-bar/side-bar.component";
import * as fromApp from "./../../store/app.reducers";

const routes: Routes = [
  { path: "", redirectTo: "authentication/signin", pathMatch: "full" },
  { path: "dashboard/products/pizza", component: ProductGridComponent },
  { path: "", component: SignInComponent }
];

// it is better to move to shared file becuase you are using it not only for this spec
class TestStore<T> {
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

describe("AuthenticationComponent", () => {
  let store: MockStore<{ authStatus: boolean; userData: Array<any> }>;
  const initialState = { authStatus: false, userData: [] };
  let location: Location;
  let router: Router;
  // let component: AuthenticationComponent;
  // let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule],
      declarations: [
        AuthenticationComponent,
        ProductGridComponent,
        SignInComponent,
        FiltersComponent,
        FilterProductsPipe,
        ProductItemComponent,
        ProductDashboardComponent,
        LoadingComponent,
        SideBarComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [provideMockStore({ initialState })]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    store = TestBed.get(Store);
    router.initialNavigation();
    // fixture = TestBed.createComponent(AuthenticationComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it("should call ngOnInit", () => {
    // fixture better declare in beforeEach section like
    const fixture = TestBed.createComponent(AuthenticationComponent);
    // better to call it - component and declare in beforeEach section
    let authComponent = fixture.debugElement.componentInstance;
    spyOn(authComponent, "ngOnInit").and.callThrough();
    spyOn(authComponent, "checkAuthenticationStatus").and.callThrough();
    // there is no expect in this it!!!
  });

  it("should call checkAuthenticationStatus", () => {
    // if you never reassign variable better to use - const instead let
    let store = new TestStore<fromAuth.AuthState>();
    store.setState({
      authStatus: true,
      userData: []
    });

    let mockFacade = new MockAuthFacade(store);
    mockFacade.authModuleStatus$.subscribe(authRes => {
      if (authRes.authStatus) {
        router.navigate([""]).then(() => {
          expect(location.path()).toBe("/");
        });
      } else {
        router.navigate(["/dashboard/products/pizza"]).then(() => {
          expect(location.path()).toBe("/dashboard/products/pizza");
        });
      }
    });
  });

  it("should call isAuthenticated", () => {
    // also do not forget to run tests with coverage mode to see what cases you have not covered
    let onlineMode = true;
    let credentials: Credentials = {
      login: "John",
      password: "test"
    };

    const store = jasmine.createSpyObj<Store<fromApp.AppState>>("store", [
      "dispatch",
      "select",
      "pipe"
    ]);
    let authFacade = new AuthFacade(store);

    if (onlineMode && credentials) {
      let trySignInSpy = spyOn(authFacade, "trySignIn");
      authFacade.trySignIn(credentials);
      expect(trySignInSpy).toHaveBeenCalledTimes(1);
      expect(trySignInSpy).toHaveBeenCalledWith(credentials);
    }
  });
});
