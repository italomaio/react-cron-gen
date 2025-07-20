import{j as e}from"./jsx-runtime-nkbmPs1P.js";import{useMDXComponents as r}from"./index-DdVdqkSb.js";import"./iframe-Di3QmU2g.js";function o(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",strong:"strong",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{id:"-react-cron-gen",children:"⏱ React Cron Gen"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://github.com/italomaio/react-cron-gen/actions/workflows/publish.yaml",rel:"nofollow",children:e.jsx(n.img,{src:"https://github.com/italomaio/react-cron-gen/actions/workflows/publish.yaml/badge.svg",alt:"Main Branch CD Pipeline"})}),`
`,e.jsx(n.a,{href:"https://www.npmjs.com/package/react-cron-gen",rel:"nofollow",children:e.jsx(n.img,{src:"https://img.shields.io/npm/v/react-cron-gen.svg",alt:"npm version"})}),`
`,e.jsx(n.img,{src:"https://img.shields.io/github/license/italomaio/react-cron-gen",alt:"License"})]}),`
`,e.jsx(n.h2,{id:"built-to-deliver-flexibility-and-user-experience-on-creating-cron-expression-in-your-react-application",children:"Built to deliver flexibility and user experience on creating cron expression in your react application"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"react-cron-gen"})," make easy to build cron expressions in your application using ",e.jsx(n.code,{children:"useCronGen"})," hook or by using ",e.jsx(n.code,{children:"CronGen"})," component."]}),`
`,e.jsx(n.h3,{id:"install",children:"Install"}),`
`,e.jsx(n.p,{children:"This package supports various Node.js package managers for flexible installation:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-sh",children:`# Using npm
npm install react-cron-gen

# Using pnpm
pnpm install react-cron-gen

# Using Yarn
yarn add react-cron-gen
`})}),`
`,e.jsx(n.p,{children:"@radix-ui/react-select is needed to render UI from CronGen component."}),`
`,e.jsx(n.h3,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["Once installed, you can import and use the ",e.jsx(n.code,{children:"useCronGen"})," hook or ",e.jsx(n.code,{children:"CronGen"})," component in your React application:"]}),`
`,e.jsx(n.h3,{id:"usecrongen-hook",children:"useCronGen hook"}),`
`,e.jsx(n.p,{children:"It provides methods to set singular fields, format cron expression and i18n objects to use in your own UI."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { useCronGen } from 'react-cron-gen';

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
`})}),`
`,e.jsx(n.h3,{id:"crongen-component",children:"CronGen component"}),`
`,e.jsx(n.p,{children:"It provides a production ready UI component. You could customize fields using css just by referencing classes in your CSS File."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.react-cron-gen__select-trigger,
.react-cron-gen__select-content,
.react-cron-gen__select-item,
.react-cron-gen__input {
    #CSS properties
}
`})}),`
`,e.jsxs(n.p,{children:["Or by passing your custom classes to ",e.jsx(n.strong,{children:"classes"})," object. You can make use of tailwind classes too like:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`classes: {
  select: {
    trigger: "h-10 bg-gray-500 etc";
  }
}
`})}),`
`,e.jsx(n.p,{children:"Or even if you want use the default style you should import css file from react-cron-gen"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import "react-cron-gen/dist/styles.css";
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<CronGen
  locale="pt-BR"
  type="unix"
  onChangeValue={(values) => console.log(values)}
/>
`})}),`
`,e.jsx(n.h3,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"CronGen"})," component accepts the following props:"]}),`
`,e.jsxs(n.p,{children:[`| Prop            | Type                                | Required | Description                                                   | Default   |
| :-------------- | :---------------------------------- | :------- | :------------------------------------------------------------ | :-------- |
| `,e.jsx(n.code,{children:"classes"}),"       | ",e.jsx(n.code,{children:"object"}),"                            | No       | CSS classes for styling various parts of the component.       | ",e.jsx(n.code,{children:"{}"}),`      |
| `,e.jsx(n.code,{children:"locale"}),"        | ",e.jsx(n.code,{children:"'pt-BR' \\| 'en-US'"}),"                | No       | Sets the language for the component (e.g., 'en-US', 'pt-BR'). | ",e.jsx(n.code,{children:"'en-US'"}),` |
| `,e.jsx(n.code,{children:"type"}),"          | ",e.jsx(n.code,{children:"'unix' \\| 'quartz'"}),"                | No       | Specifies the type of cron expression to generate.            | ",e.jsx(n.code,{children:"'unix'"}),`  |
| `,e.jsx(n.code,{children:"onChangeValue"})," | ",e.jsx(n.code,{children:"(values: UseCronGenState) => void"})," | Yes      | Callback function triggered when the cron expression changes. | ",e.jsx(n.code,{children:"(N/A)"}),"   |"]}),`
`,e.jsx(n.h2,{id:"license",children:"License"}),`
`,e.jsxs(n.p,{children:["This project is licensed under the MIT License - see the ",e.jsx(n.a,{href:"LICENSE",children:"LICENSE"})," file for details."]})]})}function l(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{l as default};
