import "clsx";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input } from "../../../../chunks/Input.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let projects = [];
    let searchQuery = "";
    projects.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div><div class="flex justify-between items-center mb-8"><h1 class="text-3xl font-bold text-gray-800">Projects</h1> `);
      Button($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Create Project`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="mb-6">`);
      Input($$renderer3, {
        type: "text",
        placeholder: "Search projects...",
        get value() {
          return searchQuery;
        },
        set value($$value) {
          searchQuery = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> `);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<p class="text-gray-600">Loading...</p>`);
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
