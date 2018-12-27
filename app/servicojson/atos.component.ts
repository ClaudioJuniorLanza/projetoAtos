import { Component, AfterViewChecked } from '@angular/core';
import { AtosService } from './atos.service';
import { SearchFilterPipe } from './SearchFilterPipe';

declare var $: any;


@Component({
    moduleId: module.id,
    selector: 'lista-requisicao',
    templateUrl: 'atos.html'
})


export class AtosComponent {
    
    getData :  string;
    getProjects: any;
    getEmployees: any;
    getSkill: any;
    retornoMsg: any;
    busca: any;
    descSkill: any;
    descCertification: any;
    contadorSkill: number = 0;
    contadorCertif: number = 0;
    ctrlPushSkill: number = 0;
    ctrlPushCertif: number = 0;
    idProject: any;
    idEmployee: any;
    skill = [{}];
    certification = [{}];
    array: String[] = new Array();
    skillModal: any;
    employee ={ 
        id_employee: '',
        name: '',
        role: '',
        salary: '',
        manager:'',
        gcm:'',
        project:{ id_project:''},
        skill: this.skill,
        certification:this.certification
    }

    editEmployee ={ 
        id_employee: '',
        name: '',
        role: '',
        salary: '',
        manager:'',
        gcm:'',
        project:{ id_project:''},
    }

    projects = {
        id_project: '',
        name: '',
        customer: '',
        valueOfProject: '',
        dtBegin: '',
        dtEnd: ''
    }

    editProjects = {
        id_project: '',
        name: '',
        customer: '',
        valueOfProject: '',
        dtBegin: '',
        dtEnd: ''
    }
    
    constructor(private httpService : AtosService, private pipes: SearchFilterPipe) {
        this.buscaTodos();
    }

    buscaTodos(){
        this.onGetProjects();
        this.onGetEmployees();
        this.onGetSkills();
    }

    /*
        // Método de filtro da Lista de Employee
    */
    ngAfterViewChecked(){
        $(document).ready(function () {

            $("#reset").click(function(){
                $("tbody tr").show();
                $( "input:checkbox:checked" ).prop( "checked", false );
            });

            $(".kraj,.age").on("change", function () {

                var kraj = $(".kraj:checked").map(function () {
                    return $(this).val()
                })
                var age = $(".age:checkbox:checked").map(function () {
                    return this.nextSibling.nodeValue.trim()
                })
                console.log(age,kraj)
                $("tbody tr").hide();
                var cities = $(".city").filter(function () {
                    var city = $(this).text(),
                        index = $.inArray(city, kraj);
                    return index >= 0
                }).parent().show();
            }) 
        });
        
    }
    /*
        //Fim Método de filtro da Lista de Employee
    */



   verSkills(listaSkills: any)
   {
        this.skillModal = listaSkills;
   }

    /*
        // Métodos responsáveis por alimentar e controlar as Listas
        // de Skill e Certificação
    */
    insereSkill(descricaoSkill: any){
    
    if(this.contadorSkill === 0)
    {
        this.skill.splice(0,1);
        console.log('entrou aqui');
    }
    
      this.descSkill = descricaoSkill;
      if(this.descSkill != null)
      {
        this.skill.push({
            descricao: this.descSkill
        })
       this.contadorSkill++;
       this.ctrlPushSkill++;
      }
     this.descSkill = '';
    }

    insereCertification(descricaoCertification: any){

        if(this.contadorCertif === 0)
        {
            this.certification.splice(0,1);
            console.log('entrou aqui');
        }

        this.descCertification = descricaoCertification;
        if(this.descCertification != null)
        {
          this.certification.push({
              descricao: this.descCertification
          })
          this.contadorCertif++;
          this.ctrlPushCertif++;
        }  
        this.descCertification = '';
        
    }
    /*
        // Fim dos Métodos responsáveis por alimentar e controlar as Listas
        // de Skill e Certificação
    */


    /*
        // Métodos de Inserção de dados
    */
    insereProject(proj: any)
    {
        console.log(proj);
        this.httpService.createProject(this.projects).subscribe(
            data => this.retornoMsg = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () => {
                alert(this.retornoMsg.mensagem);
                this.projects.name = '';
                this.projects.customer = '';
                this.projects.valueOfProject = '';
                this.projects.dtBegin = '';
                this.projects.dtEnd = '';
                this.home();
                this.buscaTodos();
            })
           
    }

    insereEmployee()
    {
        if(this.ctrlPushSkill === 0 || this.ctrlPushCertif === 0)
        {
            alert('Deve ser cadastrado ao menos uma skill e uma certificação');
        }
        else
        {
            this.httpService.createEmployee(this.employee).subscribe(
                data => this.retornoMsg = JSON.parse(JSON.stringify(data)),
                error => alert(error),
                () => {
                    alert(this.retornoMsg.mensagem);
                    this.employee.name = '';
                    this.employee.manager = '';
                    this.employee.gcm = '';
                    this.employee.role = '';
                    this.employee.salary = '';
                    this.employee.project.id_project = '';
                    this.descCertification = '';
                    this.descSkill = '';
                    while(this.skill.length > 0) {
                        this.skill.pop();
                        console.log(this.skill);
                    }
                    while(this.certification.length > 0) {
                        this.certification.pop();
                        console.log(this.certification);
                    }
                    this.home();
                    this.buscaTodos();
                })
        }
         
    }

