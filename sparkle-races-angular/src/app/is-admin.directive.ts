import { ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';


@Directive({
  selector: '[appIsAdmin]'
})
export class IsAdminDirective {

  sub!: Subscription

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private auth: AuthService) {
    
    }

    ngOnInit(): void {
      if (this.auth.isAdmin()) {
        this.viewContainer.clear()
        this.viewContainer.createEmbeddedView(this.templateRef);
        
      } else {
        this.viewContainer.clear();
        
      }
      this.sub = this.auth.isAdmin$().subscribe(() => {
        if (this.auth.isAdmin()) {
          this.viewContainer.clear()
          this.viewContainer.createEmbeddedView(this.templateRef);
          
        } else {
          this.viewContainer.clear();
          
        }
      })
    }


    ngOnDestroy() {
      this.sub.unsubscribe();
    }
   

}
