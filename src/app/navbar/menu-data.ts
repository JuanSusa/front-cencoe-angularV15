export interface MenuItem {
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
        icon:'campaign',
        label: 'Campañas',
        route: '../campañas'
    },
    {
        icon:'business',
        label: 'Clientes',
        route: '../clientes'
    },
    {
        icon:'assignment_ind',
        label: 'Proveedores',
        route: '../proveedores'
    },
    {
        icon:'group',
        label: 'Usuarios',
        route: '../usuarios'
    },
    {
        icon:'settings',
        label: 'Configuracion',
        route: './configuracion'
    },

]