import { LoadingService } from './services/loading.service';

import { EditModalService } from './services/edit-modal.service';

export class AppNotFoundErr {
    private errorCode;
    private errorMsg;
    
    constructor(public specificErr) {
        this.errorCode = specificErr.status;
        this.errorMsg = specificErr.statusText;
    }
}