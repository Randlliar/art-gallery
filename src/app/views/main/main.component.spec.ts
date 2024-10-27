import { ComponentFixture, TestBed } from '@angular/core/testing';
let router: jasmine.SpyObj<Router>;
import { MainComponent } from './main.component';
import {Router} from "@angular/router";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [MainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to detail page on getMore', () => {
    component.getMore(5);
    expect(router.navigate).toHaveBeenCalledWith(['/details/5'], { queryParams: null });
  });
});
