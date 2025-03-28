# Form Radio

> For cross browser consistency, `<b-form-radio-group>` and `<b-form-radio>` uses Bootstrap's custom
> radio input to replace the browser default radio input. It is built on top of semantic and
> accessible markup, so it is a solid replacement for the default radio input.

## Individual radios

<ClientOnly>
  <b-card>
    <div class="my-2">
      <label>Individual radios</label>
    </div>
    <div>
      <b-form-radio v-model="individualSelected" name="some-radios" value="A">Option A</b-form-radio>
      <b-form-radio v-model="individualSelected" name="some-radios" value="B">Option B</b-form-radio>
    </div>
    <div class="mt-3">Selected: <strong>{{ individualSelected }}</strong></div>
  </b-card>
</ClientOnly>

```html
<template>
  <div class="my-2">
    <label>Individual radios</label>
  </div>
  <div>
    <b-form-radio v-model="individualSelected" name="some-radios" value="A">Option A </b-form-radio>
    <b-form-radio v-model="individualSelected" name="some-radios" value="B">Option B </b-form-radio>
  </div>
  <div class="mt-3">Selected: <strong>{{ individualSelected }}</strong></div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const individualSelected = ref()
</script>
```

## Grouped radios

The individual radio inputs in `<b-form-radio-group>` can be specified via the `options` prop, or
via manual placement of the `<b-form-radio>` sub-component. When using manually placed
`<b-form-radio>` components within a `<b-form-radio-group>`, they will inherit most props and the
v-model from the `<b-form-radio-group>`.

<ClientOnly>
  <b-card>
    <div class="my-2">
      <label>Radios using options</label>
    </div>
    <div>
        <b-form-radio-group id="radio-group-1" v-model="groupedSelected" :options="groupedOptions" name="radio-options"></b-form-radio-group>
    </div>
    <div class="my-2">
      <label>Radios using sub-components</label>
    </div>
    <div>
      <b-form-radio-group id="radio-group-2" v-model="groupedSelected" name="radio-sub-component">
        <b-form-radio value="first">Toggle this custom radio</b-form-radio>
        <b-form-radio value="second">Or toggle this other custom radio</b-form-radio>
        <b-form-radio value="third" disabled>This one is Disabled</b-form-radio>
        <b-form-radio :value="{ fourth: 4 }">This is the 4th radio</b-form-radio>
      </b-form-radio-group>   
    </div>
    <div class="mt-3">Selected: <strong>{{ groupedSelected }}</strong></div>
  </b-card>
</ClientOnly>

```html
<template>
  <div class="my-2">
    <label>Radios using options</label>
  </div>
  <div>
    <b-form-radio-group
      id="radio-group-1"
      v-model="groupedSelected"
      :options="groupedOptions"
      name="radio-options"
    ></b-form-radio-group>
  </div>
  <div class="my-2">
    <label>Radios using sub-components</label>
  </div>
  <div>
    <b-form-radio-group id="radio-group-2" v-model="groupedSelected" name="radio-sub-component">
      <b-form-radio value="first">Toggle this custom radio</b-form-radio>
      <b-form-radio value="second">Or toggle this other custom radio</b-form-radio>
      <b-form-radio value="third" disabled>This one is Disabled</b-form-radio>
      <b-form-radio :value="{ fourth: 4 }">This is the 4th radio</b-form-radio>
    </b-form-radio-group>
  </div>
  <div class="mt-3">Selected: <strong>{{ groupedSelected }}</strong></div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const groupedSelected = ref()
  const groupedOptions = [
    {text: 'Toggle this custom radio', value: 'first'},
    {text: 'Or toggle this other custom radio', value: 'second'},
    {text: 'This one is Disabled', value: 'third', disabled: true},
    {text: 'This is the 4th radio', value: {fourth: 4}},
  ]
</script>
```

Feel free to mix and match `options` prop and `<b-form-radio>` in `<b-form-radio-group>`. Manually
placed `<b-form-radio>` inputs will appear _below_ any radio inputs generated by the `options` prop.
To have them appear _above_ the inputs generated by `options`, place them in the named slot `first`.

