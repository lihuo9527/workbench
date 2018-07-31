import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/nav/home/home.component';
import { DeliverDelayComponent } from './pages/delay/deliver-delay/deliver-delay.component';
import { CriticalEventDelayComponent } from './pages/delay/critical-event-delay/critical-event-delay.component';
import { ProcessDelayComponent } from './pages/delay/process-delay/process-delay.component';
import { EventDelayEditComponent } from './pages/delay/event-delay-edit/event-delay-edit.component';
import { MaterialDelayComponent } from './pages/delay/material-delay/material-delay.component';
import { AllWorkComponent } from './pages/nav/all-work/all-work.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';
import { NotBindComponent } from './pages/not-bind/not-bind.component';
export const appRoutes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'all',
        component: AllWorkComponent
    },
    {
        path: 'search/:id',
        component: SearchComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'delay',
        loadChildren: 'app/pages/delay/delay.module#DelayModule'
    },
    {
        path: 'entry',
        loadChildren: 'app/pages/entry/entry.module#EntryModule'
    },
    {
        path: 'out',
        loadChildren: 'app/pages/out/out.module#OutModule'
    },
    {
        path: 'forms',
        loadChildren: 'app/pages/forms/forms.module#FormsModule'
    },
    {
        path: 'ndays',
        loadChildren: 'app/pages/ndays/ndays.module#NdaysModule'
    },
    {
        path: 'not-bind',
        component: NotBindComponent
    },
    {
        path: '',
        component: HomeComponent
    },

    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];