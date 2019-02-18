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
    vr.phonesSet = {
        phones: []
    };
    vr.phonesSet.phones = [];   

    vr.addPhones = function () {
        $scope.phonesSet.phones.push('');
    }

    //Adiciona mais um endereço
    vr.addressesSet = {
        addresses: []
    };

    vr.addressesSet.addresses = [
        cep = vr.cep,
        street = vr.contact.logradouro,
        streetNumber = vr.contact.streetNumber,
        neighbourhood = vr.contact.bairro,
        city = vr.contact.cidade,
        state = vr.contact.estado
    ];

    vr.addAddresses = function () {
        $scope.addressesSet.addresses.push('');
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

        //Limpa o formulário depois de adicionar as informações
        vr.contact = {};
    }   

})
