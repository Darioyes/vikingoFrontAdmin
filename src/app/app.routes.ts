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
          {
            path:'nuevo-mantenimiento',
            title:'Nuevo mantenimiento',
            loadComponent:() => import('./components/pages/maintenances/forms/form-new-maintenance/form-new-maintenance.component').then(c=>c.FormNewMaintenanceComponent),
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
          {
            path:'consulta-productos',
            title:'Consulta y modificación productos',
            loadComponent:() => import('./components/pages/prodcts/forms/form-information-product/form-information-product.component').then(c=>c.FormInformationProductComponent),
            canActivate : [authGuard]
          },
          {
            path:'nuevo-producto',
            title:'Nuevo producto',
            loadComponent:() => import('./components/pages/prodcts/forms/form-new-product/form-new-product.component').then(c=>c.FormNewProductComponent),
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
          {
            path:'nuevo-cliente',
            title:'Nuevo cliente',
            loadComponent:() => import('./components/pages/user/forms/form-new-users/form-new-users.component').then(c=>c.FormNewUsersComponent),
            canActivate: [authGuard]
          },
          {
            path:'consulta-clientes',
            title:'Consulta y modificación clientes',
            loadComponent:() => import('./components/pages/user/forms/form-information-users/form-information-users.component').then(c=>c.FormInformationUsersComponent),
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
            canActivate: [authGuard]
          },
          {
            path:'estadisticas-proveedores',
            title:'Estadisticas de proveedores',
            loadComponent:() => import('./components/pages/suppliers/suppliers-statistics/suppliers-statistics.component').then(c=>c.SuppliersStatisticsComponent),
            canActivate: [authGuard]
          },
          {
            path:'nuevo-proveedor',
            title:'Nuevo proveedor',
            loadComponent:() => import('./components/pages/suppliers/forms/form-new-suppliers/form-new-suppliers.component').then(c=>c.FormNewSuppliersComponent),
            canActivate: [authGuard]
          },
          {
            path:'consulta-proveedor',
            title:'Consulta y modificación proveedores',
            loadComponent:() => import('./components/pages/suppliers/forms/form-infrmation-suppliers/form-infrmation-suppliers.component').then(c=>c.FormInfrmationSuppliersComponent),
            canActivate: [authGuard]
          },
        ]
      },
      {
        path:'ventas',
        title: 'Ventas',
        loadComponent: () => import('./components/pages/sales/sales/sales.component').then(c=>c.SalesComponent),
        canActivate: [authGuard],
        children:[
          {
            path:'',
            redirectTo:'lista-ventas',
            pathMatch:'full'
          },
          {
            path:'lista-ventas',
            title:'Lista de ventas',
            loadComponent:() => import('./components/pages/sales/sales-detail/sales-detail.component').then(c=>c.SalesDetailComponent),
            canActivate: [authGuard]
          },
          {
            path:'estadisticas-ventas',
            title:'Estadisticas de ventas',
            loadComponent:() => import('./components/pages/sales/sales-statistics/sales-statistics.component').then(c=>c.SalesStatisticsComponent),
            canActivate: [authGuard]
          },
          {
            path:'modificar-venta',
            title:'Modificar venta',
            loadComponent:() => import('./components/pages/sales/forms/sales-modify/sales-modify.component').then(c=>c.SalesModifyComponent),
            canActivate: [authGuard]
          },
          {
            path:'nuevo-venta',
            title:'Nuevo venta',
            loadComponent:() => import('./components/pages/sales/forms/sales-new/sales-new.component').then(c=>c.SalesNewComponent),
            canActivate: [authGuard]
          }
        ]
      },
      {
        path:'transacciones',
        title: 'Transacciones',
        loadComponent: () => import('./components/pages/transactions/transactions/transactions.component').then(c=>c.TransactionsComponent),
        canActivate: [authGuard],
        children:[
          {
            path:'',
            redirectTo:'lista-transacciones',
            pathMatch:'full'
          },
          {
            path:'lista-transacciones',
            title:'Lista de transacciones',
            loadComponent:() => import('./components/pages/transactions/transactions-detail/transactions-detail.component').then(c=>c.TransactionsDetailComponent),
            canActivate: [authGuard]
          },
          {
            path:'estadisticas-transacciones',
            title:'Estadisticas de transacciones',
            loadComponent:() => import('./components/pages/transactions/transactions-statistics/transactions-statistics.component').then(c=>c.TransactionsStatisticsComponent),
            canActivate: [authGuard]
          },
        ]
      },
      {
        path:'costosdirectos',
        title: 'Costos Directos',
        loadComponent: () => import('./components/pages/costs/direct-costs/direct-costs.component').then(c=>c.DirectCostsComponent),
        canActivate: [authGuard],
      },
      {
        path:'costosindirectos',
        title: 'Costos Indirectos',
        loadComponent: () => import('./components/pages/costs/indirect-costs/indirect-costs.component').then(c=>c.IndirectCostsComponent),
        canActivate: [authGuard],
      },
      {
        path:'categorias',
        title: 'Categorias',
        loadComponent: () => import('./components/pages/categories/categories.component').then(c=>c.CategoriesComponent),
        canActivate: [authGuard],
        children:[
          {
            path:'',
            redirectTo:'categorias-productos',
            pathMatch:'full'
          },
          {
            path:'categorias-productos',
            title:'Categorias de Productos',
            loadComponent:() => import('./components/pages/categories/categories-products/categories-products.component').then(c=>c.CategoriesProductsComponent),
            canActivate: [authGuard]
          },
          {
            path:'modificar-categoria-producto',
            title:'Modificar Categoria Producto',
            loadComponent:() => import('./components/pages/categories/categories-products/forms/categories-products-modify/categories-products-modify.component').then(c=>c.CategoriesProductsModifyComponent),
            canActivate: [authGuard]
          },
          {
            path:'crear-categoria-producto',
            title:'Crear Categoria Producto',
            loadComponent:() => import('./components/pages/categories/categories-products/forms/categories-products-create/categories-products-create.component').then(c=>c.CategoriesProductsCreateComponent),
            canActivate: [authGuard]
          },
          {
            path:'categorias-costos-directos',
            title:'Categorias de Costos Directos',
            loadComponent:() => import('./components/pages/categories/categories-direct-costs/categories-direct-costs.component').then(c=>c.CategoriesDirectCostsComponent),
            canActivate: [authGuard]
          },
          {
            path:'modificar-categoria-costos-directos',
            title:'Modificar Categoria Costos Directos',
            loadComponent:() => import('./components/pages/categories/categories-direct-costs/forms/categories-direct-cost-modify/categories-direct-cost-modify.component').then(c=>c.CategoriesDirectCostModifyComponent),
            canActivate: [authGuard]
          },
          {
            path:'crear-categoria-costos-directos',
            title:'Crear Categoria Costos Directos',
            loadComponent:() => import('./components/pages/categories/categories-direct-costs/forms/categories-direct-cost-create/categories-direct-cost-create.component').then(c=>c. CategoriesDirectCostCreateComponent),
            canActivate: [authGuard]
          },
          {
            path:'categorias-costos-indirectos',
            title:'Categorias de Costos Indirectos',
            loadComponent:() => import('./components/pages/categories/categories-indirect-costs/categories-indirect-costs.component').then(c=>c.CategoriesIndirectCostsComponent),
            canActivate: [authGuard]
          },
          {
            path:'modificar-categoria-costos-indirectos',
            title:'Modificar Categoria Costos Indirectos',
            loadComponent:() => import('./components/pages/categories/categories-indirect-costs/forms/categories-indirect-cost-modify/categories-indirect-cost-modify.component').then(c=>c.CategoriesIndirectCostModifyComponent),
            canActivate: [authGuard]
          },
          {
            path:'crear-categoria-costos-indirectos',
            title:'Crear Categoria Costos Indirectos',
            loadComponent:() => import('./components/pages/categories/categories-indirect-costs/forms/categories-indirect-cost-create/categories-indirect-cost-create.component').then(c=>c.CategoriesIndirectCostCreateComponent),
            canActivate: [authGuard]
          },
          {
            path:'crear-categoria-costos-indirectos',
            title:'Crear Categoria Costos Indirectos',
            loadComponent:() => import('./components/pages/categories/categories-indirect-costs/forms/categories-indirect-cost-create/categories-indirect-cost-create.component').then(c=>c.CategoriesIndirectCostCreateComponent),
            canActivate: [authGuard]
          },
        ]
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];
