import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './SearchFilterPipe';
import { AtosService } from './atos.service';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [],
    providers: [AtosService, SearchFilterPipe],
    exports: []
})

export class AppServicoJsonModule{ }