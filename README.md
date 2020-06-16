# React Local Signal Storage

React Hooks adapter for [Local Signal Storage](https://www.npmjs.com/package/local-signal-storage)

Provides the same as API as [react-use useLocalStorage](https://github.com/streamich/react-use/blob/HEAD/docs/useLocalStorage.md) while keeping changes made in different components on the same page in sync.

## Installation
```
yarn install local-signal-storage
```
Or
```
npm install local-signal-storage
```

## Usage
```
import { useLocalSignalStorage } from 'react-local-signal-storage';

const Demo = () => {
  const [value, setValue, remove] = useLocalSignalStorage('my-key', 'foo');

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue('bar')}>bar</button>
      <button onClick={() => setValue('baz')}>baz</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};
```

## Credits
* [react-use](https://github.com/streamich/react-use)
* [usehooks.com](https://usehooks.com/useLocalStorage/)
