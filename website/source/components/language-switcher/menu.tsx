import { Button, Menu as MenuRac, MenuItem, MenuTrigger, Popover } from 'react-aria-components';

export interface MenuProps {
    items: Array<{
        label: string;
        url?: string;
    }>;
}

export function Menu(props: MenuProps): JSX.Element {
    return (
        <MenuTrigger>
            <Button aria-label='Menu'>Language</Button>
            <Popover>
                <MenuRac>
                    {props.items.map((item) => (
                        item.url
                            ? <MenuItem key={item.label} href={item.url}>{item.label}</MenuItem>
                            : <MenuItem key={item.label} className='opacity-50'>{item.label}</MenuItem>
                    ))}
                </MenuRac>
            </Popover>
        </MenuTrigger>
    );
}
