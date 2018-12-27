"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_test_service_1 = require('./http-test.service');
var HttpTestComponent = (function () {
    function HttpTestComponent(httpService) {
        this.httpService = httpService;
        this.endereco = {};
        this.editEstabelecimento = { idCliente: '', razaoSocial: '', nomeFantasia: '',
            endereco: {
                uf: '',
                cidade: '',
                bairro: '',
                rua: '',
                numero: '',
                complemento: ''
            }
        };
        this.estabelecimento = { razaoSocial: '', nomeFantasia: '',
            endereco: {
                uf: '',
                cidade: '',
                bairro: '',
                rua: '',
                numero: '',
                complemento: ''
            }
        };
        this.onTestGetClientes();
    }
    HttpTestComponent.prototype.chamaInsert = function (variavel) {
        var _this = this;
        console.log(variavel);
        this.httpService.create(this.estabelecimento).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
            _this.onTestGetClientes();
            _this.estabelecimento.nomeFantasia = '';
            _this.estabelecimento.razaoSocial = '';
            _this.estabelecimento.endereco.bairro = '';
            _this.estabelecimento.endereco.cidade = '';
            _this.estabelecimento.endereco.complemento = '';
            _this.estabelecimento.endereco.numero = '';
            _this.estabelecimento.endereco.rua = '';
            _this.estabelecimento.endereco.uf = '';
            console.log(_this.estabelecimento);
        });
    };
    HttpTestComponent.prototype.cancelarEdit = function () {
        document.getElementById("editarEstabelecimento").style.display = 'none';
        document.getElementById("cadastroNovo").style.display = 'block';
    };
    HttpTestComponent.prototype.editarCliente = function (cliente) {
        document.getElementById("editarEstabelecimento").style.display = 'block';
        document.getElementById("cadastroNovo").style.display = 'none';
        this.editEstabelecimento.idCliente = cliente.id;
        this.editEstabelecimento.razaoSocial = cliente.razaoSocial;
        this.editEstabelecimento.nomeFantasia = cliente.nomeFantasia;
        this.editEstabelecimento.endereco.uf = cliente.endereco.uf;
        this.editEstabelecimento.endereco.bairro = cliente.endereco.bairro;
        this.editEstabelecimento.endereco.rua = cliente.endereco.rua;
        this.editEstabelecimento.endereco.cidade = cliente.endereco.cidade;
        this.editEstabelecimento.endereco.complemento = cliente.endereco.complemento;
        this.editEstabelecimento.endereco.numero = cliente.endereco.numero;
        console.log(this.editEstabelecimento);
    };
    HttpTestComponent.prototype.editarService = function () {
        var _this = this;
        this.numCliente = parseInt(this.editEstabelecimento.idCliente);
        console.log(this.editEstabelecimento);
        this.httpService.editar(this.editEstabelecimento, this.numCliente).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
            _this.onTestGetClientes();
            _this.cancelarEdit();
            _this.editEstabelecimento.nomeFantasia = '';
            _this.editEstabelecimento.razaoSocial = '';
        });
    };
    HttpTestComponent.prototype.buscaCep = function (numCep) {
        var _this = this;
        var teste = numCep;
        this.httpService.consultaCep(teste).subscribe(function (data) {
            _this.endereco = data;
            console.log(_this.endereco._body);
            _this.getCep = JSON.parse(_this.endereco._body);
            _this.estabelecimento.endereco.uf = _this.getCep.uf;
            _this.estabelecimento.endereco.rua = _this.getCep.logradouro;
            _this.estabelecimento.endereco.bairro = _this.getCep.bairro;
            _this.estabelecimento.endereco.cidade = _this.getCep.localidade;
            _this.estabelecimento.endereco.complemento = _this.getCep.complemento;
        });
    };
    HttpTestComponent.prototype.deletaCliente = function (id) {
        var _this = this;
        this.httpService.delete(id).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
            _this.onTestGetClientes();
        });
    };
    HttpTestComponent.prototype.onTestGet = function () {
        var _this = this;
        this.httpService.getCurrentTime()
            .subscribe(function (data) { return _this.getData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log("acesso a webapi get ok..."); });
    };
    HttpTestComponent.prototype.onTestGetClientes = function () {
        var _this = this;
        this.httpService.getClientes()
            .subscribe(function (data) { return _this.getClientes = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            console.log(_this.getClientes);
        });
    };
    HttpTestComponent.prototype.OnTestPost = function () {
        var _this = this;
        this.httpService.postJSON()
            .subscribe(function (data) { return _this.postData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log("acesso a webapi post ok..."); });
    };
    HttpTestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lista-requisicao',
            templateUrl: 'http-teste.html'
        }), 
        __metadata('design:paramtypes', [http_test_service_1.HttpTestService])
    ], HttpTestComponent);
    return HttpTestComponent;
}());
exports.HttpTestComponent = HttpTestComponent;
//# sourceMappingURL=http-teste.component.js.map