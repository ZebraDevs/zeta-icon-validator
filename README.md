# zeta-icon-validator

A utility used to check the validity of icons before they are uploaded to the Zeta Icon Library.

# Criteria

## Name

Icon names are considered invalid if they

- Start with a number
- Contain a non alpha-numeric character except for spaces, \_, and $
- Are a [Dart reserved word](https://dart.dev/language/keywords)

Icons will be renamed if the name has been used already.

They are renamed by prepending its category name to it.

## Properties

Icons must have a `Style` variant property with `Round` and `Sharp` variants.

## Size

The bound box of all icon variants must be 24x24px.

# Usage

## Validate Icon

This function is the main entry point for checking icon validity.

It accepts a Figma component set object and validates its name, size, and properties.

It returns a list of `ZetaIconError` which contains all the erros with the given icon.

Each error has a severity and a message.

If an icon has been renamed, the error will have a `newName` property containing the icons new name.

```ts
validateIcon(icon: ComponentSetNode): ZetaIconError[]
```

<details>
    <summary>Zebra Repository Information</summary>
    <ul>
        <li> Zebra Business Unit : DMO - I&D Team </li>
        <li> Zebra Manager : mikecoomber </li>
        <li> Zebra Repo Admin: mikecoomber </li>
        <li> Zebra Jira Project ID: N/A  </li>
        <li> Product: zeta-icon-name-checker, zeta-icons</li>
        <li> Topics: zeta-icons, icon library</li>
    </ul>
</details>
