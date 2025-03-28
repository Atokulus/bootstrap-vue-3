# Form Input

> Create various type inputs such as: `text`, `password`, `number`, `url`, `email`, `search`,
> `range`, `date` and more.

<ClientOnly>
  <b-card>
    <b-form-input v-model="selectedText" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ selectedText }}</div>
  </b-card>
</ClientOnly>

```html
<template>
  <b-card>
    <b-form-input v-model="selectedText" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ selectedText }}</div>
  </b-card>
</template>

<script lang="ts" setup>
  import {ref, computed} from 'vue'

  const selectedText = ref('')
</script>
```

## Input type

`<b-form-input>` defaults to a `text` input, but you can set the `type` prop to one of the supported
native browser HTML5 types: `text`, `password`, `email`, `number`, `url`, `tel`, `search`, `date`,
`datetime`, `datetime-local`, `month`, `week`, `time`, `range`, or `color`.

<ClientOnly>
  <b-card>
    <b-row class="my-1" v-for="type in inputTypes" :key="type">
      <b-col sm="3">
        <label :for="`type-${type}`">Type <code>{{ type }}</code>:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
      </b-col>
    </b-row>
  </b-card>
</ClientOnly>

```html
<template>
  <b-card>
    <b-row class="my-1" v-for="type in inputTypes" :key="type">
      <b-col sm="3">
        <label :for="`type-${type}`">Type <code>{{ type }}</code>:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const inputTypes = [
    'text',
    'number',
    'email',
    'password',
    'search',
    'url',
    'tel',
    'date',
    'time',
    'range',
    'color',
  ]
</script>
```

If the `type` prop is set to an input type that is not supported (see above), a `text` input will be
rendered and a console warning will be issued.

**Caveats with input types:**

- Not all browsers support all input types, nor do some types render in the same format across
  browser types/versions. Refer to [Can I use](https://caniuse.com/?search=input).
- Browsers that do not support a particular type will fall back to a `text` input type (even though
  the rendered `type` attribute markup shows the requested type).
- No testing is performed to see if the requested input type is supported by the browser.
- Chrome lost support for `datetime` in version 26, Opera in version 15, and Safari in iOS 7.
  Instead of using `datetime`, since support should be deprecated, use `date` and `time` as two
  separate inputs.
- `date` and `time` inputs are native browser types, and are not a custom date/time picker.
- For date and time style inputs, where supported, the displayed value in the GUI may be different
  from what is returned by its value (i.e. ordering of year-month-date).
- Regardless of input type, the value is **always** returned as a string representation.
- `v-model.lazy` is not supported by `<b-form-input>` (nor any custom Vue component). Use the `lazy`
  prop instead.
- `v-model` modifiers `.number` and `.trim` can cause unexpected cursor jumps when the user is
  typing (this is a Vue issue with `v-model` on custom components). _Avoid using these modifiers_.
  Use the `number` or `trim` props instead.
- Older version of Firefox may not support `readonly` for `range` type inputs.
- Input types that do not support `min`, `max` and `step` (i.e. `text`, `password`, `tel`, `email`,
  `url`, etc.) will silently ignore these values (although they will still be rendered on the input
  markup) if values are provided.

**Caveats with predictive text entry and IME composition entry:**

- When using predictive text auto-suggested words, the `v-model` will not update until the
  auto-suggested word is selected (or a space is typed). If an auto suggested word is not selected,
  the v-model will update with the current _displayed text_ of the input when the input is blurred.
- When using IME composition (ie. Chinese, Japanese, etc.), the `v-model` will not update until the
  IME composition is completed.

### Range type input

Inputs with type `range` render using Bootstrap v5's `.custom-range` class. The track (the
background) and thumb (the value) are both styled to appear the same across browsers.

Range inputs have implicit values for `min` and `max` of `0` and `100` respectively. You may specify
new values for those using the `min` and `max` props.

