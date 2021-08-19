# API Reference <a name="API Reference"></a>


## Structs <a name="Structs"></a>

### SbtPlugin <a name="@guardian/projen-scala-sbt.SbtPlugin"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { SbtPlugin } from '@guardian/projen-scala-sbt'

const sbtPlugin: SbtPlugin = { ... }
```

##### `line`<sup>Required</sup> <a name="@guardian/projen-scala-sbt.SbtPlugin.property.line"></a>

- *Type:* `string`

---

### SbtProjectOptions <a name="@guardian/projen-scala-sbt.SbtProjectOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { SbtProjectOptions } from '@guardian/projen-scala-sbt'

const sbtProjectOptions: SbtProjectOptions = { ... }
```

##### `name`<sup>Required</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.name"></a>

- *Type:* `string`
- *Default:* $BASEDIR

This is the name of your project.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.autoApproveOptions"></a>

- *Type:* [`projen.github.AutoApproveOptions`](#projen.github.AutoApproveOptions)
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.autoMergeOptions"></a>

- *Type:* [`projen.github.AutoMergeOptions`](#projen.github.AutoMergeOptions)
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` is set to false.

---

##### `clobber`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.clobber"></a>

- *Type:* `boolean`
- *Default:* true

Add a `clobber` task which resets the repo to origin.

---

##### `devContainer`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.devContainer"></a>

- *Type:* `boolean`
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `github`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.github"></a>

- *Type:* `boolean`
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.githubOptions"></a>

- *Type:* [`projen.github.GitHubOptions`](#projen.github.GitHubOptions)
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitpod`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.gitpod"></a>

- *Type:* `boolean`
- *Default:* false

Add a Gitpod development environment.

---

##### `logging`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.logging"></a>

- *Type:* [`projen.LoggerOptions`](#projen.LoggerOptions)
- *Default:* {}

Configure logging options such as verbosity.

---

##### ~~`mergify`~~<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.mergify"></a>

- *Deprecated:* use `githubOptions.mergify` instead

- *Type:* `boolean`
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### `outdir`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.outdir"></a>

- *Type:* `string`
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
sub-projects.

---

##### `parent`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.parent"></a>

- *Type:* [`projen.Project`](#projen.Project)

The parent project, if this project is part of a bigger project.

---

##### `projectType`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.projectType"></a>

- *Type:* [`projen.ProjectType`](#projen.ProjectType)
- *Default:* ProjectType.UNKNOWN

Which type of project this is (library/app).

---

##### `readme`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.readme"></a>

- *Type:* [`projen.SampleReadmeProps`](#projen.SampleReadmeProps)
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

##### `stale`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.stale"></a>

- *Type:* `boolean`
- *Default:* true

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.staleOptions"></a>

- *Type:* [`projen.github.StaleOptions`](#projen.github.StaleOptions)
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `vscode`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.vscode"></a>

- *Type:* `boolean`
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `projectVersion`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.projectVersion"></a>

- *Type:* `string`

---

##### `projenrcJs`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.projenrcJs"></a>

- *Type:* `boolean`

---

##### `projenrcJsOptions`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.projenrcJsOptions"></a>

- *Type:* [`projen.javascript.ProjenrcOptions`](#projen.javascript.ProjenrcOptions)

---

##### `sbtPlugins`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.sbtPlugins"></a>

- *Type:* [`@guardian/projen-scala-sbt.SbtPlugin`](#@guardian/projen-scala-sbt.SbtPlugin)[]

---

##### `sbtVersion`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.sbtVersion"></a>

- *Type:* `string`

---

##### `scalaVersion`<sup>Optional</sup> <a name="@guardian/projen-scala-sbt.SbtProjectOptions.property.scalaVersion"></a>

- *Type:* `string`

---

## Classes <a name="Classes"></a>

### SbtProject <a name="@guardian/projen-scala-sbt.SbtProject"></a>

#### Initializer <a name="@guardian/projen-scala-sbt.SbtProject.Initializer"></a>

```typescript
import { SbtProject } from '@guardian/projen-scala-sbt'

new SbtProject(options: SbtProjectOptions)
```

##### `options`<sup>Required</sup> <a name="@guardian/projen-scala-sbt.SbtProject.parameter.options"></a>

- *Type:* [`@guardian/projen-scala-sbt.SbtProjectOptions`](#@guardian/projen-scala-sbt.SbtProjectOptions)

---

#### Methods <a name="Methods"></a>

##### `addPlugins` <a name="@guardian/projen-scala-sbt.SbtProject.addPlugins"></a>

```typescript
public addPlugins(plugins: SbtPlugin)
```

###### `plugins`<sup>Required</sup> <a name="@guardian/projen-scala-sbt.SbtProject.parameter.plugins"></a>

- *Type:* [`@guardian/projen-scala-sbt.SbtPlugin`](#@guardian/projen-scala-sbt.SbtPlugin)

---


#### Properties <a name="Properties"></a>

##### `sbtPluginsFile`<sup>Required</sup> <a name="@guardian/projen-scala-sbt.SbtProject.property.sbtPluginsFile"></a>

- *Type:* [`projen.SourceCode`](#projen.SourceCode)

---



