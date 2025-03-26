import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule, StoreRootModule } from '@ngrx/store';
import { taskReducer } from './core/reducer/task.reducer';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // alternative to `StoreModule.forRoot`
    provideStore({
      task: taskReducer
    }),
    // alternative to `StoreDevtoolsModule.instrument`
    provideStoreDevtools(),
    // alternative to `EffectsModule.forRoot`
    provideEffects([]),
    provideAnimations()
    
  ],
};
