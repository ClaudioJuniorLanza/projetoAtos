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
var SearchFilterPipe_1 = require('./SearchFilterPipe');
var HttpTestComponent = (function () {
    /*
    editEstabelecimento =   {idCliente: '', razaoSocial: '', nomeFantasia: '',
                                endereco : {
                                uf: '',
                                cidade: '',
                                bairro: '',
                                rua: '',
                                numero: '',
                                complemento: ''
                                }

                            };

    estabelecimento =   { razaoSocial: '', nomeFantasia: '',
                            endereco : {
                            uf: '',
                            cidade: '',
                            bairro: '',
                            rua: '',
                            numero: '',
                            complemento: ''
                            }
                        };
    */
    function HttpTestComponent(httpService, pipes) {
        this.httpService = httpService;
        this.pipes = pipes;
        this.contadorSkill = 0;
        this.contadorCertif = 0;
        this.skill = [{}];
        this.certification = [{}];
        this.descricaoC = new Array();
        this.employee = {
            name: '',
            role: '',
            salary: '',
            manager: '',
            gcm: '',
            project: { id_project: '' },
            skill: this.skill,
            certification: this.certification
        };
        this.projects = {
            name: '',
            customer: '',
            valueOfProject: '',
            dtBegin: '',
            dtEnd: ''
        };
        this.onGetProjects();
        this.onGetEmployees();
    }
    /*
        // Método de filtro da Lista de Employee
    */
    HttpTestComponent.prototype.onBuscaFiltro = function (value) {
        this.busca = value;
        var teste = "skill";
        console.log(this.busca);
        this.getEmployees = this.pipes.transform(this.getEmployees, teste, this.busca);
        console.log(this.getEmployees);
    };
    /*
        //Fim Método de filtro da Lista de Employee
    */
    /*
        // Métodos responsáveis por alimentar e controlar as Listas
        // de Skill e Certificação
    */
    HttpTestComponent.prototype.insereSkill = function (descricaoSkill) {
        if (this.contadorSkill === 0) {
            this.skill.splice(0, 1);
            console.log('entrou aqui');
        }
        this.descSkill = descricaoSkill;
        if (this.descSkill != null) {
            this.skill.push({
                descricao: this.descSkill
            });
            this.contadorSkill++;
        }
        console.log(this.skill);
    };
    HttpTestComponent.prototype.insereCertification = function (descricaoCertification) {
        if (this.contadorCertif === 0) {
            this.certification.splice(0, 1);
            console.log('entrou aqui');
        }
        this.descCertification = descricaoCertification;
        if (this.descCertification != null) {
            this.certification.push({
                descricao: this.descCertification
            });
            this.contadorCertif++;
        }
        console.log(this.certification);
    };
    /*
        // Fim dos Métodos responsáveis por alimentar e controlar as Listas
        // de Skill e Certificação
    */
    /*
        // Métodos de Inserção de dados
    */
    HttpTestComponent.prototype.insereProject = function (proj) {
        var _this = this;
        console.log(proj);
        this.httpService.createProject(this.projects).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
        });
    };
    HttpTestComponent.prototype.insereEmployee = function (emp) {
        var _this = this;
        console.log(this.employee.skill);
        this.httpService.createEmployee(this.employee).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
        });
    };
    /*
        // Fim Métodos de Inserção de dados
    */
    /*
        // Métodos de controle de páginas(mostra/esconde)
    */
    HttpTestComponent.prototype.home = function () {
        document.getElementById("listadelojas").style.display = 'block';
        document.getElementById("listadeProjects").style.display = 'block';
        document.getElementById("cadastroProjetos").style.display = 'none';
        document.getElementById("cadastroNovo").style.display = 'none';
    };
    HttpTestComponent.prototype.cadastrarProjeto = function () {
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("cadastroProjetos").style.display = 'block';
        document.getElementById("cadastroNovo").style.display = 'none';
    };
    HttpTestComponent.prototype.cadastrarColaborador = function () {
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("cadastroNovo").style.display = 'block';
        document.getElementById("cadastroProjetos").style.display = 'none';
    };
    HttpTestComponent.prototype.cancelarEdit = function () {
        document.getElementById("editarEstabelecimento").style.display = 'none';
        document.getElementById("cadastroNovo").style.display = 'block';
    };
    /*
        // Fim Métodos de controle de páginas(mostra/esconde)
    */
    /*
        // Métodos de exemplo de editar e excluir
    */
    HttpTestComponent.prototype.editarCliente = function (cliente) {
        /*
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
        */
    };
    HttpTestComponent.prototype.editarService = function () {
        /*
        this.numCliente = parseInt(this.editEstabelecimento.idCliente);
        console.log(this.editEstabelecimento);
        this.httpService.editar(this.editEstabelecimento, this.numCliente).subscribe(
            data => this.retornoMsg = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () => {
                alert(this.retornoMsg.mensagem);
                this.cancelarEdit();
                this.editEstabelecimento.nomeFantasia = '';
                this.editEstabelecimento.razaoSocial = '';
            }
        )
        */
    };
    HttpTestComponent.prototype.deletaCliente = function (id) {
        var _this = this;
        this.httpService.delete(id).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
        });
    };
    /*
        // Fim Métodos de exemplo de editar e excluir
    */
    /*
        // Métodos de busca Todos
        //* Employees
        //* Projects
    */
    HttpTestComponent.prototype.onGetProjects = function () {
        var _this = this;
        this.httpService.getProjects()
            .subscribe(function (data) { return _this.getProjects = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            console.log(_this.getProjects);
        });
    };
    HttpTestComponent.prototype.onGetEmployees = function () {
        var _this = this;
        this.httpService.getEmployees()
            .subscribe(function (data) { return _this.getEmployees = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            console.log(_this.getEmployees);
        });
    };
    HttpTestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lista-requisicao',
            templateUrl: 'http-teste.html'
        }), 
        __metadata('design:paramtypes', [http_test_service_1.HttpTestService, SearchFilterPipe_1.SearchFilterPipe])
    ], HttpTestComponent);
    return HttpTestComponent;
}());
exports.HttpTestComponent = HttpTestComponent;
//# sourceMappingURL=http-test.component.js.map