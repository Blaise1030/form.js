# React Forms JS

---

A thin wrapper over React Final Form and Chakra UI to build forms with JSON payload data.

### Motivation

Building forms are annoying. We want to specify payloads and the rest is handled for me. The styles and layouting can all be done easily.

### API

Using the form

```
    <BaseForm
        payload={//Array of json payload here}
        onSubmit={
            (values: {[id:string]: value}) => {
                //Submit code here
            }
        }
    />
```

**IComponent**
the `payload` field above has the datatype of `Array<IComponent>`. The fields of `IComponent` is specified below.

```
export interface IComponent {
        type: string;
        id: string;
        label?: string;
        halfSize?: boolean;
        isReadonly?: boolean;
        description?: string;
        validation?: IValidation;
        defaultValue?: any;
}

```

| Key          | Description                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | Currently `Header`, `radio`,`checkbox`,`text`,`file`,`date`,`select` only, other values will not be rendered unless create componentn plugins for the form |
| id           | The identification value for each fields, cannot be a number in string e.g `'1'`                                                                           |
| halfSize     | Occupies half the width of the form.                                                                                                                       |
| isReadonly   | Specify the field to be readonly                                                                                                                           |
| description  | Description for the field                                                                                                                                  |
| validation   | The key value pairs in `IValidation` default supported only `required : true                                                                               | false` `minLength: number` `eqLength : number` `maxLength : number``regex : 'regex string' | {regex:'regex string', patternName:'eg. email'}` if specify other rules, it will be disregarded unless created validation plugins for the form |
| defaultValue | The default value of the field                                                                                                                             |

### Extensions

Other than default components that we have specified, you can create your own components and validations. Don't like our form components or validation rules, override them.

```
<BaseForm
    componentPlugin={Array<IBaseComponentOutput>};
    validationPlugin={Array<IValidatorOutput<any, any>>};
    payload={//Array of json payload here}
    onSubmit={
            (values: {[id:string]: value}) => {
                //Submit code here
            }
        }
    />

```

#### Create New Component or override

```
export interface IBaseComponentOutput {
  render: React.FC<IBaseComponentProps>;
  type: string;
}

export interface IBaseComponentProps {
  props: FieldRenderProps<any>;
  payload: IComponent;
  id: string;
}
```

Provide the object with the structure of `IBaseComponentOutput` where type is the `type` in `IComponent`, render a React component with `IBaseComponentProps` as props. If you specified `type` as any default keys e.g `'select'`, you will override the default select component and use your own implementation. To use your new component, specify `type` as your new `IBaseComponentOutput` type in the `payload` array. Check [React Final Forms](https://final-form.org/docs/react-final-form/types/FieldRenderProps) for `FieldRenderProps`.

#### Create New Validator or override

```
export interface IValidatorOutput<T, V> {
  validateFunc: (
    inputValue: T,
    ruleValue: V,
    fieldName: string
  ) => void | { [_: string]: string };
  validatorName: string;
  dataType: string[];
}

export interface IValidation {
  [id: string]: boolean | string | object | number;
}
```

Just provide an object with the structure `IValidatorOutput<T, V>` into `validationPlugin` in `BaseForm`. `validatorName` is the key used by `IComponent` in the `validation` field of type `IValidation`. If you specified existing `validatorName`, the default validator will be overridedn. `dataType` is the list of strings of data types of field values where this validator can be applied to.

Let's take the validation in `IComponent` `validation: {'required': true } ` as example.

`validateFunc` takes in 3 fields, `inputValue`, `ruleValue` and `fieldName` and returns `void` or `{[fieldName]: 'Error message'}`. Input value is what the use inputs into the field, `ruleValue` in this case is `true`, `fieldName` is same as `id` in `IComponent`. So you can use these 3 fields to check wheather it passed the validation rule if all good return nothing `void` else return `{[fieldName]: 'Error message'}`

---

### UI elements overrides

--To be continued--
