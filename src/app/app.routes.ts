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
        children:[
          {
            path:'',
            redirectTo:'lista-mantenimientos',
            pathMatch:'full'
          },
          {
            path:'lista-mantenimientos',
            title:'Lista de mantenimientos',
            loadComponent:() => import('./components/pages/maintenances/maintenances-list/maintenances-list.component').then(c=>c.MaintenancesListComponent),
            canActivate: [authGuard]
          },
          {
            path:'estadisticas-mantenimiento',
            title:'Estadisticas de mantenimiento',
            loadComponent:()=> import('./components/pages/maintenances/maintenance-statistics/maintenance-statistics.component').then(c=>c.MaintenanceStatisticsComponent),
            canActivate: [authGuard]
          },
        ],
      },
      {
        path:'productos',
        title: 'Productos',
        loadComponent: () => import('./components/pages/prodcts/products/products.component').then(c=>c.ProductsComponent),
        canActivate: [authGuard],
        children:[
          {
            path:'',
            redirectTo:'lista-productos',
            pathMatch:'full'
          },
          {
            path:'lista-productos',
            title:'Lista de productos',
            loadComponent:() => import('./components/pages/prodcts/product-detail/product-detail.component').then(c=>c.ProductDetailComponent),
            canActivate: [authGuard]
          },
          {
            path:'estadisticas-productos',
            title:'Estadisticas de productos',
            loadComponent:() => import('./components/pages/prodcts/product-statistics/product-statistics.component').then(c=>c.ProductStatisticsComponent),
            canActivate: [authGuard]
          },
        ],
      },
      {
        path:'clientes',
        title: 'Clientes',
        loadComponent: () => import('./components/pages/user/user-page/user-page.component').then(c=>c.UserPageComponent),
        canActivate: [authGuard],
        children:[
          {
            path:'',
            redirectTo:'detalle-clientes',
            pathMatch:'full'
          },
          {
            path:'detalle-clientes',
            title:'Detalle de clientes',
            loadComponent:() => import('./components/pages/user/user-detail/user-detail.component').then(c=>c.UserDetailComponent),
            canActivate: [authGuard]
          },
          {
            path:'estadisticas-clientes',
            title:'Estadisticas de clientes',
            loadComponent:() => import('./components/pages/user/user-statistics/user-statistics.component').then(c=>c.UserStatisticsComponent),
            canActivate: [authGuard]
          },
        ],
      },
      {
        path:'proveedores',
        title: 'Proveedores',
        loadComponent: () => import('./components/pages/suppliers/suppliers/suppliers.component').then(c=>c.SuppliersComponent),
        canActivate: [authGuard],
        children:[
          {
            path:'',
            redirectTo:'lista-proveedores',
            pathMatch:'full'
          },
          {
            path:'lista-proveedores',
            title:'Lista de proveedores',
            loadComponent:() => import('./components/pages/suppliers/suppliers-detail/suppliers-detail.component').then(c=>c.SuppliersDetailComponent),
          },
          {
            path:'estadisticas-proveedores',
            title:'Estadisticas de proveedores',
            loadComponent:() => import('./components/pages/suppliers/suppliers-statistics/suppliers-statistics.component').then(c=>c.SuppliersStatisticsComponent),
          },
        ]
      },
      {
        path:'ventas',
        title: 'Ventas',
        loadComponent: () => import('./components/pages/sales/sales/sales.component').then(c=>c.SalesComponent),
        canActivate: [authGuard],
      },
      {
        path:'transacciones',
        title: 'Transacciones',
        loadComponent: () => import('./components/pages/transactions/transactions/transactions.component').then(c=>c.TransactionsComponent),
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
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];
