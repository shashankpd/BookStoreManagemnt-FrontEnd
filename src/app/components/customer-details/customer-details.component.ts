import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/http-service/book-service/book.service';
import { DataService } from 'src/app/services/http-service/data-service/data.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customerForm: FormGroup;
  showAddressForm: boolean = false;
  typeDisplayMap: { [key: string]: string } = {
    '1': 'Home',
    '2': 'Work',
    '3': 'Other'
  };
  addressId!: number; // Variable to store the address ID
  addresses: any[] = [];
  @Output() addressSelected = new EventEmitter<number>();

  constructor(private fb: FormBuilder,
    private bookService: BookService,
    private dataService:DataService ,
    private router:Router// Inject your authentication service
   ) { 
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
   

   ngOnInit(): void {
    if (localStorage.getItem('AuthToken') != null) { // Check if user is authenticated
      this.bookService.getAllAddress().subscribe(
        (response: any) => {
          if (response && response.data && response.data.length > 0) {
            console.log('Fetched Address Data:', response.data);
            this.addressId = response.data[0].addressId; // Assuming addressId is available in the response
            this.populateForm(response.data); // Populate form fields with response data
            this.emitAddressId(this.addressId); // Emit the addressId obtained
          // this.dataService.updateAddressId(this.addressId)
          } else {
            console.error('Invalid or empty data received:', response);
          }
        },
        (error) => {
          console.error('Error fetching addresses:', error);
        }
      );
    } else {
      console.log('User not authenticated');
    }

  }
  toggleAddressForm(isForEdit: boolean = false): void {
    if (!isForEdit) {
      this.showAddressForm = !this.showAddressForm;
      if (this.showAddressForm) {
        this.customerForm.reset(); // Reset the form when showing the address form for adding new address
      }
    } else {
      const authToken = localStorage.getItem('AuthToken');
      if (authToken && this.addressId) {
        const updatedAddressData = this.customerForm.value;
        this.bookService.editAddress(this.addressId, updatedAddressData, authToken).subscribe(
          (response) => {
            console.log('Address updated successfully:', response);
            // Optionally, perform any actions upon successful update
            this.showAddressForm = true; // Show the address form for editing after successful update
          },
          (error) => {
            console.error('Error updating address:', error);
            // Optionally, handle the error or show an error message
          }
        );
      } else {
        console.log('Auth token or address ID is not available. Cannot edit address.');
        // Optionally, handle the case where auth token or address ID is not available
      }
    }
  }
  
  
  
  
  
    populateForm(data: any[]): void {
      if (data && data.length > 0) {
        const firstAddress = data[0]; // Assuming you want to populate the form with the first address in the array
        this.customerForm.patchValue({
          name: firstAddress.name || '', // Provide default value if data is undefined
          mobileNumber: firstAddress.mobileNumber || '',
          address: firstAddress.address || '',
          city: firstAddress.city || '',
          state: firstAddress.state || '',
          type: firstAddress.type || ''
        });
      }
    }
  
    onSubmit(): void {
      if (this.customerForm.valid) {
        const authToken = localStorage.getItem('AuthToken');
        if (authToken) {
          const addressData = this.customerForm.value;
          this.bookService.AddAdress(addressData, authToken).subscribe(
            (response) => {
              console.log('Address added successfully:', response);
              // Optionally, perform any actions upon successful addition
              this.home(); // Redirect to the desired page after adding the address
            },
            (error) => {
              console.error('Error adding address:', error);
              // Optionally, handle the error or show an error message
            }
          );
        } else {
          console.log('Auth token is not available. Cannot add address.');
          // Optionally, handle the case where the auth token is not available
        }
      } else {
        console.log('Form not valid');
        // Optionally, show a message to the user indicating that the form is not valid
      }
    }
  
    getTypeDisplayValue(): string {
      const typeControl = this.customerForm.get('type');
      if (typeControl && typeControl.value !== null && this.typeDisplayMap.hasOwnProperty(typeControl.value)) {
        return this.typeDisplayMap[typeControl.value];
      }
      return '';
    }
  
    updateTypeValue(value: string): void {
      this.customerForm.patchValue({ type: value });
    }
    home(){
      this.router.navigate(['/dashboard/books'])
    }
  
   
    
    
    deleteAddress(): void {
      // Handle delete address functionality
    }
  
    emitAddressId(addressId: number): void {
      this.addressSelected.emit(addressId);
    }
  
  
  }