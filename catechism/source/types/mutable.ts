export type Mutable<T> = {
    -readonly [Key in keyof T]: Mutable<T[Key]>;
};
