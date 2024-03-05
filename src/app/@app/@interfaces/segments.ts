export interface Segments {
    name?: string;
    /* be true to set it the default value if many itmes contain this with true value will take the first one*/
    default: boolean,
    /* this will be true to display icon in the title will display icon only */
    includeIcon: boolean,
    /* font awsome icon name */
    icon: string,
    /* font aswsome icon family */
    iconFamily: string,
    /* this value will return when segment changed */
    key: string,
    class?:string
}
