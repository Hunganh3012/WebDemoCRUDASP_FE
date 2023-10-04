import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import { EmployeeFormComponent } from './employee-detail/employee-form/employee-form.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
registerLocaleData(vi);



@NgModule({
    declarations: [
        AppComponent,
        EmployeeDetailComponent,
        EmployeeFormComponent
    ],
    bootstrap: [ AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ToastrModule,
        BrowserAnimationsModule,
        NzModalModule,
        NzButtonModule,
        NzFormModule,
        NzI18nModule,
        NzIconModule,
        NzInputModule,
        NzSelectModule ,
        NzRadioModule,  
        NzDatePickerModule,
        ReactiveFormsModule ,
        NzInputNumberModule,
        NzCheckboxModule,
        NzTableModule,
        ToastrModule.forRoot()
    ],
    providers: [
      { provide: NZ_I18N, useValue: vi_VN },
    ]
})
export class AppModule { }
