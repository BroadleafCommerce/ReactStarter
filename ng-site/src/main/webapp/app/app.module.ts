import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { BroadleafAngularStarterSharedModule, UserRouteAccessService } from './shared';
import { BroadleafAngularStarterAppRoutingModule} from './app-routing.module';
import { BroadleafAngularStarterHomeModule } from './home/home.module';
import { BroadleafAngularStarterAdminModule } from './admin/admin.module';
import { BroadleafAngularStarterAccountModule } from './account/account.module';
import { BroadleafAngularStarterEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        BroadleafAngularStarterAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        BroadleafAngularStarterSharedModule,
        BroadleafAngularStarterHomeModule,
        BroadleafAngularStarterAdminModule,
        BroadleafAngularStarterAccountModule,
        BroadleafAngularStarterEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class BroadleafAngularStarterAppModule {}
