// Load after the Fast Mode extension to inspect tier metadata for a test prompt.
export default function checkTier(pi) {
  function report(ctx, message) {
    if (ctx.hasUI) ctx.ui.notify(message, "info");
    else console.error(message);
  }

  const providers = new Set(["openai", "openai-codex"]);
  pi.on("before_provider_request", ({ payload }, ctx) => {
    if (!providers.has(ctx.model?.provider)) return;
    report(ctx, `${ctx.model.provider}/${payload?.model}: request service_tier = ${payload?.service_tier ?? "(not set)"}`);
  });

  pi.on("provider_stream_event", ({ provider, model, data }, ctx) => {
    if (!providers.has(provider)) return;
    if (data?.type !== "response.completed" && data?.type !== "response.done") return;
    report(ctx, `${provider}/${model}: response service_tier = ${data.response?.service_tier ?? "(not reported)"}`);
  });
}
