import { ALERT_TYPE } from './enums/AlertType.js';
import { OPERATION_TYPE } from './enums/OperationType.js';

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const statusCode = document.getElementById('statusCode').value;
const operationType = document.getElementById('operationType').value;

window.onload = function() {
    switch(statusCode) {
        case '200':
            return appendAlert(`Operacja ${getOperationTypeValue(operationType)} została zakończona sukcesem`, ALERT_TYPE.Success);
        case '400':
            return appendAlert(`Operacja ${getOperationTypeValue(operationType)} została zakończona niepowodzeniem`, ALERT_TYPE.Error);
        case '500':
            return appendAlert(`Coś poszło nie tak podzczas operacji ${getOperationTypeValue(operationType)}`, ALERT_TYPE.Warn);
        default:
            return;
    }
};

function appendAlert(message, type) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible row" role="alert"`,
        '   <div>',
        `       ${message}`,
        '       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '   </div>',
        '</div>'    
    ].join('');

    alertPlaceholder.append(wrapper);
};

function getOperationTypeValue(operation) {
    switch(operation) {
        case 'create':
            return OPERATION_TYPE.Create;
        case 'update':
            return operation = OPERATION_TYPE.Update;
        case 'delete':
            return operation = OPERATION_TYPE.Delete;
        default:
            return operation = OPERATION_TYPE.Get;
    }
}