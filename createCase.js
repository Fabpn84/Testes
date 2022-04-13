import { LightningElement, api, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


export default class Recordeditform extends NavigationMixin(LightningElement) {
    @track caseId;
    @track objectInfo;
    // @api recordId;
    @api objectApiName;

    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    objectInfo;

    get recordTypeId() {
        // Returns a map of record type Ids 
        const rtis = this.objectInfo.data.recordTypeInfos;
        return Object.keys(rtis).find(rti => rtis[rti].name === 'Teste1');
    }

    handleSuccess(event) {
        this.caseId = event.detail.id;
        const toast = new ShowToastEvent({
            title: 'Success',
            message: 'Case created',
            variant: 'success',
        });
        this.dispatchEvent(toast);
    }

    handleClick(event) {
        event.detail.recordTypeId = this.recordTypeId;
    }

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        Console.log('No. of files uploaded : ' + uploadedFiles.length);
    }

    // Navigate to View Account Page
    navigateToViewACasePage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.caseId,
                objectApiName: 'Case',
                actionName: 'view'
            },
        });
    }

}