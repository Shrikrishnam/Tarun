import { Component, OnInit} from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from "@angular/forms";
import {UserService} from '../_services/user.service';
import { Router } from '@angular/router';



export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
  

  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  
  updateObj
  fitnessForm: FormGroup;
  submitted=false;
  
  constructor(private formBuilder: FormBuilder,private service:UserService,private router:Router) { }
  

  ngOnInit() {
    this.updateObj=this.service.getSharedObj();
    this.service.setSharedObj(undefined);

    this.fitnessForm = this.formBuilder.group({
      firstname: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      lastname: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      age:['',[Validators.required, Validators.min(18), Validators.max(60)]],
      pincode:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("^[0-9]*$")]],
      streetaddress:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      country:['',Validators.required],
      phonenumber:['',Validators.required],
      inr:['',Validators.required],
      paisa:['',Validators.required],
      trainerpreference:['Any',],
      packages:['500',],
      physiotherapist:['',]
  })



  if(this.updateObj){
        this.fitnessForm.patchValue({
          'firstname':this.updateObj.firstname,
          'lastname':this.updateObj.lastname,
          'phonenumber':this.updateObj.phonenumber,
          'email':this.updateObj.email,
          'age':this.updateObj.age,
          'streetaddress':this.updateObj.streetaddress,
          'city':this.updateObj.city,
          'state':this.updateObj.state,
          'country':this.updateObj.country,
          'pincode':this.updateObj.pincode,
          'inr':this.updateObj.inr,
          'paisa':this.updateObj.paisa,
          'trainerpreference':this.updateObj.trainerpreference,
          'packages':this.updateObj.packages,
          'physiotherapist':this.updateObj.physiotherapist

        });
  }
}
  get f() { return this.fitnessForm.controls; }

  onSubmit() {

    
    this.submitted = true;
    if(this.fitnessForm.status=="VALID"){
      if(this.updateObj){
        this.service.putfitnessdata(this.updateObj.id,this.fitnessForm.value).subscribe(array=> {
          //console.log(array);
        })
          this.updateObj=undefined;
          this.fitnessForm.reset()
          this.router.navigateByUrl('view-appointment')
      }
      else{

      this.service.postfitnessdata(this.fitnessForm.value).subscribe(appointment => {
        //console.log(appointment);
        this.fitnessForm.reset()
        this.submitted=false
        this.router.navigateByUrl('place-fitness-trainer-appointment')

    });

  }}}
    
}
