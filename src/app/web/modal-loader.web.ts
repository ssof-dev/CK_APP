import { TabzModule } from './tabz.module';

// import { DSearchAddrComponent } from '../dialog/DSearchAddr/DSearchAddr.component';
import { DSearchAddrComponent } from '../dialog/DSearchAddr/DSearchAddr.component';
import { DialogMenualComponent } from '../dialog/menual/menual.component';
export class ModalLoaderWeb {
    private modelList = [
        { id : 'app-menualDialog', component : DialogMenualComponent},
        { id: 'app-dSearchAddr', component: DSearchAddrComponent },
    ];

    public GetModalList() {
        return this.modelList;
    }
}