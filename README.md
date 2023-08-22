# Alpine Indeterminate

![GitHub release (latest by date)](https://img.shields.io/github/v/release/daronspence/alpine-indeterminate)

A plugin to show and modify [checkbox indeteriminate state](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes) with Alpine.js

## Usage
```html
<div x-data="{
    list: [],
}">
    <input type="checkbox" x-indeterminate="list">

    <input type="checkbox" value="1" x-model="list">
    <input type="checkbox" value="2" x-model="list">
    <input type="checkbox" value="3" x-model="list">
    <input type="checkbox" value="4" x-model="list">
    <input type="checkbox" value="5" x-model="list">
    <input type="checkbox" value="6" x-model="list">
    <input type="checkbox" value="7" x-model="list">
    <input type="checkbox" value="8" x-model="list">
    <input type="checkbox" value="9" x-model="list">
</div>

```

The checkbox with the `x-indeterminate` attribute will be set to indeterminate if any of the checkboxes with the matching `x-model` attribute are checked. When all of the items that could be present in the list are added, then the checkbox will transition to `:checked`.

The value of the `x-indeterminate` attribute is the name of an `x-data` array property to track changes for.

You can also assign `x-model` to a boolean value for the indeterminate element and it will be either true/false depending on the state of the other checkboxes. If you need to programattically select or deselect all checkboxes, you can toggle the boolean value.

> Note: Using `x-model` is not required to use the indeterminate checkbox as a toggle for other checkboxes.

```html
<div x-data="{
    list: [],
    allChecked: false, // optional
}">
    <!-- Toggle `allChecked` to select all values at once programatically. -->
    <input type="checkbox" x-model="allChecked" x-indeterminate="list">

    <input type="checkbox" value="1" x-model="list">
    <input type="checkbox" value="2" x-model="list">
</div>
```

