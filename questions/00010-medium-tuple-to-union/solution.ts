export type TupleToUnion<T> = T extends Array<infer Item> ? Item : T
