import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Headers, Response } from '@angular/http';

@Injectable()
export class AtosService {

  private headers: Headers = new Headers ({'Content-Type' : 'application/json'});

  constructor(private _http : Http) { }


  deleteEmployee(idEmployee: number)
  {
    return this._http.delete('http://localhost:8080/removeremployee/'+idEmployee)
    .map(res => res.json());
  }

  deleteProject(idProject: number)
  {
    return this._http.delete('http://localhost:8080/removerproject/'+idProject)
    .map(res => res.json());
  }
  
  editarProject(editProject: Object, idProject: number)
  {
    
    return this._http.put('http://localhost:8080/atualizarproject/'+idProject, JSON.stringify(editProject), {headers:this.headers})
      .map(res => res.json());
    
  }

  editarEmployee(editEmployee: Object, idEmployee: number)
  {
    
    return this._http.put('http://localhost:8080/atualizaremployee/'+idEmployee, JSON.stringify(editEmployee), {headers:this.headers})
      .map(res => res.json());
    
  }


  /* Métodos de interface com serviço rest para cadastrar um novo projeto e employee */
  createProject(project: Object)
  {
    console.log(project);
    if(project !== null)
    {
      return this._http.post('http://localhost:8080/salvarProject', JSON.stringify(project), {headers:this.headers})
      .map(res => res.json());
    }  
  }


  createEmployee(employee: Object)
  {
    console.log(employee);
    if(employee !== null)
    {
      return this._http.post('http://localhost:8080/salvarEmployee', JSON.stringify(employee), {headers:this.headers})
      .map(res => res.json());
    }  
  }
  /* Fim Métodos de interface com serviço rest para cadastrar um novo projeto e employee */
  

  /* Métodos de interface com serviço rest para Buscar projeto, employee e Skill */
  getEmployees()
  {
      return this._http.get('http://localhost:8080/consultarEmployee')
      .map(res=> res.json());
  }

  getProjects()
  {
      return this._http.get('http://localhost:8080/consultarProject')
      .map(res=> res.json());
  }

  getSkills()
  {
      return this._http.get('http://localhost:8080/consultarSkill')
      .map(res=> res.json());
  }
  /* Fim Métodos de interface com serviço rest para Buscar projeto, employee e Skill */
}