<ClientOnly>
  <b-card>
    <label for="range-1">Example range with min and max</label>
    <b-form-input id="range-1" v-model="rangeValue" type="range" min="0" max="5"></b-form-input>
    <div class="mt-2">Value: {{ rangeValue }}</div>
  </b-card>
</ClientOnly>

```html
<template>
  <b-card>
    <label for="range-1">Example range with min and max</label>
    <b-form-input id="range-1" v-model="rangeValue" type="range" min="0" max="5"></b-form-input>
    <div class="mt-2">Value: {{ rangeValue }}</div>
  </b-card>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const rangeValue = ref('2')
</script>
```

By default, range inputs "snap" to integer values. To change this, you can specify a `step` value.
In the example below, we double the number of steps by using step="0.5".

<ClientOnly>
  <b-card>
    <label for="range-1">Example range with min and max</label>
    <b-form-input id="range-1" v-model="rangeValueStep" type="range" min="0" max="5" step="0.5"></b-form-input>
    <div class="mt-2">Value: {{ rangeValueStep }}</div>
  </b-card>
</ClientOnly>

```html
<template>
  <b-card>
    <label for="range-1">Example range with min and max</label>
    <b-form-input
      id="range-1"
      v-model="rangeValueStep"
      type="range"
      min="0"
      max="5"
      step="0.5"
    ></b-form-input>
    <div class="mt-2">Value: {{ rangeValueStep }}</div>
  </b-card>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const rangeValueStep = ref('2')
</script>
```

**Note:** Range inputs (as do all input types) return their value as a string. You may need to
convert the value to a native number by using `Number(value)`, `parseInt(value, 10)`,
`parseFloat(value)`, or use the `number` prop.

~~**Note:** Bootstrap v5 CSS does not include styling for range inputs inside input groups, nor
validation styling on range inputs. However, Bootstrap-Vue-3 includes custom styling to handle these
situations until styling is included in Bootstrap v5.~~

## Control sizing

Set heights using the `size` prop to `sm` or `lg` for small or large respectively.

To control width, place the input inside standard Bootstrap grid column.

<ClientOnly>
  <b-card>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-small">Small:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input id="input-small" size="sm" placeholder="Enter your name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-default">Default:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input id="input-default" placeholder="Enter your name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-large">Large:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input id="input-large" size="lg" placeholder="Enter your name"></b-form-input>
      </b-col>
    </b-row>
  </b-card>
</ClientOnly>

```html
<b-card>
  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-small">Small:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-small" size="sm" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>
  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-default">Default:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-default" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>
  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-large">Large:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-large" size="lg" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>
</b-card>
```

~~**Note:** Input type `range` currently does not support control sizing unless it is placed inside a
`<b-input-group>` which has its `size` prop set.~~

**Note:** The native HTML `<input>` attribute `size` (which sets a horizontal width on the `<input>`
in characters) is not supported. Use styling, utility classes, or the layout rows (`<b-row>`) and
columns (`<b-col>`) to set the desired width.

## Contextual states

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

- `false` (denotes invalid state) is great for when there's a blocking or required field. A user
  must fill in this field properly to submit the form.
- `true` (denotes valid state) is ideal for situations when you have per-field validation throughout
  a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `<b-form-input>`, set the `state` prop to `false` (for
invalid), `true` (for valid), or `null` (no validation state).

<ClientOnly>
  <b-card>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-none">No State:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="input-none" :state="null" placeholder="No validation"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-valid">Valid State:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="input-valid" :state="true" placeholder="Valid input"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-invalid">Invalid State:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="input-invalid" :state="false" placeholder="Invalid input"></b-form-input>
      </b-col>
    </b-row>
  </b-card>
</ClientOnly>

