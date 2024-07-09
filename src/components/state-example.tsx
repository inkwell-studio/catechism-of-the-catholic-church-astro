import { useStore } from '@nanostores/react';

import { $count, modifyCount } from '../logic/store.ts';

export function StateManagement(props: { classes?: string }): JSX.Element {
    const count = useStore($count);

    return (
        <div className={`${props.classes} flex flex-col items-center gap-2 bg-stone-950 text-stone-50 font-mono p-4 rounded-sm`}>
            <strong>State</strong>
            <div>
                [ {count} ]
            </div>
            <div className='flex gap-2'>
                <button className='w-full text-xl font-bold p-4 hover:bg-white/10' onClick={() => modifyCount(-1)}>-</button>
                <button className='w-full text-xl font-bold p-4 hover:bg-white/10' onClick={() => modifyCount(1)}>+</button>
            </div>
        </div>
    );
}
