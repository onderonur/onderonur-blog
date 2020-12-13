---
template: BlogPostPage
title: State Management and Performance Optimizations with React Context API and Hooks
slug: /state-management-and-performance-optimizations-with-react-context-api-and-hooks
date: 2020-10-12 11:51
description: State management for React applications is a concept with a lot of
  alternative solutions. We have things like redux, mobx, mobx-state-tree,
  apollo-client and many more. They all have many different…
featuredImage: /assets/1_st54r7_l-6gftrzfygd0eq.png
---
State management for React applications is a concept with a lot of alternative solutions. We have things like [redux](https://redux.js.org/), [mobx](https://mobx.js.org/README.html), [mobx-state-tree](https://mobx-state-tree.js.org/intro/philosophy), [apollo-client](https://www.apollographql.com/docs/react/) and many more. They all have many different and similar approaches, learning curves, complexities and simplicities. They are very very useful for many situations. But I think, they add a lot of unnecessary layers for a lot of applications. Because, you already have a state management solution and it’s built-in to React. It’s React itself…

With good component composition, creating minimal and maintainable components, using Context API and hooks, you can easily manage your application state. It takes some time to get used to, but any other third party package would take at least the same amount of time.

That’s enough for the introduction. Now we will talk about Context API and some good approaches to improve its performance.

## Enter the Counter Application

This will be the most basic type of application that you can create instantly. Now open your editor, run the terminal and just run this command;

```
npx create-react-app counter-app
```

Give some time to CRA to create your project. When it’s done, delete all the files under the `src` folder and create the following files.

```javascript
// src/App.js
import React from "react";
import Count from "./Count";
import CountIncreaser from "./CountIncreaser";
import CountDecreaser from "./CountDecreaser";
import CounterProvider from "./CounterProvider";

function App() {
  return (
    <CounterProvider initialCount={5}>
      <Count />
      <CountIncreaser />
      <CountDecreaser />
    </CounterProvider>
  );
}

export default App;
```

```javascript
// src/Count.js
import React from "react";
import { useCounterContext } from "./CounterProvider";

function Count() {
  const { count } = useCounterContext();
  console.log("Count");
  return <div>Count is: {count}</div>;
}

export default Count;
```

```javascript
// src/CountDecreaser.js
import React from "react";
import { useCounterContext } from "./CounterProvider";

function CountDecreaser() {
  const { decrease } = useCounterContext();
  console.log("CountDecreaser");
  return <button onClick={decrease}>- Decrease</button>;
}

export default CountDecreaser;
```

```javascript
// src/CountProvider.js
import React, { useContext } from "react";
import useCounter from "./useCounter";

const CounterContext = React.createContext();

export function useCounterContext() {
  const value = useContext(CounterContext);
  return value;
}

function CounterProvider({ initialCount, children }) {
  const value = useCounter({ initialCount });
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

export default CounterProvider;
```

```javascript
// src/CountIncreaser.js
import React from "react";
import { useCounterContext } from "./CounterProvider";

function CountIncreaser() {
  const { increase } = useCounterContext();
  console.log("CountIncreaser");
  return <button onClick={increase}>+ Increate</button>;
}

export default CountIncreaser;
```

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

```javascript
// src/useCounter.js
import { useState, useCallback } from "react";

function useCounter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  const increase = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const decrease = useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []);

  return { count, increase, decrease };
}

export default useCounter;
```

This is just a simple counter. Nothing fancy. Just create the files those are in the snippets and run

```
npm start
```

The result should look like this.

![](/assets/01.png)

Click the buttons and the count will be increased or decreased. Everything works as expected.

![](/assets/02.png)

And also, we created a simple structure with Context and hooks to prevent prop drilling. We could do it the other way. It wouldn’t be hard for a simple application like this. But when you create real world applications, it can easily go unmaintainable.

But we have a giant problem and we are not aware of it yet. Look at the console output. Everytime you click one of the buttons, each of the components those are connected to the CounterContext just re-renders. We don’t see any slowness, but if we had more complex components, some animations etc. the application might be very very slow.

Each of the components are re-rendering, because they are connected to the `CounterContext` and we just update the context value everytime we click a button. Even if we just increase the `count` value, it is just a property under the `value` object and when we change it, its parent (`value` object itself) gets updated too. You can read about immutability and mutations in JavaScript to deeply understand this situation. Shortly, because of the context value is changed, every component that is using the context re-renders.

Here are some ways to overcome this.

## 1. Using React.memo

`React.memo` creates a memoized component and prevents unnecessary re-renders. So, if every prop and state of a component has the same value as the last time, it just doesn’t let the component to re-render.

The context value gets updated, but the `increase` and `decrease` functions still have the same memory reference (thanks to `useCallbak` hook). We just need to wrap our context consuming components with `React.memo`, remove their **direct** connection to the context, create a `Counter` component which is connected to the context and pass the required values as props to each component. With this pattern, we can prevent unnecessary re-renders. Let’s update these files;

```javascript
// src/App.js
import React from "react";
import CounterProvider from "./CounterProvider";
import Counter from "./Counter";

function App() {
  return (
    <CounterProvider initialCount={5}>
      <Counter />
    </CounterProvider>
  );
}

export default App;
```

```javascript
// src/Count.js
import React from "react";

const Count = React.memo(({count}) => {
  console.log("Count");
  return <div>Count is: {count}</div>;
});

export default Count;
```

```javascript
// src/CountDecreaser.js
import React from "react";

const CountDecreaser = React.memo(({ decrease }) => {
  console.log("CountDecreaser");
  return <button onClick={decrease}>- Decrease</button>;
});

export default CountDecreaser;
```

```javascript
// src/Counter.js
import React from "react";
import Count from "./Count";
import CountIncreaser from "./CountIncreaser";
import CountDecreaser from "./CountDecreaser";
import { useCounterContext } from "./CounterProvider";

function Counter() {
  const { count, increase, decrease } = useCounterContext();
  return (
    <>
      <Count count={count} />
      <CountIncreaser increase={increase} />
      <CountDecreaser decrease={decrease} />
    </>
  );
}

export default Counter;
```

```javascript
// src/CountIncreaser.js
import React from "react";

const CountIncreaser = React.memo(({ increase }) => {
  console.log("CountIncreaser");
  return <button onClick={increase}>+ Increate</button>;
});

export default CountIncreaser;
```

Now click the buttons a few times and look at the console output again;

![](/assets/03.png)

Only the `Count` component is re-rendering and this is exactly what we wanted. Nice!

## 2. Separate Contexts

Another approach is separating the context into multiple parts and providers. The only changing part of our context is the `count`. `increase` and `decrease` remains the same. So, if a component only wants one or both of these functions and doesn’t care about `count` value, it doesn’t need to know about the update too. Now, we will divide our context into 2 parts. `CountContext` and `CountActionsContext` . Let’s see the updated files;

```javascript
// src/App.js
import React from "react";
import useCounter from "./useCounter";
import CountProvider from "./CountProvider";
import CountActionsProvider from "./CountActionsProvider";
import Counter from "./Counter";

function App() {
  const { count, increase, decrease } = useCounter({ initialCount: 5 });
  return (
    <>
      <CountProvider count={count}>
        <CountActionsProvider increase={increase} decrease={decrease}>
          <Counter />
        </CountActionsProvider>
      </CountProvider>
    </>
  );
}

export default App;
```

```javascript
// src/Count.js
import React from "react";
import { useCountContext } from "./CountProvider";

function Count() {
  const count = useCountContext();
  console.log("Count");
  return <div>Count is: {count}</div>;
}

export default Count;
```

```javascript
// src/CountActionsProvider.js
import React, { useContext, useMemo } from "react";

const CountActionsContext = React.createContext();

export function useCountActionsContext() {
  const value = useContext(CountActionsContext);
  return value;
}

function CountActionsProvider({ increase, decrease, children }) {
  const value = useMemo(() => ({ increase, decrease }), [increase, decrease]);
  return (
    <CountActionsContext.Provider value={value}>
      {children}
    </CountActionsContext.Provider>
  );
}

export default CountActionsProvider;
```

```javascript
// src/CountDecreaser.js
import React from "react";
import { useCountActionsContext } from "./CountActionsProvider";

function CountDecreaser() {
  const { decrease } = useCountActionsContext();
  console.log("CountDecreaser");
  return <button onClick={decrease}>- Decrease</button>;
}

export default CountDecreaser;
```

```javascript
// src/Counter.js
import React from "react";
import Count from "./Count";
import CountIncreaser from "./CountIncreaser";
import CountDecreaser from "./CountDecreaser";

const Counter = React.memo(() => {
  return (
    <>
      <Count />
      <CountIncreaser />
      <CountDecreaser />
    </>
  );
});

export default Counter;
```

```javascript
// src/CountIncreaser.js
import React from "react";
import { useCountActionsContext } from "./CountActionsProvider";

function CountIncreaser() {
  const { increase } = useCountActionsContext();
  console.log("CountIncreaser");
  return <button onClick={increase}>+ Increate</button>;
}

export default CountIncreaser;
```

```javascript
// src/CountProvider.js
import React, { useContext } from "react";

const CountContext = React.createContext();

export function useCountContext() {
  const value = useContext(CountContext);
  return value;
}

function CountProvider({ count, children }) {
  return (
    <CountContext.Provider value={count}>{children}</CountContext.Provider>
  );
}

export default CountProvider;
```

Now, we don’t need to use `React.memo` with every context connected component. We just need to use it with `Count`. Because, each time the `count` state is updated, `App` component re-renders and it triggers its children to re-render too. Because that the `CountProvider` and `CountActionsProvider` has a `children` prop, they can’t be memoized with `React.memo`. Because the `children` will be created from scratch each time. They will not have the same memory reference, so the shallow equality comparison of provider props will fail. By putting the `Count` component in `React.memo`, we ensure that even if the `App`, `CountProvider` and `CountActionsProvider` re-rendered, `Count` and its children will not re-render unnecessarily.

Let’s click the buttons and look at the console output again;

![](/assets/04.png)

We have the exact same output as the first performance optimization option. Cool!

## 3. Using constate

[constate](https://github.com/diegohaz/constate) is a simple package to split your context value into multiple pieces. If you look at the source code of it, you will notice it’s just a few lines of code, but it is a smart design!

constate simply splits the context value with the functions you give it and creates multiple nested providers. So, if you want to use a part of the context value, you simply use the context and the hook dedicated to that part.

If you’re familiar with the `selectors` of `redux` this feels like them. We are simply *selecting* some part of the context value.

Now run this command to install the package.

```
npm install constate
```

Let’s see the updated files;

```javascript
// src/App.js
import React from "react";
import Count from "./Count";
import CountIncreaser from "./CountIncreaser";
import CountDecreaser from "./CountDecreaser";
import CounterProvider from "./CounterProvider";

function App() {
  return (
    <CounterProvider initialCount={5}>
      <Count />
      <CountIncreaser />
      <CountDecreaser />
    </CounterProvider>
  );
}

export default App;
```

```javascript
// src/Count.js
import React from "react";
import { useCount } from "./CounterProvider";

function Count() {
  const count = useCount();
  console.log("Count");
  return <div>Count is: {count}</div>;
}

export default Count;
```

```javascript
// src/CountDecrease.js
import React from "react";
import { useDecrease } from "./CounterProvider";

function CountDecreaser() {
  const decrease = useDecrease();
  console.log("CountDecreaser");
  return <button onClick={decrease}>- Decrease</button>;
}

export default CountDecreaser;
```

```javascript
// src/CountIncreaser.js
import React from "react";
import { useIncrease } from "./CounterProvider";

function CountIncreaser() {
  const increase = useIncrease();
  console.log("CountIncreaser");
  return <button onClick={increase}>+ Increate</button>;
}

export default CountIncreaser;
```

```javascript
// src/CountProvider.js
import constate from "constate";
import useCounter from "./useCounter";

const [CounterProvider, useCount, useIncrease, useDecrease] = constate(
  useCounter,
  value => value.count,
  value => value.increase,
  value => value.decrease
);

export { useCount, useIncrease, useDecrease };
export default CounterProvider;
```

![](/assets/05.png)

Exactly the same output as the other two options.

## Conclusion

These three options are valid and makes your application to run smoothly. You can create your own patterns while considering the requirements of your application.

Personally, I like **constate** the most. If I wouldn’t use it directly (it also uses TypeScript, has a medium sized community and unit tests, so why not?), I would just look at its source code and customize it to my needs. It removes a lot of effort and code from the project.

Separating context into multiple parts is a little bit verbose, while it’s the currently recommended way by the React team.

Just using `React.memo` and to optimize Context may be a little bit less verbose, but it may cause *prop drilling* if you don’t compose components in a proper way. So, it depends…

Thanks for reading!