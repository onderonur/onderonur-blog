---
template: BlogPostPage
title: Sorting Arrays in JavaScript
slug: /sorting-arrays-in-javascript
date: 2020-12-13 05:20
description: Tips for sorting arrays of numbers, strings and objects in JavaScript
featuredImage: /assets/tolga-ulkan-9k36QqhA0cU-unsplash.jpg
---

JavaScript can be tricky sometimes. We know the times when we try something so easy like sorting an array, but it ends up so wrong and breaks our code.

When we know why this happens and how to fix it, it's all easy actually.

## Array.sort()

In JavaScript, arrays have an useful `sort` method and it can be used like this:

```js
const arr = [5, 7, 1, 3];
arr.sort();
console.log(arr);
// logs: [ 1, 3, 5, 7 ]
```

Just as we expected, right? It sorts the array in an ascending order.

Let's look at another example:

```js
const arr = [15, 17, 1, 2, 3];
arr.sort();
console.log(arr);
// logs: [ 1, 15, 17, 2, 3 ]
```

And welcome to lands of JavaScript! You can try this code snippet and see if the result is right or wrong. But it's absolutely right and there is a reason behind it. The default method converts each of the elements to `string` and then compares them. So, even if we try this on an array full of numeric values, it ends up like this.

## The Compare function

To make `sort` method to act as we want, we need to give it a compare function. It's an optional parameter, but we saw how it executes if we don't pass it. The function should look like this:

```js
function compare(firstItem, secondItem) {
  // do things, and return a numeric value.
}
```

Our `compare` function should return a numeric value after comparing two items.

- If it returns 0, order of compared values does not change.
- If it returns a positive `number`, `secondItem` gets placed after `firstItem`.
- If it returns a negative `number`, `firstItem` gets placed after `secondItem`.

So, if we want our numeric values to be sorted in an ascending order, we can do it like this:

```js
function compareNumbers(firstItem, secondItem) {
  return firstItem - secondItem;
}

const arr = [15, 17, 1, 2, 3];
arr.sort(compareNumbers);
console.log(arr);
// logs: [ 1, 2, 3, 15, 17 ]
```

And that's all we need to do! If we want to sort them in a descending order:

```js
function compareNumbersInReverse(firstItem, secondItem) {
  return secondItem - firstItem;
}

const arr = [15, 17, 1, 2, 3];
arr.sort(compareNumbersInReverse);
console.log(arr);
// logs: [ 17, 15, 3, 2, 1 ]

// Or we can do it like this too
function compareNumbers(firstItem, secondItem) {
  return firstItem - secondItem;
}

arr.sort(compareNumbers).reverse();
console.log(arr);
// logs: [ 17, 15, 3, 2, 1 ]
```

## Sorting different data types

We saw how we can sort numeric values. But what about other things?

### Date

Using the `firstItem - secondItem` method is OK for `Date` objects too. If our object has a `valueOf` method that returns a numeric value and if it can indicate some sort of an order for that object, we can use this technique. For `Date`, its `valueOf` method returns number of milliseconds since the epoch (1970-01-01T00:00:00Z). So, we can use it to sort `Date` objects.

```js
function compareDates(firstDate, secondDate) {
  return firstDate - secondDate;
}

const datesArr = [
  new Date(2020, 0, 1),
  new Date(2019, 5, 9),
  new Date(2020, 6, 10),
];

datesArr.sort(compareDates);
console.log(datesArr);
// logs:
// [
//   2019-06-09T00:00:00.000Z,
//   2020-01-01T00:00:00.000Z,
//   2020-07-10T00:00:00.000Z
// ]
```

Or we can use `getTime` method to be more explicit of course.

```js
function compareDates(firstDate, secondDate) {
  return firstDate.getTime() - secondDate.getTime();
}
```

## string

We know that `sort` method implicitly converts items to `string` and compares them. So, why do we think about `string` values if we already have this? Let's have a look:

```js
const users = ['User 1', 'User 5', 'User 30', 'User 12', 'User 18'];
users.sort();
console.log(users);
// logs: [ 'User 1', 'User 12', 'User 18', 'User 30', 'User 5' ]
```

If we have numeric values in our strings and want to order items by considering them too, the default compare function is not enough for us.

For this case, we need to use [Intl.Collator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator). It is a constructor that creates objects to be used in language sensitive string comparison.

```js
const collator = new Intl.Collator(undefined, {
  // To consider numeric values in strings
  numeric: true,
});
const users = ['User 1', 'User 5', 'User 30', 'User 12', 'User 18'];
users.sort(collator.compare);
console.log(users);
// logs: [ 'User 1', 'User 5', 'User 12', 'User 18', 'User 30' ]
```

Also, the same thing can be achieved by using `localeCompare` too. It gets the same parameters as `Intl.Collator` constructor.

```js
function compareStrings(firstString, secondString) {
  return firstString.localeCompare(secondString, undefined, {
    numeric: true,
  });
}
const users = ['User 1', 'User 5', 'User 30', 'User 12', 'User 18'];
users.sort(compareStrings);
console.log(users);
// logs: [ 'User 1', 'User 5', 'User 12', 'User 18', 'User 30' ]
```

_As a side note, if we have a big array to sort, it's better to use `Intl.Collator` in terms of performance._

## Custom objects

As we can see, we can compare items in an array as we want. So, comparing custom objects (or class instances etc.) are no different.

```js
function compareBeatles(firstBeatle, secondBeatle) {
  return firstBeatle.age - secondBeatle.age;
}

const beatles = [
  { name: 'John', age: 25 },
  { name: 'Ringo', age: 28 },
  { name: 'Paul', age: 26 },
  { name: 'George', age: 25 },
];

beatles.sort(compareBeatles);
console.log(beatles);
// logs:
// [
//   { name: 'John', age: 25 },
//   { name: 'George', age: 25 },
//   { name: 'Paul', age: 26 },
//   { name: 'Ringo', age: 28 }
// ]
```

And we can use custom methods of our object, of course.

```js
const dayjs = require('dayjs');

function compare(first, second) {
  return first.diff(second);
}

const arr = [dayjs('2020-1-6'), dayjs('2019-5-9'), dayjs('2020-10-12')];

arr.sort(compare);
console.log(arr.map((date) => date.format('YYYY-MM-DD')));
// logs: [ '2019-05-09', '2020-01-06', '2020-10-12' ]
```

## Array.sort() Mutates the Original Array

Throughout our examples, you may have noticed something. We used `sort` method a lot, but never assigned the value returned from it. Yep, you knew it. It mutates the original array. So if we use this method in a project built with a package that doesn't want you to mutate data (like React, React-Native, Redux etc.), we need to consider this too. Even though it returns the mutated array as a result like:

```js
const sortedArr = arr.sort();
```

it mutates the original.

To handle this, we can do something like:

```js
function sortNumbers(numberArr) {
  // We use spread operator (...) to create a shallow copy of
  // our original array. So, we don't mutate the original.
  const sortedArr = [...numberArr].sort((first, second) => {
    return first - second;
  });
  return sortedArr;
}

let arr = [15, 17, 1, 2, 3];
arr = sortNumbers(arr);
console.log(arr);
// logs: [ 1, 2, 3, 15, 17 ]
```

## Conclusion

`sort` is a very cool method of `Array` class. When we know how it behaves on certain conditions, it's a really helpful method.

Thanks for reading!
