## ⏱ React Cron Gen

[![Main Branch CD Pipeline](https://github.com/italomaio/react-cron-gen/actions/workflows/publish.yaml/badge.svg)](https://github.com/italomaio/react-cron-gen/actions/workflows/publish.yaml)
[![npm version](https://img.shields.io/npm/v/react-cron-gen.svg)](https://www.npmjs.com/package/react-cron-gen)
![License](https://img.shields.io/github/license/italomaio/react-cron-gen)

## Built to deliver flexibility and user experience on creating cron expression in your react application

`react-cron-gen` make easy to build cron expressions in your application using `useCronGen` hook or by using `CronGen` component.

### Install

This package supports various Node.js package managers for flexible installation:

```sh
# Using npm
npm install react-cron-gen

# Using pnpm
pnpm install react-cron-gen

# Using Yarn
yarn add react-cron-gen
```

@radix-ui/react-select is needed to render UI from CronGen component.

### Usage

Once installed, you can import and use the `useCronGen` hook or `CronGen` component in your React application:

### useCronGen hook

It provides methods to set singular fields, format cron expression and i18n objects to use in your own UI.

```tsx
import { useCronGen } from 'react-cron-gen';

const { state, data, setField, setFrequency } = useCronGen({
  type: "unix",
  locale: "pt-BR",
});

// Formatted expression
<input value={state.expression} />

// Index starts at 0 but cron experession starts from 1 then you should increase index
<select onChange={e => setField('month', e.target.value)}>
    {data.months.map((value, index) => (
        <option key={value} value={(index + 1).toString()}>
            {value}
        </option>
    )}
</select>
```

### CronGen component

It provides a production ready UI component. You could customize fields using css just by referencing classes in your CSS File.

```css
.react-cron-gen__select-trigger,
.react-cron-gen__select-content,
.react-cron-gen__select-item,
.react-cron-gen__input {
    #CSS properties
}
```

Or by passing your custom classes to **classes** object. You can make use of tailwind classes too like:

```js
classes: {
  select: {
    trigger: "h-10 bg-gray-500 etc";
  }
}
```

Or even if you want use the default style you should import css file from react-cron-gen

```ts
import "react-cron-gen/dist/styles.css";
```

```tsx
<CronGen
  locale="pt-BR"
  type="unix"
  onChangeValue={(values) => console.log(values)}
/>
```

### Props

The `CronGen` component accepts the following props:

| Prop            | Type                                | Required | Description                                                   | Default   |
| :-------------- | :---------------------------------- | :------- | :------------------------------------------------------------ | :-------- |
| `classes`       | `object`                            | No       | CSS classes for styling various parts of the component.       | `{}`      |
| `locale`        | `'pt-BR' \| 'en-US'`                | No       | Sets the language for the component (e.g., 'en-US', 'pt-BR'). | `'en-US'` |
| `type`          | `'unix' \| 'quartz'`                | No       | Specifies the type of cron expression to generate.            | `'unix'`  |
| `onChangeValue` | `(values: UseCronGenState) => void` | Yes      | Callback function triggered when the cron expression changes. | `(N/A)`   |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
