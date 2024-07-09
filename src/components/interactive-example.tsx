export function InteractiveExample(): JSX.Element {
    return (
        <button
            type='button'
            className='p-4 bg-stone-100 hover:bg-white dark:bg-slate-600 dark:hover:bg-slate-700 transition-colors rounded'
            onClick={() => console.log('interactive example')}
        >
            Interactive example
        </button>
    );
}
