angular.module('NewContact').controller('ContactController', function ContactController($http, $rootScope) {

    var vr = this;
    vr.contact = {};
    vr.contacts = [];

    vr.regex = '^[1-9]{2}\-[2-9][0-9]{7,8}$';

    //Procura o cep na API Postmon
    vr.searchCEP = function (index) {
        $http.get('http://api.postmon.com.br/cep/' + vr.addresses[index].cep).then(function (location) {
            vr.found_location = location;
            console.log(location);
            vr.addresses[index].bairro = location.data.bairro,
                vr.addresses[index].logradouro = location.data.logradouro,
                vr.addresses[index].cidade = location.data.cidade,
                vr.addresses[index].estado = location.data.estado

        });
    };

    //Verifica se o e-mail está duplicado
    vr.verifyDuplicityEmail = function (email) {
        for (i in vr.contacts) {
            if (vr.contacts[i].email == email) {
                vr.ContactForm.email.$setValidity('duplicated', false);
            } else {
                vr.ContactForm.email.$setValidity('duplicated', true);
            }
        }
    }

    //Verifica se o telefone está duplicado
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

    //Adiciona mais um endereço
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
            phoneNumber: vr.phones[$index],
            comments: vr.contact.comments,
            cep: vr.cep,
            street: vr.address.logradouro,
            streetNumber: vr.address.streetNumber,
            neighbourhood: vr.address.bairro,
            city: vr.address.cidade,
            state: vr.address.estado
        });

        //Limpa o formulário depois de adicionar as informações
        vr.contact = {};
    }   

})
