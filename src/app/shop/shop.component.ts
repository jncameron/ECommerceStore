import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { ProductBrand } from '../shared/models/productBrand';
import { ProductType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  productBrands: ProductBrand[] = [];
  productTypes: ProductType[] = [];
  brandIdSelected: number = 0;
  typeIdSelected: number = 0;
  sortSelected: string = 'name';
  pageIndex: number = 1;
  pageSize: number = 6;
  search: string = '';

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService
      .getProducts(
        this.brandIdSelected,
        this.typeIdSelected,
        this.sortSelected,
        this.pageIndex,
        this.pageSize,
        this.search
      )
      .subscribe({
        next: (response) => {
          this.products = response.data;
          this.pageIndex = response.pageIndex;
          this.pageSize = response.pageSize;
          this.totalCount = response.count;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => {
        this.productBrands = [{ id: 0, name: 'All' }, ...response];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.productTypes = [{ id: 0, name: 'All' }, ...response];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.pageIndex = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.pageIndex = 1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.sortSelected = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.pageIndex !== event) {
      this.pageIndex = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.search = this.searchTerm?.nativeElement.value;
    this.pageIndex = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm!.nativeElement.value = '';
    this.search = '';
    this.getProducts();
  }
}
