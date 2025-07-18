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
npm install @italomaio/react-cron-gen

# Using pnpm
pnpm install @italomaio/react-cron-gen

# Using Yarn
yarn add @italomaio/react-cron-gen
```

@radix-ui/react-select is needed to render UI from CronGen component.

### Usage

Once installed, you can import and use the `CronGen` component in your React application:

```tsx
const { state, setField, setFrequency } = useCronGen({
  type: "unix",
  locale: "pt-BR",
});

<input onChange={e => setField('hour', e.target.value)}>
```

### Props

The `CronGen` component accepts the following props:

| Prop       | Type                     | Required | Description                                                   | Default   |
| :--------- | :----------------------- | :------- | :------------------------------------------------------------ | :-------- |
| `classes`  | `object`                 | No       | CSS classes for styling various parts of the component.       | `{}`      |
| `locale`   | `string`                 | No       | Sets the language for the component (e.g., 'en-US', 'pt-BR'). | `'en-US'` |
| `type`     | `'unix' \| 'quartz'`     | No       | Specifies the type of cron expression to generate.            | `'unix'`  |
| `onChange` | `(cron: string) => void` | Yes      | Callback function triggered when the cron expression changes. | `(N/A)`   |
| `value`    | `string`                 | No       | Initial cron expression to display.                           | `''`      |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