<ClientOnly>
  <b-card>
    <div class="my-2">
      <label>Radios using options and slots</label>
    </div>
    <div>
        <b-form-radio-group id="radio-slots" v-model="mixedGroupedSelected" :options="mixedGroupedOptions" name="radio-options-slots">
          <template #first>
            <b-form-radio value="first">Toggle this custom radio from slot first</b-form-radio>
          </template>
          <b-form-radio :value="{ fourth: 4 }">This is the 4th radio</b-form-radio>
          <b-form-radio value="fifth">This is the 5th radio</b-form-radio>
        </b-form-radio-group>
    </div>
    <div class="mt-3">Selected: <strong>{{ mixedGroupedSelected }}</strong></div>
  </b-card>
</ClientOnly>

```html
<template>
  <div class="my-2">
    <label>Radios using options and slots</label>
  </div>
  <div>
    <b-form-radio-group
      id="radio-slots"
      v-model="mixedGroupedSelected"
      :options="mixedGroupedOptions"
      name="radio-options-slots"
    >
      <template #first>
        <b-form-radio value="first">Toggle this custom radio from slot first</b-form-radio>
      </template>
      <b-form-radio :value="{ fourth: 4 }">This is the 4th radio</b-form-radio>
      <b-form-radio value="fifth">This is the 5th radio</b-form-radio>
    </b-form-radio-group>
  </div>
  <div class="mt-3">Selected: <strong>{{ mixedGroupedSelected }}</strong></div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const mixedGroupedSelected = ref()
  const mixedGroupedOptions = [
    {text: 'Or toggle this other custom radio', value: 'second'},
    {text: 'Third radio', value: 'third'},
  ]
</script>
```

## Radio group options array

`options` can be an array of strings or objects. Available fields:

- **`value`** The selected value which will be set on `v-model`
- **`disabled`** Disables item for selection
- **`text`** Display text, or **`html`** Display basic inline html

`value` can be a string, number, or simple object. Avoid using complex types in values.

If both `html` and `text` are provided, `html` will take precedence. Only basic/native HTML is
supported in the `html` field (components will not work). Note that not all browsers will render
inline html (i.e. `<i>`, `<strong>`, etc.) inside `<option>` elements of a `<select>`.

<p class="alert alert-danger">
  <strong>Be cautious</strong> of placing user supplied content in the <code>html</code> field,
  as it may make you vulnerable to
  <a class="alert-link" href="https://en.wikipedia.org/wiki/Cross-site_scripting">
  <abbr title="Cross Site Scripting Attacks">XSS attacks</abbr></a>, if you do not first
  <a class="alert-link" href="https://en.wikipedia.org/wiki/HTML_sanitization">sanitize</a> the
  user supplied string.
</p>

```js
const options = ['A', 'B', 'C', {text: 'D', value: {d: 1}, disabled: true}, 'E', 'F']
```

If an array entry is a string, it will be used for both the generated `value` and `text` fields.

