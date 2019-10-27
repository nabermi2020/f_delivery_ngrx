import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EditModalService {
    editMode: boolean = false;
    onEditChange = new Subject();
    
    constructor() {
        this.onEditChange.next(this.editMode);
    }

/**
 * Toggle 'edit profile' popup
 */    
    toggleEditMode() {
        this.editMode = !this.editMode;
        this.onEditChange.next(this.editMode);
    }
}
