# Formula Engine

Extendable formula parser and executor.

## Usage

Typical expression may look like this:

```
'the answer is: ' + TO_STRING(POW(2, {var}) + 10)
```

The computed result, given `var = 5` would be a string: `'the answer is: 42'`.

Where `TO_STRING` and `POW` are functions that you provide implementation for.
Also `{var}` is a variable, you should also provide a value resolver for those.

```ts
function resolveReferences(names: string[]): Record<string, any> {
  // your implementation to resolve variables
  return {
    a: 10,
    b: 20,
  };
}

const functions = {
  // your custom functions
  TO_STRING(val) {
    return String(val);
  },
  POW(x, a) {
    return Math.pow(x, a);
  },
};

const engine = new FormulaEngine(resolveReferences, functions);
```

Note: all functions should be provided by the user, nothing is included by default. It is mostly to avoid conflicts and make the library reusable.

## Data types

It supports three types of literals (data types):

- boolean
- number
- string (both single&double quoted)

Currently type checking is not implemented, so the engine is relying on JS type coercion.
Be careful with it, the result may be not always obvious (if you subtract string from a number for example).

## Development

This is very much work in progress, but is is working for the main use cases, so we believe it can be useful already.
