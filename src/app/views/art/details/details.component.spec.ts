import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ArtsType} from "@type/arts.type";
import {of} from "rxjs";
import {LoaderService} from "@services/loader.service";
import {FavoritesService} from "@services/favorites.service";
import {ArtService} from "@services/art.service";
import {ActivatedRoute} from "@angular/router";

class MockArtService {
  getArt(id: number) {
    return of({ data: { id, title: 'Test Art', image_id: 'test', alt_image_ids: 'test', artist_title: 'Ranet', source_updated_at: '2024-08-08',
        total_pages: 2346, is_public_domain: true, artist_display: 'Test', credit_line: 'Test', department_title: 'Title', dimensions: 'Test',
        isInFavorite: true, pagination: 1, place_of_origin: 'Test' } });
  }
}

class MockFavoritesService {
  isFavorite() {
    return false;
  }

  toggleFavorite() {}
}

class MockLoaderService {
  show() {}
  hide() {}
}

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let artService: ArtService;
  let favoritesService: FavoritesService;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DetailsComponent],
      declarations: [],
      providers: [
        { provide: ArtService, useClass: MockArtService },
        { provide: FavoritesService, useClass: MockFavoritesService },
        { provide: LoaderService, useClass: MockLoaderService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    artService = TestBed.inject(ArtService);
    favoritesService = TestBed.inject(FavoritesService);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch art data and hide loader on ngOnInit', () => {
    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');
    spyOn(artService, 'getArt').and.callThrough();

    component.ngOnInit();
    expect(loaderService.show).toHaveBeenCalled();
    expect(artService.getArt).toHaveBeenCalledWith(1);
    expect(component.art).toEqual({ id: 1, title: 'Test Art', image_id: 'test', alt_image_ids: 'test', artist_title: 'Ranet', source_updated_at: '2024-08-08',
      total_pages: 2346, is_public_domain: true, artist_display: 'Test', credit_line: 'Test', department_title: 'Title', dimensions: 'Test',
      isInFavorite: true, pagination: 1, place_of_origin: 'Test' });
    expect(loaderService.hide).toHaveBeenCalled();
  });

  it('should fetch art data and hide loader on ngOnInit', () => {
    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');
    spyOn(artService, 'getArt').and.callThrough();

    component.ngOnInit();
    expect(loaderService.show).toHaveBeenCalled();
    expect(artService.getArt).toHaveBeenCalledWith(1);
    expect(component.art).toEqual({id: 1, title: 'Test Art', image_id: 'test', alt_image_ids: 'test', artist_title: 'Ranet', source_updated_at: '2024-08-08',
      total_pages: 2346, is_public_domain: true, artist_display: 'Test', credit_line: 'Test', department_title: 'Title', dimensions: 'Test',
      isInFavorite: true, pagination: 1, place_of_origin: 'Test' });
    expect(loaderService.hide).toHaveBeenCalled();
  });

  it('should check if item is favorite', () => {
    const item: ArtsType = { id: 1, title: 'Test Art', image_id: 'test', alt_image_ids: 'test', artist_title: 'Ranet', source_updated_at: '2024-08-08',
      total_pages: 2346, is_public_domain: true, artist_display: 'Test', credit_line: 'Test', department_title: 'Title', dimensions: 'Test',
      isInFavorite: true, pagination: 1, place_of_origin: 'Test' };
    spyOn(favoritesService, 'isFavorite').and.returnValue(true);

    expect(component.isFavorite(item)).toBeTrue();
    expect(favoritesService.isFavorite).toHaveBeenCalledWith(item.id);
  });

  it('should toggle favorite status of an item', () => {
    const item: ArtsType = { id: 1, title: 'Test Art', image_id: 'test', alt_image_ids: 'test', artist_title: 'Ranet', source_updated_at: '2024-08-08',
      total_pages: 2346, is_public_domain: true, artist_display: 'Test', credit_line: 'Test', department_title: 'Title', dimensions: 'Test',
      isInFavorite: true, pagination: 1, place_of_origin: 'Test' };
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    spyOn(favoritesService, 'toggleFavorite');

    component.toggleFavorite(event, item);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(favoritesService.toggleFavorite).toHaveBeenCalledWith(item);
  });

});
