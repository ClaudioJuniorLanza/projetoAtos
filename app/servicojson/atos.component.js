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
var atos_service_1 = require('./atos.service');
var SearchFilterPipe_1 = require('./SearchFilterPipe');
var AtosComponent = (function () {
    function AtosComponent(httpService, pipes) {
        this.httpService = httpService;
        this.pipes = pipes;
        this.contadorSkill = 0;
        this.contadorCertif = 0;
        this.ctrlPushSkill = 0;
        this.ctrlPushCertif = 0;
        this.skill = [{}];
        this.certification = [{}];
        this.array = new Array();
        this.employee = {
            id_employee: '',
            name: '',
            role: '',
            salary: '',
            manager: '',
            gcm: '',
            project: { id_project: '' },
            skill: this.skill,
            certification: this.certification
        };
        this.editEmployee = {
            id_employee: '',
            name: '',
            role: '',
            salary: '',
            manager: '',
            gcm: '',
            project: { id_project: '' },
        };
        this.projects = {
            id_project: '',
            name: '',
            customer: '',
            valueOfProject: '',
            dtBegin: '',
            dtEnd: ''
        };
        this.editProjects = {
            id_project: '',
            name: '',
            customer: '',
            valueOfProject: '',
            dtBegin: '',
            dtEnd: ''
        };
        this.buscaTodos();
    }
    AtosComponent.prototype.buscaTodos = function () {
        this.onGetProjects();
        this.onGetEmployees();
        this.onGetSkills();
    };
    /*
        // Método de filtro da Lista de Employee
    */
    AtosComponent.prototype.ngAfterViewChecked = function () {
        $(document).ready(function () {
            $("#reset").click(function () {
                $("tbody tr").show();
                $("input:checkbox:checked").prop("checked", false);
            });
            $(".kraj,.age").on("change", function () {
                var kraj = $(".kraj:checked").map(function () {
                    return $(this).val();
                });
                var age = $(".age:checkbox:checked").map(function () {
                    return this.nextSibling.nodeValue.trim();
                });
                console.log(age, kraj);
                $("tbody tr").hide();
                var cities = $(".city").filter(function () {
                    var city = $(this).text(), index = $.inArray(city, kraj);
                    return index >= 0;
                }).parent().show();
            });
        });
    };
    /*
        //Fim Método de filtro da Lista de Employee
    */
    AtosComponent.prototype.verSkills = function (listaSkills) {
        this.skillModal = listaSkills;
    };
    /*
        // Métodos responsáveis por alimentar e controlar as Listas
        // de Skill e Certificação
    */
    AtosComponent.prototype.insereSkill = function (descricaoSkill) {
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
            this.ctrlPushSkill++;
        }
        this.descSkill = '';
    };
    AtosComponent.prototype.insereCertification = function (descricaoCertification) {
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
            this.ctrlPushCertif++;
        }
        this.descCertification = '';
    };
    /*
        // Fim dos Métodos responsáveis por alimentar e controlar as Listas
        // de Skill e Certificação
    */
    /*
        // Métodos de Inserção de dados
    */
    AtosComponent.prototype.insereProject = function (proj) {
        var _this = this;
        console.log(proj);
        this.httpService.createProject(this.projects).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
            _this.projects.name = '';
            _this.projects.customer = '';
            _this.projects.valueOfProject = '';
            _this.projects.dtBegin = '';
            _this.projects.dtEnd = '';
            _this.home();
            _this.buscaTodos();
        });
    };
    AtosComponent.prototype.insereEmployee = function () {
        var _this = this;
        if (this.ctrlPushSkill === 0 || this.ctrlPushCertif === 0) {
            alert('Deve ser cadastrado ao menos uma skill e uma certificação');
        }
        else {
            this.httpService.createEmployee(this.employee).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
                alert(_this.retornoMsg.mensagem);
                _this.employee.name = '';
                _this.employee.manager = '';
                _this.employee.gcm = '';
                _this.employee.role = '';
                _this.employee.salary = '';
                _this.employee.project.id_project = '';
                _this.descCertification = '';
                _this.descSkill = '';
                while (_this.skill.length > 0) {
                    _this.skill.pop();
                    console.log(_this.skill);
                }
                while (_this.certification.length > 0) {
                    _this.certification.pop();
                    console.log(_this.certification);
                }
                _this.home();
                _this.buscaTodos();
            });
        }
    };
    /*
        // Fim Métodos de Inserção de dados
    */
    /*
        // Métodos de controle de páginas(mostra/esconde)
    */
    AtosComponent.prototype.home = function () {
        document.getElementById("listadelojas").style.display = 'block';
        document.getElementById("listadeProjects").style.display = 'block';
        document.getElementById("cadastroProjetos").style.display = 'none';
        document.getElementById("cadastroNovo").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'none';
    };
    AtosComponent.prototype.cadastrarProjeto = function () {
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("cadastroProjetos").style.display = 'block';
        document.getElementById("cadastroNovo").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'none';
    };
    AtosComponent.prototype.cadastrarColaborador = function () {
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("cadastroNovo").style.display = 'block';
        document.getElementById("cadastroProjetos").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'none';
    };
    AtosComponent.prototype.editarProjeto = function () {
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("cadastroProjetos").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'block';
        document.getElementById("cadastroNovo").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'none';
    };
    AtosComponent.prototype.editarEmployee = function () {
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("cadastroProjetos").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'block';
        document.getElementById("cadastroNovo").style.display = 'none';
    };
    AtosComponent.prototype.cancelarEditProject = function () {
        this.home();
    };
    AtosComponent.prototype.cancelarEditEmployee = function () {
        this.home();
    };
    /*
        // Fim Métodos de controle de páginas(mostra/esconde)
    */
    AtosComponent.prototype.deletarEmployee = function (id) {
        var _this = this;
        console.log(id);
        this.httpService.deleteEmployee(id).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
            _this.home();
            _this.buscaTodos();
        });
    };
    AtosComponent.prototype.deletarProject = function (id) {
        var _this = this;
        var controle = 0;
        for (var i = 0; i < this.getEmployees.length; i++) {
            var compara = this.getEmployees[i].project.id_project;
            if (id === compara) {
                controle++;
                alert('Não foi possível deletar esse projeto, pois há Employee vinculado a esse projeto');
                break;
            }
        }
        if (controle == 0) {
            this.httpService.deleteProject(id).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
                alert(_this.retornoMsg.mensagem);
                _this.home();
                _this.buscaTodos();
            });
        }
    };
    /*
        // Métodos de exemplo de editar e excluir
    */
    AtosComponent.prototype.editarProject = function (project) {
        this.editarProjeto();
        this.editProjects.id_project = project.id_project;
        this.editProjects.name = project.name;
        this.editProjects.customer = project.customer;
        this.editProjects.valueOfProject = project.valueOfProject;
        this.editProjects.dtBegin = project.dtBegin;
        this.editProjects.dtEnd = project.dtEnd;
    };
    AtosComponent.prototype.edEmployee = function (employee) {
        this.editarEmployee();
        this.editEmployee.id_employee = employee.id_employee;
        this.editEmployee.name = employee.name;
        this.editEmployee.manager = employee.manager;
        this.editEmployee.gcm = employee.gcm;
        this.editEmployee.role = employee.role;
        this.editEmployee.salary = employee.salary;
    };
    AtosComponent.prototype.salvarEditProject = function () {
        var _this = this;
        this.idProject = parseInt(this.editProjects.id_project);
        this.httpService.editarProject(this.editProjects, this.idProject).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
            _this.home();
            _this.buscaTodos();
        });
    };
    AtosComponent.prototype.salvarEditEmployee = function () {
        var _this = this;
        this.idEmployee = parseInt(this.editEmployee.id_employee);
        this.httpService.editarEmployee(this.editEmployee, this.idEmployee).subscribe(function (data) { return _this.retornoMsg = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            alert(_this.retornoMsg.mensagem);
            _this.home();
            _this.buscaTodos();
        });
    };
    /*
    deletaCliente(id: number)
    {
        this.httpService.delete(id).subscribe(
            data => this.retornoMsg = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () => {
                alert(this.retornoMsg.mensagem);
            })
    }
    
    /*
        // Fim Métodos de exemplo de editar e excluir
    */
    /*
        // Métodos de busca Todos
        //* Employees
        //* Projects
    */
    AtosComponent.prototype.onGetProjects = function () {
        var _this = this;
        this.httpService.getProjects()
            .subscribe(function (data) { return _this.getProjects = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            console.log(_this.getProjects);
        });
    };
    AtosComponent.prototype.onGetEmployees = function () {
        var _this = this;
        this.httpService.getEmployees()
            .subscribe(function (data) { return _this.getEmployees = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            console.log(_this.getEmployees);
        });
    };
    AtosComponent.prototype.onGetSkills = function () {
        var _this = this;
        this.httpService.getSkills()
            .subscribe(function (data) { return _this.getSkill = JSON.parse(JSON.stringify(data)); }, function (error) { return alert(error); }, function () {
            console.log(_this.getSkill);
        });
    };
    AtosComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lista-requisicao',
            templateUrl: 'atos.html'
        }), 
        __metadata('design:paramtypes', [atos_service_1.AtosService, SearchFilterPipe_1.SearchFilterPipe])
    ], AtosComponent);
    return AtosComponent;
}());
exports.AtosComponent = AtosComponent;
//# sourceMappingURL=atos.component.js.map