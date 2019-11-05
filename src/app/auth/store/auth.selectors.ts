import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducers';

export class AuthSelectors {
    constructor(private store: Store<fromApp.AppState>) {}

    public authModule$ = this.store.select("authModule");
}
