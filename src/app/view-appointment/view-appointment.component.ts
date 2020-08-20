import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service'
import { Router, RouterModule } from "@angular/router";


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {
  appointments;
  constructor(private service:UserService,private router:Router) { }

  

  ngOnInit() {
    this.getfitness();
  }
  onUpdate(appointment){
    this.service.setSharedObj(appointment);
    this.router.navigateByUrl('place-fitness-trainer-appointment');
  }
  onDelete(appointment){
    this.appointments = this.appointments.filter(t => t.id !== appointment.id);
    // Remove from server
   this.service.deletefitnessdata(appointment).subscribe();
  }
  getfitness() {

  this.service.getfitnessdata().subscribe(array => {
      this.appointments= array;
    
  })}
}
