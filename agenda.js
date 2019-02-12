//Função imediata
(function () {
    console.log('=== start App ===');

    var ui = {
        fields: document.querySelectorAll('input'),
        button: document.querySelector('.pure-button'),
        table: document.querySelector('.pure-table')
    }

    var endpoint = 'http://localhost:4000/schedule';

    var validateFields = (e) => {
        e.preventDefault();
        var data = {};
        var errors = 0;

        ui.fields.forEach(function (field) {
            if(field.value.trim().length === 0){
                field.classList.add('error');
                errors++;    
            } else {                
                field.classList.remove('error');
                data[field.id] = field.value.trim();                
            }                       
        });  

        if(errors > 0){
            document.querySelector('.error').focus();
        } else {
            addContact(data);
        }        
    };

    var addContact = (contact) => {                
        var config = {
            method:"POST",
            body: JSON.stringify(contact),
            headers: new Headers({
                "Content-Type":"application/json"
            })
        };

        fetch(endpoint, config)
            .then(addContactSuccess)
            .catch(genericError);
    };

    var getContacts = () => {
        var config = {
            method:"GET",            
            headers: new Headers({
                "Content-Type":"application/json"
            })
        };

        fetch(endpoint, config)
            .then(function (res) { return res.json() })
            .then(getContactsSuccess)
            .catch(genericError);
    };

    var removeContact = () => {};
    

    var addContactSuccess = () => {
        cleanFields();
        getContacts();
    }

    var genericError = () => console.error(arguments);
    var cleanFields  = () => ui.fields.forEach(field => field.value = '');    

    var getContactsSuccess = function(contacts) {
        console.table(contacts);
    }

    var init = function() {
        //Toda vez que atribuo uma funcão a um evento de um recurso o evento é implicitamente
        //injetado na função destino, no ex abaixo MouseEvent.
        ui.button.onclick = validateFields;
    }();
})();