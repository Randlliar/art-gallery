import {of} from "rxjs";
import {SearchComponent} from "@components/search/search.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ArtService} from "@services/art.service";
import {LoaderService} from "@services/loader.service";
import {Router} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

class MockArtService {
  getSearchArts() {
    return of({ data: [{ id: 1, title: 'Art 1' }] });
  }

  getSomeArts() {
    return of({ data: [{ id: 1, title: 'Art 1' }] });
  }
}

class MockLoaderService {
  show() {}
  hide() {}
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let artService: ArtService;
  let loaderService: LoaderService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, SearchComponent],
      declarations: [],
      providers: [
        { provide: ArtService, useClass: MockArtService },
        { provide: LoaderService, useClass: MockLoaderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    artService = TestBed.inject(ArtService);
    loaderService = TestBed.inject(LoaderService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should complete destroy$ on ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });


  it('should fetch search results and call getSomeArts in getSearchArts', () => {
    spyOn(artService, 'getSearchArts').and.callThrough();
    spyOn(component, 'getSomeArts');
    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');

    component.getSearchArts();
    expect(loaderService.show).toHaveBeenCalled();
    expect(artService.getSearchArts).toHaveBeenCalledWith(component.activeParams);
    expect(component.getSomeArts).toHaveBeenCalled();
    expect(loaderService.hide).toHaveBeenCalled();
  });
  it('should update searchArts after getSomeArts', () => {
    spyOn(artService, 'getSomeArts').and.callThrough();
    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');

    component.getSomeArts('1');
    expect(loaderService.show).toHaveBeenCalled();
    expect(artService.getSomeArts).toHaveBeenCalledWith('1');
    expect(component.searchArts.length).toBeGreaterThan(0);
    expect(loaderService.hide).toHaveBeenCalled();
  });
  it('should navigate to details page on getMore', () => {
    spyOn(router, 'navigate');

    component.getMore(1);
    expect(router.navigate).toHaveBeenCalledWith(['/details/1'], { queryParams: null });
  });
});
