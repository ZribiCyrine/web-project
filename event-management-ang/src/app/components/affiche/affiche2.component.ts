import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../model/interfaces/event.interface';
import { Route, Router } from '@angular/router';
import { AfficheService } from '../../services/affiche.service';
import { Image } from '../../model/interfaces/image.interface';
@Component({
  selector: 'app-affiche2',
  templateUrl: './affiche2.component.html',
  styleUrls: ['./affiche2.component.css']
})
export class Affiche2Component implements OnInit {
  @Input() event!: Event;
  @Input() showDetailsButton: boolean = true;
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.event.image);
  }

  details() {
    const link = ['user/achat', this.event.id];
    this.router.navigate(link);
  }
}





