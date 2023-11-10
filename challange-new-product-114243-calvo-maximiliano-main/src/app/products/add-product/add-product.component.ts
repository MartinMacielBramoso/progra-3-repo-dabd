import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { Product, Stock } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';
import { timer, catchError, of, Observable, map } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  successMessage: string | null = null;
  asyncValidationErrorMessage: string | null = null;
  currentInventoryIndex: number | null = null;
  hasInventories: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(5)],
        [this.handleAsyncValidation.bind(this)],
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      productType: ['Producto'],
      timeFraction: ['', [Validators.min(10), Validators.max(60)]],
      inventories: this.fb.array([]),
    });

    this.productForm.get('productType')!.valueChanges.subscribe((type) => {
      const inventoriesControl = this.productForm.get(
        'inventories'
      ) as FormArray;
      inventoriesControl.clear();

      if (type === 'Producto') {
        inventoriesControl.push(this.createStockFormGroup());
      }
    });
  }

  get productNameControl(): AbstractControl | null {
    return this.productForm.get('name');
  }

  get inventoriesControls(): AbstractControl[] {
    return (this.productForm.get('inventories') as FormArray).controls;
  }

  addInventory() {
    const inventoriesControl = this.productForm.get('inventories') as FormArray;
    inventoriesControl.push(this.createStockFormGroup());
    this.currentInventoryIndex = inventoriesControl.length - 1;
    this.hasInventories = true;
  }

  removeInventory() {
    if (this.currentInventoryIndex !== null) {
      const inventoriesControl = this.productForm.get(
        'inventories'
      ) as FormArray;
      inventoriesControl.removeAt(this.currentInventoryIndex);
      this.currentInventoryIndex = null;
      this.hasInventories = inventoriesControl.length > 0;
    }
  }

  onSubmit() {
    this.productForm.markAllAsTouched();
    const isProducto =
      this.productForm.get('productType')?.value === 'Producto';

    if ((isProducto && this.productForm.valid) || !isProducto) {
      const formData = this.productForm.value;

      const createProductDto: Product = {
        id: 0,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        nameEncoded: '',
        productType: formData.productType,
        timeFraction: formData.timeFraction,
        inventories: formData.inventories,
      };

      this.productService.add(createProductDto).subscribe(
        () => {
          this.successMessage = 'Producto agregado con éxito';
          this.errorMessage = null;
          this.productForm.reset();

          timer(2000).subscribe(() => {
            this.successMessage = null;
            this.errorMessage = null;
          });
        },

        () => {
          this.errorMessage = 'Error al agregar el producto';

          timer(2000).subscribe(() => {
            this.successMessage = null;
            this.errorMessage = null;
          });
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios';
      this.successMessage = null;

      timer(2000).subscribe(() => {
        this.successMessage = null;
        this.errorMessage = null;
      });
    }
  }

  handleAsyncValidation(
    control: AbstractControl
  ): Observable<{ [key: string]: any } | null> {
    const productName = control.value;
    if (!productName) {
      this.asyncValidationErrorMessage = '';
      return of(null);
    }
    return this.productService.getOneByName(productName).pipe(
      map((product) => {
        if (product.name === productName) {
          this.asyncValidationErrorMessage = 'El producto ya existe';
          return { productExists: true };
        } else {
          this.asyncValidationErrorMessage = '';
          return null;
        }
      }),
      catchError(() => {
        this.asyncValidationErrorMessage = '';
        return of(null);
      })
    );
  }

  createStockFormGroup(): FormGroup {
    return this.fb.group({
      location: ['', [Validators.required, Validators.minLength(5)]],
      count: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }


}
