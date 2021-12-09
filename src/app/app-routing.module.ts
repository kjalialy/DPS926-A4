import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'album-detail/:id',
    loadChildren: () => import('./album-detail/album-detail.module').then( m => m.AlbumDetailPageModule)
  },
  {
    path: 'artist-detail/:id',
    loadChildren: () => import('./artist-detail/artist-detail.module').then( m => m.ArtistDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
