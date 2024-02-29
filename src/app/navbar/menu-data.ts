export interface MenuItem {
    nombre: String;
    icon: string;
    label: string;
    route: string | null;
}

export const menuItems : MenuItem[] = [
    // {
    //     icon:'dashboard',
    //     label: 'Dashboard',
    //     route: '/inicio'
    // },
    {
        nombre: 'Campañas',
        icon:'campaign',
        label: 'Campañas',
        route: '../campañas'
    },
    {
        nombre: 'Clientes',
        icon:'business',
        label: 'Clientes',
        route: '../clientes'   
    },
    {
        nombre: 'Proveedores',
        icon:'assignment_ind',
        label: 'Proveedores',
        route: '../proveedores'
    },
    {
        nombre: 'Usuarios',
        icon:'group',
        label: 'Usuarios',
        route: '../usuarios'
    },
 
    {
        nombre: 'Grupos',
        icon:'group_add',
        label: 'grupos',
        route: '../grupos'
    },
    {
        nombre: 'Configuración',
        icon:'help',
        label: 'Configuracion',
        route: './configuracion'
    },
 

]