```html
<b-card>
  <b-row class="my-1">
    <b-col sm="3">
      <label for="input-none">No State:</label>
    </b-col>
    <b-col sm="9">
      <b-form-input id="input-none" :state="null" placeholder="No validation"></b-form-input>
    </b-col>
  </b-row>
  <b-row class="my-1">
    <b-col sm="3">
      <label for="input-valid">Valid State:</label>
    </b-col>
    <b-col sm="9">
      <b-form-input id="input-valid" :state="true" placeholder="Valid input"></b-form-input>
    </b-col>
  </b-row>
  <b-row class="my-1">
    <b-col sm="3">
      <label for="input-invalid">Invalid State:</label>
    </b-col>
    <b-col sm="9">
      <b-form-input id="input-invalid" :state="false" placeholder="Invalid input"></b-form-input>
    </b-col>
  </b-row>
</b-card>
```

**Live Example**

<ClientOnly>
  <b-card>
    <div role="group">
      <label for="input-live">Name:</label>
      <b-form-input
        id="input-live"
        v-model="lifeName"
        :state="lifeNameState"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Enter your name"
        trim
      ></b-form-input>
      <!-- This will only be shown if the preceding input has an invalid state -->
      <b-form-invalid-feedback id="input-live-feedback">
        Enter at least 3 letters
      </b-form-invalid-feedback>
      <!-- This is a form text block (formerly known as help block) -->
      <b-form-text id="input-live-help">Your full name.</b-form-text>
    </div>
  </b-card>
</ClientOnly>

```html
<template>
  <b-card>
    <div role="group">
      <label for="input-live">Name:</label>
      <b-form-input
        id="input-live"
        v-model="lifeName"
        :state="lifeNameState"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Enter your name"
        trim
      ></b-form-input>
      <!-- This will only be shown if the preceding input has an invalid state -->
      <b-form-invalid-feedback id="input-live-feedback">
        Enter at least 3 letters
      </b-form-invalid-feedback>
      <!-- This is a form text block (formerly known as help block) -->
      <b-form-text id="input-live-help">Your full name.</b-form-text>
    </div>
  </b-card>
</template>

<script lang="ts" setup>
  import {ref, computed} from 'vue'

  const lifeName = ref('')
  const lifeNameState = computed(() => (lifeName.value?.length > 2 ? true : false))
</script>
```

> **Tip:** Use the [`<b-form-group>`](/docs/components/form-group) component to automatically generate markup similar to above.

### Conveying contextual state to assistive technologies and colorblind users

Using these contextual states to denote the state of a form control only provides a visual,
color-based indication, which will not be conveyed to users of assistive technologies - such as
screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a
hint about state in the form control's `<label>` text itself, or by providing an additional help
text block.

### ARIA `aria-invalid` attribute

Specifically for assistive technologies, invalid form controls can also be assigned an
`aria-invalid="true"` attribute.

When `<b-form-input>` has an invalid contextual state (i.e. state is `false`) you may also want to
set the `<b-form-input>` prop `aria-invalid` to `true`, or to one of the supported values:

- `false`: Convey no errors detected (default)
- `true` (or `'true'`): Convey that the value has failed validation.
- `'grammar'` Convey that a grammatical error has been detected.
- `'spelling'` Convey that a spelling error has been detected.

If `aria-invalid` is not explicitly set and `state` is set to `false`, then the `aria-invalid`
attribute on the input will automatically be set to `'true'`;

## Formatter support

`<b-form-input>` optionally supports formatting by passing a function reference to the `formatter`
prop.

Formatting (when a formatter function is supplied) occurs when the control's native `input` and
`change` events fire. You can use the boolean prop `lazy-formatter` to restrict the formatter
function to being called on the control's native `blur` event.

The `formatter` function receives two arguments: the raw `value` of the input element, and the
native `event` object that triggered the format (if available).

The `formatter` function should return the formatted value as a _string_.

Formatting does not occur if a `formatter` is not provided.

