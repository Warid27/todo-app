import "clsx";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { I as Input } from "../../../../chunks/Input.js";
import { Y as sanitize_props, Z as rest_props, a3 as ensure_array_like, V as slot, a1 as bind_props } from "../../../../chunks/index2.js";
import { twMerge } from "tailwind-merge";
import { f as fallback } from "../../../../chunks/utils2.js";
import { e as escape_html } from "../../../../chunks/context.js";
function Select($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "items",
    "value",
    "placeholder",
    "underline",
    "size",
    "defaultClass",
    "underlineClass"
  ]);
  $$renderer.component(($$renderer2) => {
    let items = fallback($$props["items"], () => [], true);
    let value = fallback($$props["value"], "");
    let placeholder = fallback($$props["placeholder"], "Choose option ...");
    let underline = fallback($$props["underline"], false);
    let size = fallback($$props["size"], "md");
    let defaultClass = fallback($$props["defaultClass"], "text-gray-900 disabled:text-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:disabled:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500");
    let underlineClass = fallback($$props["underlineClass"], "text-gray-500 disabled:text-gray-400 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:disabled:text-gray-500 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer");
    const common = "block w-full";
    const sizes = {
      sm: "text-sm p-2",
      md: "text-sm p-2.5",
      lg: "text-base py-3 px-4"
    };
    let selectClass;
    selectClass = twMerge(common, underline ? underlineClass : defaultClass, sizes[size], underline && "!px-0", $$sanitized_props.class);
    $$renderer2.select({ ...$$restProps, value, class: selectClass }, ($$renderer3) => {
      if (placeholder) {
        $$renderer3.push("<!--[-->");
        $$renderer3.option(
          {
            disabled: true,
            selected: value === void 0 ? true : void 0,
            value: ""
          },
          ($$renderer4) => {
            $$renderer4.push(`${escape_html(placeholder)}`);
          }
        );
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
      if (items && items.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(items);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let { value: itemValue, name, disabled } = each_array[$$index];
          $$renderer3.option(
            {
              disabled,
              value: itemValue,
              selected: itemValue === value ? true : void 0
            },
            ($$renderer4) => {
              $$renderer4.push(`${escape_html(name)}`);
            }
          );
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<!--[-->`);
        slot($$renderer3, $$props, "default", {}, null);
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]-->`);
    });
    bind_props($$props, {
      items,
      value,
      placeholder,
      underline,
      size,
      defaultClass,
      underlineClass
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tasks = [];
    let searchQuery = "";
    let statusFilter = "";
    let priorityFilter = "";
    tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || task.status === statusFilter;
      const matchesPriority = !priorityFilter || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div><div class="mb-8"><h1 class="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1> <div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
      Input($$renderer3, {
        type: "text",
        placeholder: "Search tasks...",
        get value() {
          return searchQuery;
        },
        set value($$value) {
          searchQuery = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Select($$renderer3, {
        get value() {
          return statusFilter;
        },
        set value($$value) {
          statusFilter = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.option({ value: "" }, ($$renderer5) => {
            $$renderer5.push(`All Statuses`);
          });
          $$renderer4.push(` `);
          $$renderer4.option({ value: "Todo" }, ($$renderer5) => {
            $$renderer5.push(`Todo`);
          });
          $$renderer4.push(` `);
          $$renderer4.option({ value: "In Progress" }, ($$renderer5) => {
            $$renderer5.push(`In Progress`);
          });
          $$renderer4.push(` `);
          $$renderer4.option({ value: "Done" }, ($$renderer5) => {
            $$renderer5.push(`Done`);
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Select($$renderer3, {
        get value() {
          return priorityFilter;
        },
        set value($$value) {
          priorityFilter = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.option({ value: "" }, ($$renderer5) => {
            $$renderer5.push(`All Priorities`);
          });
          $$renderer4.push(` `);
          $$renderer4.option({ value: "Low" }, ($$renderer5) => {
            $$renderer5.push(`Low`);
          });
          $$renderer4.push(` `);
          $$renderer4.option({ value: "Medium" }, ($$renderer5) => {
            $$renderer5.push(`Medium`);
          });
          $$renderer4.push(` `);
          $$renderer4.option({ value: "High" }, ($$renderer5) => {
            $$renderer5.push(`High`);
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> `);
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
