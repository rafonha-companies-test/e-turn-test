angular.module('NewContact').controller('ContactController', function ContactController($http, $rootScope) {

    var vr = this;
    vr.contact = {};
    vr.contacts = [];

    vr.regex = '^[1-9]{2}\-[2-9][0-9]{7,8}$';

    //Procura o cep na API Postmon
    vr.searchCEP = function () {
        $http.get('http://api.postmon.com.br/cep/' + vr.cep).then(function (location) {
            vr.found_location = location;
            console.log(location);
                vr.contact.bairro = location.data.bairro,
                vr.contact.logradouro = location.data.logradouro, 
                vr.contact.cidade = location.data.cidade,
                vr.contact.estado = location.data.estado

        });
    };

    //Verifica se o e-mail est� duplicado
    vr.verifyDuplicityEmail = function (email) {
        for (i in vr.contacts) {
            if (vr.contacts[i].email == email) {
                vr.ContactForm.email.$setValidity('duplicated', false);
            } else {
                vr.ContactForm.email.$setValidity('duplicated', true);
            }
        }
    }

    //Verifica se o telefone est� duplicado
    vr.verifyDuplicityPhone = function (phoneNumber) {
        for (i in vr.contacts) {
            if (vr.contacts[i].phoneNumber == phoneNumber) {
                vr.ContactForm.phoneNumber.$setValidity('duplicated', false);
            } else {
                vr.ContactForm.phoneNumber.$setValidity('duplicated', true);
            }
        }
    }

    //Adiciona mais um telefone
    vr.phones = [''];

    vr.addPhones = function () {
        vr.phones.push('');
    }

    //Adiciona mais um endere�o
    vr.addresses = [{
        cep: '',
        street: '',
        streetNumber: '',
        neighbourhood: '',
        city: '',
        state: ''
    }]

    vr.addAddresses = function () {
        vr.addresses.push({
            cep: '',
            street: '',
            streetNumber: '',
            neighbourhood: '',
            city: '',
            state: ''
        });
    }

    //Adiciona contato em contacts
    vr.addContact = function () {
        vr.contacts.push({
            name: vr.contact.name,
            email: vr.contact.email,
            phoneNumber: vr.phonesSet.phones[$index],
            comments: vr.contact.comments,
            cep: vr.cep,
            street: vr.contact.logradouro,
            streetNumber: vr.contact.streetNumber,
            neighbourhood: vr.contact.bairro,
            city: vr.contact.cidade,
            state: vr.contact.estado
        });

        //Limpa o formul�rio depois de adicionar as informa��es
        vr.contact = {};
    }   

})
