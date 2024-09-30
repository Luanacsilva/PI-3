export type HTTPResponseFormat = {
    status: number,
    message: string,
    data?: object,
    errors?: object;
};

export type BaseRepository<T, C, U> = {
    getAll: () => Promise<T[] | null>;
    getById: (id: number) => Promise<T | null>;
    create: (data: C) => Promise<T>;
    updateById: (id: number, data: U) => Promise<T>;
    deleteById: (id: number) => Promise<Boolean>;
};