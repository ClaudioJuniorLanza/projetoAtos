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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var http_2 = require('@angular/http');
var HttpTestService = (function () {
    function HttpTestService(_http) {
        this._http = _http;
        this.headers = new http_2.Headers({ 'Content-Type': 'application/json' });
    }
    HttpTestService.prototype.delete = function (idCliente) {
        return this._http.delete('http://localhost:8080/clientes/' + idCliente)
            .map(function (res) { return res.json(); });
    };
    HttpTestService.prototype.editar = function (editEstabelecimento, idCliente) {
        console.log(idCliente);
        console.log(editEstabelecimento);
        return this._http.put('http://localhost:8080/clientes/' + idCliente, JSON.stringify(editEstabelecimento), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    HttpTestService.prototype.createProject = function (project) {
        console.log(project);
        if (project !== null) {
            return this._http.post('http://localhost:8080/salvarProject', JSON.stringify(project), { headers: this.headers })
                .map(function (res) { return res.json(); });
        }
    };
    HttpTestService.prototype.createEmployee = function (employee) {
        console.log(employee);
        if (employee !== null) {
            return this._http.post('http://localhost:8080/salvarEmployee', JSON.stringify(employee), { headers: this.headers })
                .map(function (res) { return res.json(); });
        }
    };
    HttpTestService.prototype.create = function (estabelecimentos) {
        console.log(estabelecimentos);
        if (estabelecimentos !== null) {
            return this._http.post('http://localhost:8080/clientes', JSON.stringify(estabelecimentos), { headers: this.headers })
                .map(function (res) { return res.json(); });
        }
    };
    HttpTestService.prototype.getCurrentTime = function () {
        return this._http.get('http://date.jsontest.com')
            .map(function (res) { return res.json(); });
    };
    HttpTestService.prototype.getClientes = function () {
        return this._http.get('http://localhost:8080/clientes')
            .map(function (res) { return res.json(); });
    };
    HttpTestService.prototype.getEmployees = function () {
        return this._http.get('http://localhost:8080/consultarEmployee')
            .map(function (res) { return res.json(); });
    };
    HttpTestService.prototype.getProjects = function () {
        return this._http.get('http://localhost:8080/consultarProject')
            .map(function (res) { return res.json(); });
    };
    HttpTestService.prototype.consultaCep = function (numCep) {
        return this._http.get('https://viacep.com.br/ws/' + numCep + '/json/');
    };
    HttpTestService.prototype.postJSON = function () {
        var json = JSON.stringify({ var1: 'teste', var2: 1000 });
        var params = 'json=' + json;
        var cabe = new http_2.Headers();
        cabe.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post('http://validate.jsontest.com', params, {
            headers: cabe
        })
            .map(function (res) { return res.json(); });
    };
    HttpTestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpTestService);
    return HttpTestService;
}());
exports.HttpTestService = HttpTestService;
//# sourceMappingURL=http-test.service.js.map