<ClientOnly>
  <b-card>
    <div role="group">
      <label for="input-formatter">"Text input with formatter (on input)"</label>
      <b-form-input
        id="input-formatter"
        v-model="formatInputText"
        placeholder="Enter your name"
        :formatter="toLowerCaseFormatter"
      ></b-form-input>
      <p><b>Value:</b> {{ formatInputText }}</p>
    </div>
    <div role="group">
      <label for="input-formatter">"Text input with lazy formatter (on blur)"</label>
      <b-form-input
        id="input-lazy"
        v-model="formatLazyInputText"
        placeholder="Enter your name"
        lazy-formatter
        :formatter="toLowerCaseFormatter"
      ></b-form-input>
      <p><b>Value:</b> {{ formatLazyInputText }}</p>
    </div>
  </b-card>
</ClientOnly>

```html
<template>
  <b-card>
    <div role="group">
      <label for="input-formatter">"Text input with formatter (on input)"</label>
      <b-form-input
        id="input-formatter"
        v-model="formatInputText"
        placeholder="Enter your name"
        :formatter="toLowerCaseFormatter"
      ></b-form-input>
      <p><b>Value:</b> {{ formatInputText }}</p>
    </div>
    <div role="group">
      <label for="input-formatter">"Text input with lazy formatter (on blur)"</label>
      <b-form-input
        id="input-lazy"
        v-model="formatLazyInputText"
        placeholder="Enter your name"
        lazy-formatter
        :formatter="toLowerCaseFormatter"
      ></b-form-input>
      <p><b>Value:</b> {{ formatLazyInputText }}</p>
    </div>
  </b-card>
</template>

<script lang="ts" setup>
  import {ref, computed} from 'vue'

  const formatInputText = ref('')
  const formatLazyInputText = ref('')
  const toLowerCaseFormatter = (value: string) => value.toLowerCase()
</script>
```

**Note:** When using a non-text-like input (i.e. `color`, `range`, `date`, `number`, `email` etc.),
ensure that your formatter function returns the value in the expected format (`date` ->
'2000-06-01', `color` -> '#ff0000', etc.) for the input type. The formatter **must** return the
value as a _string_.

**Note:** With non-lazy formatting, if the cursor is not at the end of the input value, the cursor
may jump to the end _after_ a character is typed. You can use the provided event object and the
`event.target` to access the native input's selection methods and properties to control where the
insertion point is. This is left as an exercise for the reader.

## Readonly plain text

If you want to have `<b-form-input readonly>` elements in your form styled as plain text, set the
`plaintext` prop (no need to set `readonly`) to remove the default form field styling and preserve
the correct margin and padding.

The `plaintext` option is not supported by input types `color` or `range`.

## ~~Disabling mousewheel events on numeric-like inputs~~

## ~~Datalist support~~

## `v-model` modifiers

Vue does not officially support `.lazy`, `.trim`, and `.number` modifiers on the `v-model` of custom
component based inputs, and may generate a bad user experience. Avoid using Vue's native modifiers.

To get around this, `<b-form-input>` has three boolean props `trim`, `number`, and `lazy` which
emulate the native Vue `v-model` modifiers `.trim` and `.number` and `.lazy` respectively. The
`lazy` prop will update the v-model on `change`/`blur`events.

**Notes:**

- The `number` prop takes precedence over the `trim` prop (i.e. `trim` will have no effect when
  `number` is set).
- When using the `number` prop, and if the value can be parsed as a number (via `parseFloat`) it
  will return a value of type `Number` to the `v-model`, otherwise the original input value is
  returned as type `String`. This is the same behaviour as the native `.number` modifier.
- The `trim` and `number` modifier props do not affect the value returned by the `input` or `change`
  events. These events will always return the string value of the content of `<textarea>` after
  optional formatting (which may not match the value returned via the `v-model` `update` event,
  which handles the modifiers).

## ~~Debounce support~~

## Autofocus

