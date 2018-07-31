import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/nav/home/home.component';
import { ListTitleComponent } from './components/list-title/list-title.component';
import { AllWorkComponent } from './pages/nav/all-work/all-work.component';
import { LoadMoreModule } from './components/load-more/load-more.module';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';
import { CookieService } from 'ngx-cookie-service';
import { NotBindComponent } from './pages/not-bind/not-bind.component';
import { TitleModule } from './components/title/title.module';
import { DateModule } from './components/date/date.module';
import { AppRoutingModule } from './/app-routing.module';
import { LoadingModule } from './components/loading/loading.module';
import { MessageBoxModule } from './components/message-box/message-box.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UndefinedModule } from './components/undefined/undefined.module';
import { DirectiveModule } from './directives/directives.module';

// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// 使用TranslateHttpLoader加载项目的本地语言json配置文件
// function createTranslateLoader(http: HttpClient) {
//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ListTitleComponent,
        AllWorkComponent,
        SearchComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        NotBindComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        TitleModule,
        DateModule,
        MessageBoxModule,
        LoadMoreModule,
        UndefinedModule,
        DirectiveModule,
        LoadingModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: (createTranslateLoader),
        //         deps: [ HttpClient ]
        //     }
        // }),
    ],
    providers: [AppService, CookieService],
    bootstrap: [AppComponent],
})
export class AppModule { }
