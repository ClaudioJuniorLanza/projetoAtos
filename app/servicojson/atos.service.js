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
var AtosService = (function () {
    function AtosService(_http) {
        this._http = _http;
        this.headers = new http_2.Headers({ 'Content-Type': 'application/json' });
    }
    AtosService.prototype.deleteEmployee = function (idEmployee) {
        return this._http.delete('http://localhost:8080/removeremployee/' + idEmployee)
            .map(function (res) { return res.json(); });
    };
    AtosService.prototype.deleteProject = function (idProject) {
        return this._http.delete('http://localhost:8080/removerproject/' + idProject)
            .map(function (res) { return res.json(); });
    };
    AtosService.prototype.editarProject = function (editProject, idProject) {
        return this._http.put('http://localhost:8080/atualizarproject/' + idProject, JSON.stringify(editProject), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AtosService.prototype.editarEmployee = function (editEmployee, idEmployee) {
        return this._http.put('http://localhost:8080/atualizaremployee/' + idEmployee, JSON.stringify(editEmployee), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    /* Métodos de interface com serviço rest para cadastrar um novo projeto e employee */
    AtosService.prototype.createProject = function (project) {
        console.log(project);
        if (project !== null) {
            return this._http.post('http://localhost:8080/salvarProject', JSON.stringify(project), { headers: this.headers })
                .map(function (res) { return res.json(); });
        }
    };
    AtosService.prototype.createEmployee = function (employee) {
        console.log(employee);
        if (employee !== null) {
            return this._http.post('http://localhost:8080/salvarEmployee', JSON.stringify(employee), { headers: this.headers })
                .map(function (res) { return res.json(); });
        }
    };
    /* Fim Métodos de interface com serviço rest para cadastrar um novo projeto e employee */
    /* Métodos de interface com serviço rest para Buscar projeto, employee e Skill */
    AtosService.prototype.getEmployees = function () {
        return this._http.get('http://localhost:8080/consultarEmployee')
            .map(function (res) { return res.json(); });
    };
    AtosService.prototype.getProjects = function () {
        return this._http.get('http://localhost:8080/consultarProject')
            .map(function (res) { return res.json(); });
    };
    AtosService.prototype.getSkills = function () {
        return this._http.get('http://localhost:8080/consultarSkill')
            .map(function (res) { return res.json(); });
    };
    AtosService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AtosService);
    return AtosService;
}());
exports.AtosService = AtosService;
//# sourceMappingURL=atos.service.js.map