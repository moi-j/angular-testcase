import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMenuComponent } from './desktop-menu.component';

import {TestingModule} from "../../../modules/testing.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Rx";

describe('DesktopMenuComponent', () => {
  let component: DesktopMenuComponent;
  let fixture: ComponentFixture<DesktopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopMenuComponent ],
      imports: [
        TestingModule,
        RouterTestingModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit logout event', function () {
    let singout = spyOn(component.onSignOut, "emit").and.callFake(() => {
      return Observable.of(null);
    })

    component.signOut();

    expect( singout ).toHaveBeenCalled();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
