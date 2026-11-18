# pi-openai-fast-mode

Pi package that adds a Fast Mode toggle for GPT-6.2-Astra, GPT-6.2-Sol, GPT-6-Luna, GPT-6.1-Sol, GPT-6-Astra, GPT-5.6, GPT-5.5, and GPT-5.4 on both OpenAI and OpenAI-Codex.

<img style="width: 100%; height: auto;" alt="fast mode" src="https://raw.githubusercontent.com/johncmunson/pi-openai-fast-mode/refs/heads/main/preview-img.png" />

## Features

- Registers `/fast [on|off|toggle]`.
- Registers `--fast` to enable Fast Mode at startup.
- Injects `service_tier: "priority"` into matching OpenAI/OpenAI-Codex provider payloads.
- Shows a compact right-aligned TUI `fast` indicator only when enabled and the current model is configured.
- Persists state in user or project scope depending on how the package is loaded.

> View on the [Pi Package Registry](https://pi.dev/packages/pi-openai-fast-mode)

## Install

```bash
pi install npm:pi-openai-fast-mode
# or project-local
pi install -l npm:pi-openai-fast-mode
```

For local development:

```bash
pi -e ./src/index.ts
```

## Usage

```text
/fast          # toggle
/fast toggle   # toggle
/fast on       # enable
/fast off      # disable
```

Start Pi with Fast Mode enabled and persisted:

```bash
pi --fast
```

## Check a request

The `fast` badge means the toggle is on and the selected model matches. It is not a receipt from OpenAI. To check a request from this checkout with Pi 0.99 or newer, load the tier diagnostic **after** the plugin:

```bash
pi -ne -e ./src/index.ts -e ./examples/check-tier.mjs --model openai/gpt-6.2-astra
```

Run `/fast on` and send one short prompt. `request service_tier = priority` means the diagnostic saw the Fast tier in Pi's request payload. `response service_tier = priority` means the provider also reported priority for that response. If the response reports `default`, or no tier is reported, do not infer priority from the badge. Run `/fast off` and send another prompt to compare. These are real model requests; the diagnostic displays only the model and tier, not prompts or credentials.

ChatGPT Profile's **Fast Mode · % of runs** is an aggregate, not a per-request trace. Its label does not say which clients count as runs. With a platform API key, check usage for the OpenAI API project instead of the ChatGPT profile.

## Default configuration

Fast Mode starts disabled and only applies to exact configured provider/model pairs. Every supported model is listed for both `openai` and `openai-codex`:

```json
{
  "enabled": false,
  "targets": [
    { "provider": "openai", "model": "gpt-5.4", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-5.5", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-5.6", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-5.6-sol", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-5.6-terra", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-5.6-luna", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-6-astra", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-6.1-sol", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-6-luna", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-6.2-astra", "serviceTier": "priority" },
    { "provider": "openai", "model": "gpt-6.2-sol", "serviceTier": "priority" },
    {
      "provider": "openai-codex",
      "model": "gpt-5.4",
      "serviceTier": "priority"
    },
    {
      "provider": "openai-codex",
      "model": "gpt-5.5",
      "serviceTier": "priority"
    },
    {
      "provider": "openai-codex",
      "model": "gpt-5.6",
      "serviceTier": "priority"
    },
    {
      "provider": "openai-codex",
      "model": "gpt-5.6-sol",
      "serviceTier": "priority"
    },
    {
      "provider": "openai-codex",
      "model": "gpt-5.6-terra",
      "serviceTier": "priority"
    },
    {
      "provider": "openai-codex",
      "model": "gpt-5.6-luna",
      "serviceTier": "priority"
    },
    {
      "provider": "openai-codex",
      "model": "gpt-6-astra",
      "serviceTier": "priority"
    },
    {
      "provider": "openai-codex",
      "model": "gpt-6.1-sol",
      "serviceTier": "priority"
    },
    {
      "provider": "openai-codex",
      "model": "gpt-6-luna",
      "serviceTier": "priority"
    },
    { "provider": "openai-codex", "model": "gpt-6.2-astra", "serviceTier": "priority" },
    { "provider": "openai-codex", "model": "gpt-6.2-sol", "serviceTier": "priority" }
  ]
}
```

On startup, saved targets are refreshed to the current defaults, including `serviceTier: "priority"`, while preserving the enabled state.

User-scoped state is stored under `~/.pi/agent/extensions/pi-openai-fast-mode/config.json`.
Project-scoped state is stored under `./.pi/pi-openai-fast-mode/config.json`.

## Development

```bash
npm install
npm run check
```
