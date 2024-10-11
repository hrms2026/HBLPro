import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Category } from '../../models/category.model'; // Import category model
import { IuserService } from '../../services/iuser.service';
import { DbResult } from '../../models/dbresult.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { ICategoryService } from '../../services/icategory.service';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html', // Update template URL
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: Category[] = []; // Update variable to categories
  category: Category = new Category(); // Update variable to Category
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  private subscription: Subscription = new Subscription();
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private iuserService: IuserService,
    private icategoryService: ICategoryService, // Update service injection
    private router: Router
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: '<"row"<"col-sm-6 text-left"l><"col-sm-6 text-right"f>>t<"row"<"col-sm-6"i><"col-sm-6"p>>'
    };
    this.loadCategories();
    this.subscription.add(
      this.icategoryService.refreshCategories$.subscribe(() => {
        this.loadCategories();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCategories(): void {
    this.icategoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        this.dtTrigger.next(null);
      },
      (error: any) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  createOrUpdateCategory(): void {
    this.category.ct_cre_by = this.currentUser.u_id; // Update property to match Category model
    this.icategoryService.createOrUpdateCategory(this.category).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.icategoryService.refreshCategories();
          this.removeDatatable();
          $('#categoryFormModal').modal('hide'); // Update modal ID
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error creating/updating category', error);
        alert('An error occurred while creating/updating the category.');
      }
    );
  }

  deleteCategory(id: number): void {
    this.icategoryService.deleteCategory(id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (this.dbResult.message === "Success") {
          this.categories = this.categories.filter(category => category.ct_id !== id);
          this.icategoryService.refreshCategories();
          this.removeDatatable();
          alert("Successfully Removed");
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        console.error('Error deleting category', error);
      }
    );
  }

  editCategory(id: number): void {
    this.icategoryService.getCategory(id).subscribe(
      (data: Category) => {
        this.category = data;
        $('#categoryFormModal').modal('show'); // Update modal ID
      },
      (error: any) => {
        console.error('Error fetching category', error);
      }
    );
  }

  createCategory(): void {
    this.category = new Category(); // Reset category
    $('#categoryFormModal').modal('show'); // Update modal ID
  }

  removeDatatable() {
    if ($.fn.dataTable.isDataTable('#DataTables_Table_0')) {
      $('#DataTables_Table_0').DataTable().clear().destroy();
    }
  }
}
