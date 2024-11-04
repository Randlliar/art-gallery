import {of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {LoaderService} from "@services/loader.service";
import {ArtService} from "@services/art.service";
import {MainComponent} from "./main.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";


class MockArtService {
  getArts() {
    return of({ data: [{ id: 1, title: 'Art 1'}] });
  }
}

class MockLoaderService {
  show() {}
  hide() {}
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let artService: ArtService;
  let loaderService: LoaderService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MainComponent],
      declarations: [],
      providers: [
        { provide: ArtService, useClass: MockArtService },
        { provide: LoaderService, useClass: MockLoaderService },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ page: '1' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    artService = TestBed.inject(ArtService);
    loaderService = TestBed.inject(LoaderService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call processContent on init', () => {
    spyOn(component, 'processContent');
    component.ngOnInit();
    expect(component.processContent).toHaveBeenCalled();
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

  it('should fetch arts and hide loader on getArts', () => {
    spyOn(artService, 'getArts').and.callThrough();
    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');

    component.getArts();
    expect(loaderService.show).toHaveBeenCalled();
    expect(artService.getArts).toHaveBeenCalledWith(component.activeParams);
    expect(component.arts.length).toBeGreaterThan(0);
    expect(loaderService.hide).toHaveBeenCalled();
  });



  it('should navigate to details page on getMore', () => {
    spyOn(router, 'navigate');

    component.getMore(1);
    expect(router.navigate).toHaveBeenCalledWith(['/details/1'], { queryParams: null });
  });
});