When the `autofocus` prop is set, the input will be auto-focused when it is inserted (i.e.
**mounted**) into the document, or re-activated when inside a Vue `<keep-alive>` component. Note
that this prop **does not** set the `autofocus` attribute on the input, nor can it tell when the
input becomes visible.

## Native and custom events

All native events (other than the custom `input` and `change` events) are supported, without the
need for the `.native` modifier.

The custom `input` and `change` events receive a single argument of the current `value` (after any
formatting has been applied), and are triggered by user interaction.

The custom `update` event is passed the input value, and is emitted whenever the `v-model` needs
updating (it is emitted before `input`, `change`. and `blur` as needed).

You can always access the native `input` and `change` events by using the `.native` modifier.

## Exposed input properties and methods

`<b-form-input>` exposes the native input element on the component reference as a reference with name 'input'.
You can use that reference to access the native properties and methods.

### Input properties

| Property              | Notes      |
| --------------------- | ---------- |
| `.selectionStart`     | Read/Write |
| `.selectionEnd`       | Read/Write |
| `.selectionDirection` | Read/Write |
| `.validity`           | Read only  |
| `.validationMessage`  | Read only  |
| `.willValidate`       | Read only  |

### Input methods

| Method                 | Notes                             |
| ---------------------- | --------------------------------- |
| `.focus()`             | Focus the input                   |
| `.blur()`              | Remove focus from the input       |
| `.select()`            | Selects all text within the input |
| `.setSelectionRange()` |                                   |
| `.setRangeText()`      |                                   |
| `.setCustomValidity()` |                                   |
| `.checkValidity()`     |                                   |
| `.reportValidity()`    |                                   |

Refer to [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) for more information on
these methods and properties. Support will vary based on input type.

<ClientOnly>
  <b-card>
    <div role="group">
      <b-form-input
        ref="inputRef"
        v-model="sampleInputText"
        placeholder="Enter your name"
      ></b-form-input>
    </div>
    <div class="mt-2">
        <b-button primary @click="selectAllText">Select all text</b-button>
    </div>
  </b-card>
</ClientOnly>

```html
<template>
  <b-card>
    <div role="group">
      <b-form-input
        ref="inputRef"
        v-model="sampleInputText"
        placeholder="Enter your name"
      ></b-form-input>
    </div>
    <div class="mt-2">
      <b-button primary @click="selectAllText">Select all text</b-button>
    </div>
  </b-card>
</template>

<script lang="ts" setup>
  import {ref, computed} from 'vue'

  // refs are unified in vue3. We need a ref variable with the same as used in the template.
  // The variable will be filled up during mount with the reference to custom component.
  // inputRef will become the reference to the b-form-input component.
  const inputRef = ref(null)
  const sampleInputText = ref('sample text')

  // The inner native input is exposed as ref with name "input"
  const selectAllText = () => inputRef.value.input.select()
</script>
```

## Component reference

### `<b-form-input>`

#### Properties

