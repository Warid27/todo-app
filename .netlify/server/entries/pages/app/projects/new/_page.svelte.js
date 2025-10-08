import { g as getContext, e as escape_html } from "../../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { B as Button } from "../../../../../chunks/Button.js";
import { C as Card } from "../../../../../chunks/Card.js";
import { L as Label } from "../../../../../chunks/Label.js";
import { W as Wrapper, I as Input } from "../../../../../chunks/Input.js";
import { X as sanitize_slots, Y as sanitize_props, Z as rest_props, _ as attr_class, $ as clsx, V as slot, a6 as attributes, a1 as bind_props } from "../../../../../chunks/index2.js";
import { twMerge } from "tailwind-merge";
import { f as fallback } from "../../../../../chunks/utils2.js";
function Textarea($$renderer, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "value",
    "wrappedClass",
    "unWrappedClass",
    "innerWrappedClass",
    "headerClass",
    "footerClass"
  ]);
  $$renderer.component(($$renderer2) => {
    let textareaClass;
    let value = fallback($$props["value"], () => void 0, true);
    let wrappedClass = fallback($$props["wrappedClass"], "block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50");
    let unWrappedClass = fallback($$props["unWrappedClass"], "p-2.5 text-sm focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50");
    let innerWrappedClass = fallback($$props["innerWrappedClass"], "py-2 px-4 bg-white dark:bg-gray-800");
    let headerClass = fallback($$props["headerClass"], "");
    let footerClass = fallback($$props["footerClass"], "");
    const background = getContext("background");
    let wrapped;
    let wrapperClass;
    const headerCls = (header) => twMerge(header ? "border-b" : "border-t", "py-2 px-3 border-gray-200", background ? "dark:border-gray-500" : "dark:border-gray-600", header ? headerClass : footerClass);
    let innerWrapperClass;
    wrapped = $$slots.header || $$slots.footer;
    wrapperClass = twMerge("w-full rounded-lg bg-gray-50", background ? "dark:bg-gray-600" : "dark:bg-gray-700", "text-gray-900 dark:placeholder-gray-400 dark:text-white", "border border-gray-200", background ? "dark:border-gray-500" : "dark:border-gray-600", $$sanitized_props.class);
    textareaClass = wrapped ? wrappedClass : twMerge(wrapperClass, unWrappedClass);
    innerWrapperClass = twMerge(innerWrappedClass, $$slots.footer ? "" : "rounded-b-lg", $$slots.header ? "" : "rounded-t-lg");
    Wrapper($$renderer2, {
      show: wrapped,
      class: wrapperClass,
      children: ($$renderer3) => {
        if ($$slots.header) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div${attr_class(clsx(headerCls(true)))}><!--[-->`);
          slot($$renderer3, $$props, "header", {}, null);
          $$renderer3.push(`<!--]--></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        Wrapper($$renderer3, {
          show: wrapped,
          class: innerWrapperClass,
          children: ($$renderer4) => {
            $$renderer4.push(`<textarea${attributes({ ...$$restProps, class: clsx(textareaClass) })}>`);
            const $$body = escape_html(value);
            if ($$body) {
              $$renderer4.push(`${$$body}`);
            }
            $$renderer4.push(`</textarea>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        if ($$slots.footer) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div${attr_class(clsx(headerCls(false)))}><!--[-->`);
          slot($$renderer3, $$props, "footer", {}, null);
          $$renderer3.push(`<!--]--></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
    bind_props($$props, {
      value,
      wrappedClass,
      unWrappedClass,
      innerWrappedClass,
      headerClass,
      footerClass
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let name = "";
    let description = "";
    let startDate = "";
    let endDate = "";
    let loading = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="max-w-2xl mx-auto"><div class="mb-6"><h1 class="text-3xl font-bold text-gray-800">Create New Project</h1></div> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> <form class="space-y-6"><div>`);
          Label($$renderer4, {
            for: "name",
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Project Name *`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "name",
            type: "text",
            required: true,
            minlength: "3",
            placeholder: "Enter project name",
            get value() {
              return name;
            },
            set value($$value) {
              name = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div>`);
          Label($$renderer4, {
            for: "description",
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Description`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Textarea($$renderer4, {
            id: "description",
            rows: "4",
            placeholder: "Enter project description (optional)",
            get value() {
              return description;
            },
            set value($$value) {
              description = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div class="grid grid-cols-2 gap-4"><div>`);
          Label($$renderer4, {
            for: "startDate",
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Start Date`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "startDate",
            type: "date",
            get value() {
              return startDate;
            },
            set value($$value) {
              startDate = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div>`);
          Label($$renderer4, {
            for: "endDate",
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->End Date`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "endDate",
            type: "date",
            get value() {
              return endDate;
            },
            set value($$value) {
              endDate = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div></div> <div class="flex gap-4">`);
          Button($$renderer4, {
            type: "submit",
            disabled: loading,
            class: "flex-1",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->${escape_html("Create Project")}`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Button($$renderer4, {
            type: "button",
            color: "alternative",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Cancel`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----></div></form>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div>`);
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
