import {PaginationComponent} from "@components/pagination/pagination.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ArtService} from "@services/art.service";
import {LoaderService} from "@services/loader.service";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";

class MockArtService {
  getArts() {
    return of({
      data: [{ id: 1, title: 'Art 1' }],
      pagination: { total_pages: 5 }
    });
  }
}

class MockLoaderService {
  show() {}
  hide() {}
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let artService: ArtService;
  let loaderService: LoaderService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PaginationComponent],
      providers: [
        { provide: ArtService, useClass: MockArtService },
        { provide: LoaderService, useClass: MockLoaderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    artService = TestBed.inject(ArtService);
    loaderService = TestBed.inject(LoaderService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getArts on init', () => {
    spyOn(component, 'getArts');
    component.ngOnInit();
    expect(component.getArts).toHaveBeenCalled();
  });

  it('should set amountOfPages after getArts is called', () => {
    spyOn(artService, 'getArts').and.callThrough();
    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');

    component.getArts();
    expect(loaderService.show).toHaveBeenCalled();
    expect(artService.getArts).toHaveBeenCalledWith(component.activeParams);
    expect(component.amountOfPages).toBe(5);
    expect(loaderService.hide).toHaveBeenCalled();
  });

  it('should navigate to specified page on openPage', () => {
    spyOn(router, 'navigate');

    component.openPage(3);
    expect(component.activeParams.page).toBe(3);
    expect(router.navigate).toHaveBeenCalledWith([''], { queryParams: component.activeParams });
  });

  it('should navigate to the next page if not on last page', () => {
    component.amountOfPages = 5;
    component.activeParams.page = 3;
    spyOn(router, 'navigate');

    component.openNextPage();
    expect(component.activeParams.page).toBe(4);
    expect(router.navigate).toHaveBeenCalledWith([''], { queryParams: component.activeParams });
  });

  it('should not navigate to the next page if on the last page', () => {
    component.amountOfPages = 5;
    component.activeParams.page = 5;
    spyOn(router, 'navigate');

    component.openNextPage();
    expect(component.activeParams.page).toBe(5);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to the previous page if not on the first page', () => {
    component.activeParams.page = 3;
    spyOn(router, 'navigate');

    component.openPrevPage();
    expect(component.activeParams.page).toBe(2);
    expect(router.navigate).toHaveBeenCalledWith([''], { queryParams: component.activeParams });
  });

  it('should not navigate to the previous page if on the first page', () => {
    component.activeParams.page = 1;
    spyOn(router, 'navigate');

    component.openPrevPage();
    expect(component.activeParams.page).toBe(1);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