You can mix using strings and [objects](#options-as-an-array-of-objects) in the array.

Internally, Bootstrap-Vue-3 will convert the above array to the following array (the
[array of objects](#options-as-an-array-of-objects)) format:

```js
const options = [
  {text: 'A', value: 'A', disabled: false},
  {text: 'B', value: 'B', disabled: false},
  {text: 'C', value: 'C', disabled: false},
  {text: 'D', value: {d: 1}, disabled: true},
  {text: 'E', value: 'E', disabled: false},
  {text: 'F', value: 'F', disabled: false},
]
```

### Options as an array of objects

```js
const options = [
  {text: 'Item 1', value: 'first'},
  {text: 'Item 2', value: 'second'},
  {html: '<b>Item</b> 3', value: 'third', disabled: true},
  {text: 'Item 4'},
  {text: 'Item 5', value: {foo: 'bar', baz: true}},
]
```

If `value` is missing, then `text` will be used as both the `value` and `text` fields. If you use
the `html` property, you **must** supply a `value` property.

Internally, BootstrapVue will convert the above array to the following array (the
[array of objects](#options-as-an-array-of-objects)) format:

```js
const options = [
  {text: 'Item 1', value: 'first', disabled: false},
  {text: 'Item 2', value: 'second', disabled: false},
  {html: '<b>Item</b> 3', value: 'third', disabled: true},
  {text: 'Item 4', value: 'Item 4', disabled: false},
  {text: 'Item 5', value: 'E', disabled: false},
]
```

### Changing the option field names

If you want to customize the field property names (for example using `name` field for display
`text`) you can easily change them by setting the `text-field`, `html-field`, `value-field`, and
`disabled-field` props to a string that contains the property name you would like to use:

<ClientOnly>
  <b-card>
    <div>
      <b-form-radio-group 
        v-model="customFieldNameSelected" 
        :options="customFieldNameOptions" 
        class="mb-3" 
        value-field="item" 
        text-field="name" 
        disabled-field="notEnabled">
      </b-form-radio-group>
    </div>
    <div class="mt-3">Selected: <strong>{{ customFieldNameSelected }}</strong></div>
  </b-card>
</ClientOnly>

```html
<template>
  <div>
    <b-form-radio-group
      v-model="customFieldNameSelected"
      :options="customFieldNameOptions"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-radio-group>
  </div>
  <div class="mt-3">Selected: <strong>{{ customFieldNameSelected }}</strong></div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const mixedGroupedSelected = ref()
  const mixedGroupedOptions = [
    {text: 'Or toggle this other custom radio', value: 'second'},
    {text: 'Third radio', value: 'third'},
  ]
</script>
```

## Radio value and v-model

`<b-form-radio>` components do not have a value by default. You must explicitly supply a value via
the `value` prop on `<b-form-radio>`. This value will be sent to the `v-model` when the radio is
checked.

The `v-model` of both `<b-form-radio>` and `<b-form-radio-group>` binds to the default `modelValue` prop. To
pre-check a radio, you must set the `v-model` value to the one of the radio's value (i.e. must match
the value of specified on one of the radio's `value` prop). Each radio in a radio group _must_ have a unique value.

Radios support values of many types, such as a `string`, `boolean`, `number`, or a plain `object`.

## Inline or stacked radios

By default, `<b-form-radio-group>` generates inline radio inputs, while `<b-form-radio>` generates
stacked radios. Set the prop `stacked` on `<b-form-radio-group>` to make the radios appear one over
the other, or when using radios not in a group, set the `inline` prop on `b-form-radio` to true to
render them inline.

<ClientOnly>
  <b-card>
    <div class="my-2">
        <label>Inline radios (default)</label>
    </div>
    <div>
      <b-form-radio-group v-model="inlineStackedSelected" :options="inlineStackedOptions" name="radio-inline"></b-form-radio-group>
    </div>
    <div class="my-2">
        <label>Stacked radios</label>
    </div>
    <div>
      <b-form-radio-group v-model="inlineStackedSelected" :options="inlineStackedOptions" name="radio-stacked" stacked></b-form-radio-group>
    </div>
    <div class="mt-3">Selected: <strong>{{ inlineStackedSelected }}</strong></div>
  </b-card>
</ClientOnly>

```html
<template>
  <div class="my-2">
    <label>Inline radios (default)</label>
  </div>
  <div>
    <b-form-radio-group
      v-model="inlineStackedSelected"
      :options="inlineStackedOptions"
      name="radio-inline"
    ></b-form-radio-group>
  </div>
  <div class="my-2">
    <label>Stacked radios</label>
  </div>
  <div>
    <b-form-radio-group
      v-model="inlineStackedSelected"
      :options="inlineStackedOptions"
      name="radio-stacked"
      stacked
    ></b-form-radio-group>
  </div>
  <div class="mt-3">Selected: <strong>{{ inlineStackedSelected }}</strong></div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const inlineStackedSelected = ref()
  const inlineStackedOptions = [
    {text: 'First radio', value: 'first'},
    {text: 'Second radio', value: 'second'},
    {text: 'Third radio', value: 'third'},
  ]
</script>
```

## Control sizing

Use the `size` prop to control the size of the radio. The default size is medium. Supported size
values are `sm` (small) and `lg` (large).

<ClientOnly>
  <b-card>
    <b-form-radio name="radio-size" size="sm">Small</b-form-radio>
    <b-form-radio name="radio-size">Default</b-form-radio>
    <b-form-radio name="radio-size" size="lg">Large</b-form-radio>
  </b-card>
</ClientOnly>

```html
<template>
  <b-form-radio name="radio-size" size="sm">Small</b-form-radio>
  <b-form-radio name="radio-size">Default</b-form-radio>
  <b-form-radio name="radio-size" size="lg">Large</b-form-radio>
</template>
```

Sizes can be set on individual `<b-form-radio>` components, or inherited from the `size` setting of
`<b-form-radio-group>`.

**Note:** Bootstrap v5.x does not natively support sizes for the custom radio control. However,
Bootstrap-Vue-3 includes custom SCSS/CSS that adds support for sizing the custom radios.

## Button style radios

Render radios with the look of buttons by setting the prop `buttons` to `true` on
`<b-form-radio-group>`. Set the button variant by setting the `button-variant` prop to one of the
standard Bootstrap button variants (see [`<b-button>`](/docs/components/button) for supported
variants). The default `button-variant` is `secondary`.

The `buttons` prop has precedence over `plain`, and `button-variant` has no effect if `buttons` is
not set.

Button style radios will have the class `.active` automatically applied to their label when they are
in the checked state.

<ClientOnly>
  <b-card>
    <div class="my-2">
        <label>Button style radios</label>
    </div>
    <div>
      <b-form-radio-group v-model="buttonsSelected" :options="buttonsOptions" name="radios-btn-default" buttons></b-form-radio-group>
    </div>
    <div class="my-2">
        <label>Button style radios with outline-primary variant and size lg</label>
    </div>
    <div>
      <b-form-radio-group 
        v-model="buttonsSelected" 
        :options="buttonsOptions" 
        button-variant="outline-primary"
        size="lg"
        name="radios-btn-outline"
        buttons
      ></b-form-radio-group>
    </div>
    <div class="my-2">
        <label>Stacked button style radios</label>
    </div>
    <div>
      <b-form-radio-group 
        v-model="buttonsSelected" 
        :options="buttonsOptions" 
        name="radios-btn-stacked"
        buttons
        stacked
      ></b-form-radio-group>
    </div>
    <div class="mt-3">Selected: <strong>{{ buttonsSelected }}</strong></div>
  </b-card>
</ClientOnly>

```html
<template>
  <div class="my-2">
    <label>Button style radios</label>
  </div>
  <div>
    <b-form-radio-group
      v-model="buttonsSelected"
      :options="buttonsOptions"
      name="radios-btn-default"
      buttons
    ></b-form-radio-group>
  </div>
  <div class="my-2">
    <label>Button style radios with outline-primary variant and size lg</label>
  </div>
  <div>
    <b-form-radio-group
      v-model="buttonsSelected"
      :options="buttonsOptions"
      button-variant="outline-primary"
      size="lg"
      name="radios-btn-outline"
      buttons
    ></b-form-radio-group>
  </div>
  <div class="my-2">
    <label>Stacked button style radios</label>
  </div>
  <div>
    <b-form-radio-group
      v-model="buttonsSelected"
      :options="buttonsOptions"
      name="radios-btn-stacked"
      buttons
      stacked
    ></b-form-radio-group>
  </div>
  <div class="mt-3">Selected: <strong>{{ buttonsSelected }}</strong></div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const buttonsSelected = ref()
  const buttonsOptions = [
    {text: 'Radio 1', value: 'radio1'},
    {text: 'Radio 3', value: 'radio2'},
    {text: 'Radio 3 (disabled)', value: 'radio3', disabled: true},
    {text: 'Radio 4', value: 'radio4'},
  ]
</script>
```

## Non-custom style radio inputs (plain)

You can have `<b-form-radio>` and `<b-form-radio-group>` render a browser native-styled radio input
by setting the `plain` prop.

<ClientOnly>
  <b-card>
    <div class="my-2">
        <label>Plain inline radios</label>
    </div>
    <div>
      <b-form-radio-group v-model="plainSelected" :options="plainOptions" name="plain-inline" plain></b-form-radio-group>
    </div>
    <div class="my-2">
        <label>Plain stacked radios</label>
    </div>
    <div>
      <b-form-radio-group v-model="plainSelected" :options="plainOptions" name="plain-stacked" plain></b-form-radio-group>
    </div>
    <div class="mt-3">Selected: <strong>{{ plainSelected }}</strong></div>
  </b-card>
</ClientOnly>

```html
<template>
  <div class="my-2">
    <label>Plain inline radios</label>
  </div>
  <div>
    <b-form-radio-group
      v-model="plainSelected"
      :options="plainOptions"
      name="plain-inline"
      plain
    ></b-form-radio-group>
  </div>
  <div class="my-2">
    <label>Plain stacked radios</label>
  </div>
  <div>
    <b-form-radio-group
      v-model="plainSelected"
      :options="plainOptions"
      name="plain-stacked"
      plain
    ></b-form-radio-group>
  </div>
  <div class="mt-3">Selected: <strong>{{ plainSelected }}</strong></div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const plainSelected = ref()
  const plainOptions = [
    {text: 'First radio', value: 'first'},
    {text: 'Second radio', value: 'second'},
    {text: 'Third radio', value: 'third'},
  ]
</script>
```

**Note:** `plain` will have no effect if `buttons`/`button` is set.

## Required constraint

When using individual `<b-form-radio>` components (not in a `<b-form-radio-group>`), and you want
the radio(s) to be `required` in your form, you **must** provide a `name` on each `<b-form-radio>`
in order for the required constraint to work. All `<b-form-radio>` components tied to the same
`v-model` **must** have the same `name`.

The `name` is required in order for Assistive Technologies (such as screen readers, and keyboard
only users) to know which radios belong to the same form variable (the name also automatically
enables native browser keyboard navigation), hence `required` will only work if `name` is set.
`<b-form-radio-group>` will automatically generate a unique input name if one is not provided on the
group.

## Autofocus

When the `autofocus` prop is set on `<b-form-radio>`, the input will be auto-focused when it is
inserted (i.e. **mounted**) into the document or re-activated when inside a Vue `<keep-alive>`
component. Note that this prop **does not** set the `autofocus` attribute on the input, nor can it
tell when the input becomes visible.

## Contextual states

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

- `false` (denotes invalid state) is great for when there's a blocking or required field. A user
  must fill in this field properly to submit the form.
- `true` (denotes valid state) is ideal for situations when you have per-field validation throughout
  a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `<b-form-radio>`, set the `state` prop to `false` (for
invalid), `true` (for valid), or `null` (no validation state).

**Note:** Contextual state is not supported for radios rendered in buttons mode.

### Contextual state with feedback example

<ClientOnly>
  <b-card>
    <b-form-radio-group 
      v-model="contextualSelected" 
      :options="contextualOptions" 
      :state="contextualState" 
      name="radio-validation"
    ></b-form-radio-group>
    <div class="text-danger" v-if="!contextualState">Please select one</div>
    <div class="text-success" v-if="contextualState">Thank you</div>
  </b-card>
</ClientOnly>

```html
<template>
  <b-form-radio-group
    v-model="contextualSelected"
    :options="contextualOptions"
    :state="contextualState"
    name="radio-validation"
  ></b-form-radio-group>
  <div class="text-danger" v-if="!contextualState">Please select one</div>
  <div class="text-success" v-if="contextualState">Thank you</div>
</template>

<script lang="ts" setup>
  import {ref, computed} from 'vue'

  const contextualState = computed(() => contextualSelected.value)
  const contextualSelected = ref()
  const contextualOptions = [
    {text: 'First radio', value: 'first'},
    {text: 'Second radio', value: 'second'},
    {text: 'Third radio', value: 'third'},
  ]
</script>
```

### Conveying contextual validation state to assistive technologies and colorblind users

Using these contextual states to denote the state of a form control only provides a visual,
color-based indication, which will not be conveyed to users of assistive technologies - such as
screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a
hint about state in the form control's `<label>` text itself, or by providing an additional help
text block (i.e. `<b-form-invalid-feedback>`). Specifically for assistive technologies, invalid form
controls can also be assigned an `aria-invalid="true"` attribute (see below).

### ARIA `aria-invalid` attribute

When `<b-form-radio-group>` has an invalid contextual state (i.e. state = `false`) you may also want
to set the `<b-form-radio-group>` prop `aria-invalid` to `true`.

Supported `aria-invalid` values are:

- `false` (default) No errors detected
- `true` The value has failed validation.

`aria-invalid` is automatically set to `true` if the `state` prop is `false`.

## Component reference

### `<b-form-radio-group>`

#### Properties

| Property                                                                                                     | Type                    | Default     | Description                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------ | ----------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-invalid`                                                                                               | `Boolean` or `String`   | `false`     | Sets the 'aria-invalid' attribute value on the wrapper element. When not provided, the 'state' prop will control the attribute                                            |
| `autofocus`                                                                                                  | `Boolean`               | `false`     | When set to `true`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the `autofocus` attribute on the control    |
| `button-variant`                                                                                             | `String`                | `secondary` | Specifies the Bootstrap contextual color theme variant the apply to the button style radios' mode                                                                         |
| `buttons`                                                                                                    | `Boolean`               | `false`     | When set, renders the radios in this group with button styling                                                                                                            |
| `disabled`                                                                                                   | `Boolean`               | `false`     | When set to `true`, disables the component's functionality and places it in a disabled state                                                                              |
| `disabled-field`                                                                                             | `String`                | `disabled`  | Field name in the `options` array that should be used for the disabled state                                                                                              |
| `form`                                                                                                       | `String`                |             | Id of the form that the form control belongs to. Sets the `form` attribute on the control                                                                                 |
| `html-field` <span class="bg-warning text-black fw-bold" style="white-space:nowrap;">Use with caution</span> | `String`                | `html`      | Field name in the `options` array that should be used for the html label instead of text field                                                                            |
| `id`                                                                                                         | `String`                |             | Used to set the `id` attribute on the rendered content, and used as the base to generate any additional element Ids as needed. When not set, an autogenerated id is used. |
| `name`                                                                                                       | `String`                |             | Sets the value of the `name` attribute of the form control                                                                                                                |
| `options`                                                                                                    | `Array` or ~~`Object`~~ | `false`     | Array of items to render in the component styling                                                                                                                         |
| `plain`                                                                                                      | `Boolean`               | `false`     | Renders the form control in plain mode, rather than custom styled mode                                                                                                    |
| `required`                                                                                                   | `Boolean`               |             | Adds the `required` attribute to the form control when `name` is also filled in.                                                                                          |
| `size`                                                                                                       | `String`                | `md`        | Set the size of the component's appearance. 'sm', 'md' (default), or 'lg'                                                                                                 |
| `stacked`                                                                                                    | `Boolean`               | `false`     | When set, renders the radio group in stacked mode                                                                                                                         |
| `state`                                                                                                      | `Boolean`               | `null`      | Controls the validation state appearance of the component. `true` for valid, `false` for invalid, or `null` for no validation state                                       |
| `text-field`                                                                                                 | `String`                | `text`      | Field name in the `options` array that should be used for the text label                                                                                                  |
| `validated`                                                                                                  | `Boolean`               | `false`     | When set, adds the Bootstrap class 'was-validated' to the group wrapper                                                                                                   |
| `value-field`                                                                                                | `String`                | `value`     | Field name in the `options` array that should be used for the value                                                                                                       |

<p class="alert alert-warning">
  <strong>Caution:</strong> Props that support HTML strings (<code>*-html</code>) can be vulnerable to
  <a class="alert-link" href="https://en.wikipedia.org/wiki/Cross-site_scripting">
  <abbr title="Cross Site Scripting Attacks">XSS attacks</abbr></a>when passed raw user supplied values. You must properly 
  <a class="alert-link" href="https://en.wikipedia.org/wiki/HTML_sanitization">sanitize</a> the user input first!
</p>

#### v-model

| Property           | Type                                              | Default | Description                      |
| ------------------ | ------------------------------------------------- | ------- | -------------------------------- |
| default modelValue | `Boolean`, `String`, `Number`, `Array`or `Object` | `''`    | The value of the selected radio. |

#### Slots

| Name      | Description                                                                                |
| --------- | ------------------------------------------------------------------------------------------ |
| `default` | Content (form radios) to place in the form radio group                                     |
| `first`   | Slot to place b-form-radio's so that they appear before radios generated from options prop |

#### Events

| Name                | Argument                                     | Description                                  |
| ------------------- | -------------------------------------------- | -------------------------------------------- |
| `update:modelValue` | `checked` - Value of current selected radio. | Emitted when the modelValue value is changed |

### `<b-form-radio>`

#### Properties

| Property                                                  | Type                                   | Default     | Description                                                                                                                                                               |
| --------------------------------------------------------- | -------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label`                                              | `String`                               |             | Sets the value of `aria-label` attribute on the rendered element                                                                                                          |
| `aria-labeledby`                                          | `String`                               |             | The Id of the element that provides a label for this component. Used as the value for the `aria-labelledby` attribute                                                     |
| `autofocus`                                               | `Boolean`                              | `false`     | When set to `true`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the `autofocus` attribute on the control    |
| `button`                                                  | `Boolean`                              | `false`     | When set, renders the radio with the appearance of a button                                                                                                               |
| <span style="white-space:nowrap;">`button-variant`</span> | `String`                               | `secondary` | Applies one of Bootstrap's theme colors when in 'button' mode                                                                                                             |
| `disabled`                                                | `Boolean`                              | `false`     | When set to `true`, disables the component's functionality and places it in a disabled state                                                                              |
| `form`                                                    | `String`                               |             | Id of the form that the form control belongs to. Sets the `form` attribute on the control                                                                                 |
| `id`                                                      | `String`                               |             | Used to set the `id` attribute on the rendered content, and used as the base to generate any additional element Ids as needed. When not set, an autogenerated id is used. |
| `inline`                                                  | `Boolean`                              | `false`     | When set, renders the checkbox as an inline element rather than as a 100% width block                                                                                     |
| `name`                                                    | `String`                               |             | Sets the value of the `name` attribute on the form control                                                                                                                |
| `plain`                                                   | `Boolean`                              | `false`     | Renders the form control in plain mode, rather than custom styled mode                                                                                                    |
| `required`                                                | `Boolean`                              |             | Adds the `required` attribute to the form control when `name` is also filled in.                                                                                          |
| `size`                                                    | `String`                               | `md`        | Set the size of the component's appearance. 'sm', 'md' (default), or 'lg'                                                                                                 |
| `state`                                                   | `Boolean`                              |             | Controls the validation state appearance of the component. `true` for valid, `false` for invalid, or `null` for no validation state                                       |
| `value`                                                   | `String`,`Boolean`, `Object`, `Number` | `false`     | Value returned when this radio is checked.                                                                                                                                |

#### v-model

| Property           | Type                             | Default | Description             |
| ------------------ | -------------------------------- | ------- | ----------------------- |
| default modelValue | `Boolean, String, Number, Array` | `null`  | The value of the radio. |

#### Slots

| Name      | Description                        |
| --------- | ---------------------------------- |
| `default` | Content to place in the form radio |

#### Events

| Name     | Argument                                        | Description                                                    |
| -------- | ----------------------------------------------- | -------------------------------------------------------------- |
| `change` | `checked` - Current selected Value of the radio | Emitted when selected value is changed due to user interaction |
| `input`  | `checked` - Current selected Value of the radio | Emitted when selected value is changed                         |

<ClientOnly>

<script lang="ts" setup>
  
  import {ref, computed} from 'vue'

  const individualSelected = ref()
  const groupedSelected = ref()
  const groupedOptions = [
    {text: 'Toggle this custom radio', value: 'first'},
    {text: 'Or toggle this other custom radio', value: 'second'},
    {text: 'This one is Disabled', value: 'third', disabled: true},
    {text: 'This is the 4th radio', value: {fourth: 4}},
  ]
  const mixedGroupedSelected = ref()
  const mixedGroupedOptions = [
    {text: 'Or toggle this other custom radio', value: 'second'},
    {text: 'Third radio', value: 'third'},
  ]
  const customFieldNameSelected = ref()
  const customFieldNameOptions = [
    {item: 'A', name: 'Option A'},
    {item: 'B', name: 'Option B'},
    {item: 'D', name: 'Option C', notEnabled: true},
    {item: {d: 1}, name: 'Option D'},
  ]
  const inlineStackedSelected = ref()
  const inlineStackedOptions = [
    {text: 'First radio', value: 'first'},
    {text: 'Second radio', value: 'second'},
    {text: 'Third radio', value: 'third'},
  ]
  const buttonsSelected = ref()
  const buttonsOptions = [
    { text: 'Radio 1', value: 'radio1' },
    { text: 'Radio 3', value: 'radio2' },
    { text: 'Radio 3 (disabled)', value: 'radio3', disabled: true },
    { text: 'Radio 4', value: 'radio4' }
  ]
  const plainSelected = ref()
  const plainOptions = [
    { text: 'First radio', value: 'first' },
    { text: 'Second radio', value: 'second' },
    { text: 'Third radio', value: 'third' }
  ]
  const contextualState = computed(() => contextualSelected.value)
  const contextualSelected = ref()
  const contextualOptions = [
    { text: 'First radio', value: 'first' },
    { text: 'Second radio', value: 'second' },
    { text: 'Third radio', value: 'third' }
  ]

</script>

</ClientOnly>
