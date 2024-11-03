import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'VikingoTech',
    loadComponent: () => import('./components/pages/user/login-page/login-page.component').then(c=>c.LoginPageComponent)
  },
  {
    path: 'home',
    title: 'Dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(c=>c.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {path: '',
        redirectTo: '/home/mantenimientos',
        pathMatch: 'full'
      },
      {
        path:'mantenimientos',
        title: 'Mantenimientos',
        loadComponent: () => import('./components/pages/maintenances/maintenances/maintenances.component').then(c=>c.MaintenancesComponent),
        canActivate: [authGuard],
      },
      {
        path:'clientes',
        title: 'Clientes',
        loadComponent: () => import('./components/pages/user/user-page/user-page.component').then(c=>c.UserPageComponent),
        canActivate: [authGuard],
      },
      {
        path:'costosdirectos',
        title: 'Costos Directos',
        loadComponent: () => import('./components/pages/costs/categorydirect-costs/categorydirect-costs.component').then(c=>c.CategorydirectCostsComponent),
        canActivate: [authGuard],
      },
      {
        path:'costosindirectos',
        title: 'Costos Indirectos',
        loadComponent: () => import('./components/pages/costs/category-indirect-costs/category-indirect-costs.component').then(c=>c.CategoryIndirectCostsComponent),
        canActivate: [authGuard],
      },
      {
        path:'productos',
        title: 'Productos',
        loadComponent: () => import('./components/pages/prodcts/products/products.component').then(c=>c.ProductsComponent),
        canActivate: [authGuard],
      },
      {
        path:'ventas',
        title: 'Ventas',
        loadComponent: () => import('./components/pages/sales/sales/sales.component').then(c=>c.SalesComponent),
        canActivate: [authGuard],
      },
      {
        path:'proveedores',
        title: 'Proveedores',
        loadComponent: () => import('./components/pages/suppliers/suppliers/suppliers.component').then(c=>c.SuppliersComponent),
        canActivate: [authGuard],
      },
      {
        path:'transacciones',
        title: 'Transacciones',
        loadComponent: () => import('./components/pages/transactions/transactions/transactions.component').then(c=>c.TransactionsComponent),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];
