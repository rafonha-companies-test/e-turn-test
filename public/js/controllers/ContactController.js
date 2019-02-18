angular.module('NewContact').controller('ContactController', function ContactController($http) {

    var vr = this;
    vr.contact = {};
    vr.contacts = [];

    vr.regex = '^[1-9]{2}\-[2-9][0-9]{7,8}$';

    //Procura o cep na API Postmon
    vr.searchCEP = function () {
        $http.get('http://api.postmon.com.br/cep/' + vr.cep).then(function (location) {
            vr.found_location = location;
            console.log(location);
            vr.contact.Bairro = location.data.Bairro
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

    //Adiciona contato em contacts
    vr.addContact = function () {
        vr.contacts.push({
            name: vr.contact.name,
            email: vr.contact.email,
            phoneNumber: vr.contact.phoneNumber,
            comments: vr.contact.comments,
            cep: vr.contact.cep,
            street: vr.contact.Logradouro,
            streetNumber: vr.contact.streetNumber,
            neighbourhood: vr.contact.Bairro,
            city: vr.contact.Cidade,
            state: vr.contact.Estado
        });

        //Limpa o formulário depois de adicionar as informações
        vr.contact = {};
    }
})
