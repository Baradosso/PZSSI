import { ALERT_TYPE } from './enums/AlertType.js';
import { OPERATION_TYPE } from './enums/OperationType.js';

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

export function showAlert(statusCode) {
    switch(statusCode) {
        case 201:
        case 202:
        case 203:
            return appendAlert(`Operacja ${getOperationTypeValue(statusCode)} została zakończona sukcesem`, ALERT_TYPE.Success);
        case 401:
        case 402:
        case 403:
            return appendAlert(`Operacja ${getOperationTypeValue(statusCode)} została zakończona niepowodzeniem`, ALERT_TYPE.Error);
        case 400:
            return appendAlert(`Coś poszło nie tak podzczas operacji ${getOperationTypeValue(statusCode)}`, ALERT_TYPE.Warn);
        default:
            return;
    }
};

function appendAlert(message, type) {
    const id = Math.random().toString(36).substring(2, 9);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible row" 
             role="alert"
             id="${id}">
           <div>
                ${message}
                <button type="button" 
                        class="btn-close" 
                        data-bs-dismiss="alert" 
                        aria-label="Close">
                </button>
           </div>
        </div>
    `;

    setTimeout(function() {
        $(`#${id}`).fadeOut(2000);
    },
    4000);

    setTimeout(function() {
        $(`#${id}`).remove();
    },
    6000);

    alertPlaceholder.append(wrapper);
};

function getOperationTypeValue(statusCode) {
    switch(statusCode) {
        case 201:
        case 401:
            return OPERATION_TYPE.Create;
        case 202:
        case 402:
            return OPERATION_TYPE.Delete;
        case 203:
        case 403:
            return OPERATION_TYPE.Update;
        default:
            return OPERATION_TYPE.Get;
    }
}