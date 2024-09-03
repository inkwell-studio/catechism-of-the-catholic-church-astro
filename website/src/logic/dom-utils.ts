//#region Event handlers
// deno-lint-ignore ban-types
export function onClick(e: Element, f: Function): void {
    e.addEventListener('click', () => f());
}
//#endregion

//#region Showing and hiding elements
export function toggle(e: Element): void {
    toggleClass(e, hidingClass);
}

export function show(e: Element): void {
    removeClass(e, hidingClass);
}

export function hide(e: Element): void {
    addClass(e, hidingClass);
}
//#endregion

//#region Class utils
const hidingClass = 'hidden';

export function toggleClass(e: Element, cssClass: string): void {
    if (e.classList.contains(cssClass)) {
        removeClass(e, cssClass);
    } else {
        addClass(e, cssClass);
    }
}

export function addClass(e: Element, cssClass: string): void {
    e.classList.add(cssClass);
}

export function removeClass(e: Element, cssClass: string): void {
    e.classList.remove(cssClass);

    /*
    Remove the `class` attribute if it is empty to prevent the `class` attribute
    being present without a value, which is invalid HTML (i.e. `<html class>`)
    */
    if (e.classList.length === 0) {
        e.removeAttribute('class');
    }
}
//#endregion
