import { NgModule } from '@angular/core';

import { CommaPipeComponent } from './component/comma.pipe.component';
import { bizNoPipecomponent } from './component/bizNo.pipe.component';
import { ymdPipecomponent } from './component/ymd.pipe.component';
import { resNoPipecomponent } from './component/resNo.pipe.component';
import { hpNoPipecomponent } from './component/hpNo.pipe.component';
import { frcCdPipecomponent } from './component/frcCd.pipe.component';
import { juminCoNoPipecomponent } from './component/juminCoNo.pipe.component';
import { statePipecomponent } from './component/state.pipe.component';

@NgModule({
	declarations: [
		CommaPipeComponent,
		bizNoPipecomponent,
		ymdPipecomponent,
		resNoPipecomponent,
		hpNoPipecomponent,
		frcCdPipecomponent,
		juminCoNoPipecomponent,
		statePipecomponent,
	],
	exports: [
		CommaPipeComponent,
		bizNoPipecomponent,
		ymdPipecomponent,
		resNoPipecomponent,
		hpNoPipecomponent,
		frcCdPipecomponent,
		juminCoNoPipecomponent,
		statePipecomponent,
	],
	providers: [
	]
})

export class PipeModule { }