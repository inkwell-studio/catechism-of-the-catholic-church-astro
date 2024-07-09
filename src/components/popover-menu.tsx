import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

export function PopoverMenu(props: { buttonClasses?: string }): JSX.Element {
    const items = [
        'Ferrari',
        'Jaguar',
        'Lamborghini',
        'Porsche',
    ];

    return (
        <Popover>
            <PopoverButton className={`${props.buttonClasses} text-3xl font-bold py-4 px-8 rounded-lg`}>
                Popover
            </PopoverButton>
            <PopoverPanel
                anchor='top'
                className='bg-gray-100 dark:bg-gray-800 text-gray-50 font-mono shadow-2xl rounded-lg [--anchor-gap:1.5rem]'
            >
                <ol className='space-y-2'>
                    {items.map((item) => (
                        <li key={item}>
                            <button className='w-full py-4 px-8 text-gray-700 hover:bg-gray-600 hover:text-gray-50 dark:text-slate-200 dark:hover:bg-slate-100 dark:hover:text-gray-950'>
                                {item}
                            </button>
                        </li>
                    ))}
                </ol>
            </PopoverPanel>
        </Popover>
    );
}