| Property                                                  | Type                  | Default | Description                                                                                                                                                            |
| --------------------------------------------------------- | --------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-invalid`                                            | `Boolean` or `String` | `false` | Sets the 'aria-invalid' attribute with the specified value                                                                                                             |
| `autocomplete`                                            | `String`              |         | Sets the 'autocomplete' attribute value on the form control                                                                                                            |
| `autofocus`                                               | `Boolean`             | `false` | When set to `true`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the `autofocus` attribute on the control |
| `disabled`                                                | `Boolean`             | `false` | When set to `true`, disables the component's functionality and places it in a disabled state                                                                           |
| `form`                                                    | `String`              |         | Id of the form that the form control belongs to. Sets the `form` attribute on the control                                                                              |
| `formatter`                                               | `Function`            |         | Reference to a function for formatting the input                                                                                                                       |
| `id`                                                      | `String`              |         | Used to set the `id` attribute on the rendered content, and used as the base to generate any additional element Ids as needed                                          |
| `lazy`                                                    | `Boolean`             | `false` | When set, updates the v-model on 'change'/'blur' events instead of 'input'. Emulates the Vue '.lazy' v-model modifier                                                  |
| <span style="white-space:nowrap;">`lazy-formatter`</span> | `Boolean`             | `false` | When set, the input is formatted on blur instead of each keystroke (if there is a formatter specified)                                                                 |
| `list`                                                    | `String`              |         | The Id of the associated datalist element or component                                                                                                                 |
| `max`                                                     | `Number`or `String`   |         | Value to set in the 'max' attribute on the input. Used by number-like inputs                                                                                           |
| `min`                                                     | `Number`or `String`   |         | Value to set in the 'min' attribute on the input. Used by number-like inputs                                                                                           |
| `name`                                                    | `String`              |         | Sets the value of the `name` attribute on the form control                                                                                                             |
| `number`                                                  | `Boolean`             | `false` | When set attempts to convert the input value to a native number. Emulates the Vue '.number' v-model modifier                                                           |
| `placeholder`                                             | `String`              |         | Sets the `placeholder` attribute value on the form control                                                                                                             |
| `plaintext`                                               | `Boolean`             | `false` | Set the form control as readonly and renders the control to look like plain text (no borders)                                                                          |
| `readonly`                                                | `Boolean`             | `false` | Sets the `readonly` attribute on the form control                                                                                                                      |
| `required`                                                | `Boolean`             | `false` | Adds the `required` attribute to the form control                                                                                                                      |
| `size`                                                    | `String`              |         | Set the size of the component's appearance. 'sm', 'md' (default), or 'lg'                                                                                              |
| `state`                                                   | `Boolean`             | `null`  | Controls the validation state appearance of the component. `true` for valid, `false` for invalid, or `null` for no validation state                                    |
| `step`                                                    | `Number`or `String`   |         | Value to set in the 'step' attribute on the input. Used by number-like inputs                                                                                          |
| `trim`                                                    | `Boolean`             | `false` | When set, trims any leading and trailing white space from the input value. Emulates the Vue '.trim' v-model modifier                                                   |
| `type`                                                    | `String`              | `text`  | The type of input to render. See the docs for supported types                                                                                                          |

#### v-model

| Property           | Type                 | Default | Description                                                                                           |
| ------------------ | -------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| default modelValue | `Number` or `String` | `''`    | The current value of the input. Result will always be a string, except when the `number` prop is used |

#### Events

| Name                | Argument                                                                                      | Description                                                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blur`              | `event` - Native blur event (before any formatting)                                           | Emitted after the input looses focus                                                                                                               |
| `change`            | `modelValue` - Current value of input                                                         | Change event triggered by user interaction. Emitted after any formatting (not including 'trim' or 'number' props) and after the v-model is updated |
| `input`             | `modelValue` - Current value of input                                                         | Input event triggered by user interaction. Emitted after any formatting (not including 'trim' or 'number' props) and after the v-model is updated  |
| `update:modelValue` | `modelValue` - Value of input, after any formatting. Not emitted if the value does not change | Emitted to update the v-model                                                                                                                      |

<!-- --------------------------------------------------------------------------------------------- -->

<ClientOnly>

<script lang="ts" setup>
  import {ref, computed} from 'vue'

  const selectedText = ref('')
  const inputTypes = [
          'text',
          'number',
          'email',
          'password',
          'search',
          'url',
          'tel',
          'date',
          'time',
          'range',
          'color',
  ]
  const rangeValue = ref('2')
  const rangeValueStep = ref('2')

  const lifeName = ref('')
  const lifeNameState = computed(() => lifeName.value?.length > 2 ? true: false)

  const formatInputText = ref('')
  const formatLazyInputText = ref('')
  const toLowerCaseFormatter = (value: string) => value.toLowerCase()

  const inputRef = ref(null)
  const sampleInputText = ref('sample text')

  const selectAllText = () => inputRef.value.input.select()
</script>

</ClientOnly>
