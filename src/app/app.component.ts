import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TensorFlowService } from './providers/tensorflow.service';
import { TensorRequest } from './models/request.model';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Code Assistant Dashboard';
  location = '';
  isError = false;
  url = '';
  message = '';

  registerform: FormGroup;
  submitted = false;
  loading = false;

  public uilayers = [{name: "Angular", value: "ANG"}, {name: "HTML", value: "HTML"}, {name: "CSS", value: "CSS"} ,{name: "JQuery", value: "jq"} ,{name: "Vue.js", value: "vue"}];

  public midlayers = [{name: "Java", value: "java"}, {name: "Spring Rest", value: "rest"}, {name: "Nodejs", value: "node"}, {name: "Spring MVC", value: "mvc"}, {name: "SpringBoot", value: "boot"}];

  public backlayers = [{name: "Java", value: "java"}, {name: "Spring Rest", value: "rest"}, {name: "Nodejs", value: "node"}, {name: "SpringBoot", value: "boot"}];

  constructor(public formBuilder: FormBuilder, private service: TensorFlowService, private sanitizer:DomSanitizer) {

  }
  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
      projectName: ['', Validators.required],      
      uitech: [''],
      midtech: [''],
      backtech: [''],
    });
    $('#uitech').dropdown();
    $('#midtech').dropdown();
    $('#backtech').dropdown();
  }

  get f() { return this.registerform.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    }
    this.loading = true;
    const request: TensorRequest = new TensorRequest();
    request.projectName = this.registerform.get('projectName').value;    
    request.uilayers = this.registerform.get('uitech').value == '' ? [] : this.registerform.get('uitech').value;
    request.midlayers = this.registerform.get('midtech').value == '' ? [] : this.registerform.get('midtech').value;
    request.backendlayers = this.registerform.get('backtech').value == '' ? [] : this.registerform.get('backtech').value;

    this.service.invokeService(request).then(value => {      
      const blob = new Blob([value], {
        type: 'application/zip'        
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "generatedCode.zip");      
      $('.ui.modal').modal('show');
      this.loading = false;
    }).catch(err => {
      this.isError = true;
      this.loading = false;
    });
  }

  sanitize() {
    return this.sanitizer.bypassSecurityTrustUrl(this.message);
  }
}
