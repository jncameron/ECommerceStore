import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductBrand } from '../shared/models/productBrand';
import { ProductType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getProducts(
    brandId?: number,
    typeId?: number,
    sort?: string,
    pageIndex?: number,
    pageSize?: number,
    search?: string
  ) {
    let params = new HttpParams();

    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }
    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }
    if (sort) {
      params = params.append('sort', sort);
    }
    if (pageIndex) {
      params = params.append('pageIndex', pageIndex);
    }
    if (pageSize) {
      params = params.append('pageSize', pageSize.toString());
    }
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {
      params: params,
    });
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<ProductBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<ProductType[]>(this.baseUrl + 'products/types');
  }
}
