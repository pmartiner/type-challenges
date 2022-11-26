<!--info-header-start--><h1>Deep Readonly <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23readonly-999" alt="#readonly"/> <img src="https://img.shields.io/badge/-%23object--keys-999" alt="#object-keys"/> <img src="https://img.shields.io/badge/-%23deep-999" alt="#deep"/></h1><blockquote><p>by Anthony Fu <a href="https://github.com/antfu" target="_blank">@antfu</a></p></blockquote><p><a href="https://tsch.js.org/9/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.

You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

For example:

```ts
type X = {
  x: {
    a: 1
    b: "hi"
  }
  y: "hey"
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: "hi"
  }
  readonly y: "hey"
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

### Solution

In my first (naive) attempt I created a shallow readonly object by doing, but of course it didn't work.

```typescript
export type DeepReadonly<T> = {
  readonly [Key in keyof T]: T[Key]
}
```

After that I tried to iterate over the object to see if the `T[Key]` was a `Record` or not without success.
Then I, after I investigated if recursion was posible in Typescript, I realized I could use it to come up with a solution:

```typescript
export type DeepReadonly<T> = {
  readonly [Key in keyof T]: keyof T[Key] extends never
    ? T[Key]
    : DeepReadonly<T[Key]>
}
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/9/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/9/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md" target="_blank"><img src="https://img.shields.io/badge/-7%E3%83%BBReadonly-7aad0c" alt="7・Readonly"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.md" target="_blank"><img src="https://img.shields.io/badge/-8%E3%83%BBReadonly%202-d9901a" alt="8・Readonly 2"/></a> <!--info-footer-end-->
