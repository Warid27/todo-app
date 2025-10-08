import { W as head } from "../../../../chunks/index2.js";
import "clsx";
import { B as Button } from "../../../../chunks/Button.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dashboard</title>`);
      });
      $$renderer3.push(`<meta name="description" content="View your projects and tasks overview"/>`);
    });
    $$renderer2.push(`<div><div class="flex justify-between items-center mb-8"><h1 class="text-3xl font-bold text-gray-800">Dashboard</h1> `);
    Button($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Create Project`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-gray-600">Loading...</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