    /*
        // Fim Métodos de Inserção de dados
    */


    /*
        // Métodos de controle de páginas(mostra/esconde)
    */

    home()
    {
        document.getElementById("listadelojas").style.display = 'block';
        document.getElementById("listadeProjects").style.display = 'block';
        document.getElementById("cadastroProjetos").style.display = 'none';
        document.getElementById("cadastroNovo").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'none';
    }

    cadastrarProjeto()
    {
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("cadastroProjetos").style.display = 'block';
        document.getElementById("cadastroNovo").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'none';
    }

    cadastrarColaborador(){
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("cadastroNovo").style.display = 'block';
        document.getElementById("cadastroProjetos").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'none';
    }

    editarProjeto()
    {
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("cadastroProjetos").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'block';
        document.getElementById("cadastroNovo").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'none';
    }

    editarEmployee()
    {
        document.getElementById("listadelojas").style.display = 'none';
        document.getElementById("listadeProjects").style.display = 'none';
        document.getElementById("cadastroProjetos").style.display = 'none';
        document.getElementById("editarProjeto").style.display = 'none';
        document.getElementById("editarEmp").style.display = 'block';
        document.getElementById("cadastroNovo").style.display = 'none';
    }

    cancelarEditProject(){
        this.home();
    }

    cancelarEditEmployee(){
        this.home();
    }

    /*
        // Fim Métodos de controle de páginas(mostra/esconde)
    */

   deletarEmployee(id: number)
   {
       console.log(id);
       this.httpService.deleteEmployee(id).subscribe(
           data => this.retornoMsg = JSON.parse(JSON.stringify(data)),
           error => alert(error),
           () => {
               alert(this.retornoMsg.mensagem);
               this.home();
               this.buscaTodos();
           })
   }

   deletarProject(id: number)
   {
       let controle = 0;
       for(let i=0; i< this.getEmployees.length; i++)
       {
            let compara = this.getEmployees[i].project.id_project;
           
           if(id === compara)
           {
               controle++;
               alert('Não foi possível deletar esse projeto, pois há Employee vinculado a esse projeto');
               break;
           }
       }
       if(controle == 0)
       {
            this.httpService.deleteProject(id).subscribe(
                data => this.retornoMsg = JSON.parse(JSON.stringify(data)),
                error => alert(error),
                () => {
                    alert(this.retornoMsg.mensagem);
                    this.home();
                    this.buscaTodos();
                })
       }
       
   }

    /*
        // Métodos de exemplo de editar e excluir
    */
    editarProject(project: any)
    {
        this.editarProjeto();
        this.editProjects.id_project = project.id_project;
        this.editProjects.name = project.name;
        this.editProjects.customer = project.customer;
        this.editProjects.valueOfProject = project.valueOfProject;
        this.editProjects.dtBegin = project.dtBegin;
        this.editProjects.dtEnd = project.dtEnd;
  
    }

    edEmployee(employee: any)
    {
        this.editarEmployee();
        this.editEmployee.id_employee = employee.id_employee;
        this.editEmployee.name = employee.name;
        this.editEmployee.manager = employee.manager;
        this.editEmployee.gcm = employee.gcm;
        this.editEmployee.role = employee.role;
        this.editEmployee.salary = employee.salary;
  
    }

    salvarEditProject()
    {
        
        this.idProject = parseInt(this.editProjects.id_project);
        this.httpService.editarProject(this.editProjects, this.idProject).subscribe(
            data => this.retornoMsg = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () => {
                alert(this.retornoMsg.mensagem);
                this.home();
                this.buscaTodos();
            }
        )
        
    }

    salvarEditEmployee()
    {
        
        this.idEmployee = parseInt(this.editEmployee.id_employee);
        this.httpService.editarEmployee(this.editEmployee, this.idEmployee).subscribe(
            data => this.retornoMsg = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () => {
                alert(this.retornoMsg.mensagem);
                this.home();
                this.buscaTodos();
            }
        )
        
    }

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
    onGetProjects()
    {
        this.httpService.getProjects()
        .subscribe(
            data => this.getProjects = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () =>{
                console.log(this.getProjects);
            } 
        )
        
    }

    onGetEmployees()
    {
        this.httpService.getEmployees()
        .subscribe(
            data => this.getEmployees = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () =>{
                console.log(this.getEmployees);
            } 
        )  
    }

    onGetSkills()
    {
        this.httpService.getSkills()
        .subscribe(
            data => this.getSkill = JSON.parse(JSON.stringify(data)),
            error => alert(error),
            () =>{
                console.log(this.getSkill);
            } 
        )  
    }

      /*
        // Fim Métodos de busca todos
    */
        
}