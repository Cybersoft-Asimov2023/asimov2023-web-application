import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProfileComponent } from './profile.component';
import { ProfileService } from "../../services/profile.service";
import { of } from "rxjs";

import {Injectable} from "@angular/core";
import {MatCardModule} from "@angular/material/card";

describe('ProfileComponent', () => {

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileService: ProfileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [ProfileService], // Inyecta el servicio ProfileService
      imports: [HttpClientModule, MatCardModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService); // Obtiene una instancia del servicio ProfileService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isTeacher correctly', () => {
    expect(component.isTeacher).toBe(false); // Verifica que isTeacher se inicialice en falso por defecto
  });

  it('should call getById method on ngOnInit', () => {
    spyOn(component, 'getById'); // Espía el método getById
    component.ngOnInit();
    expect(component.getById).toHaveBeenCalled(); // Verifica que getById se haya llamado en ngOnInit
  });

  it('should call profileService.getUser and assign response to user property', () => {
    const userData = { name: 'John Doe', role: 'ROLE_TEACHER' };
    spyOn(profileService, 'getUser').and.returnValue(of(userData)); // Simula el servicio getUser
    component.ngOnInit();
    expect(profileService.getUser).toHaveBeenCalled(); // Verifica que se haya llamado al servicio getUser
    expect(component.user).toEqual(userData); // Verifica que el resultado del servicio se haya asignado correctamente a la propiedad user
  });
});
