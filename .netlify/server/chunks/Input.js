import { Y as sanitize_props, Z as rest_props, a6 as attributes, $ as clsx, V as slot, a1 as bind_props, a0 as spread_props, _ as attr_class, a9 as element, X as sanitize_slots, a2 as stringify } from "./index2.js";
import { f as fallback } from "./utils2.js";
import { twMerge } from "tailwind-merge";
import { g as getContext, e as escape_html, i as invalid_default_snippet } from "./context.js";
function ToolbarButton($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["color", "name", "ariaLabel", "size", "href"]);
  $$renderer.component(($$renderer2) => {
    let color = fallback($$props["color"], "default");
    let name = fallback($$props["name"], () => void 0, true);
    let ariaLabel = fallback($$props["ariaLabel"], () => void 0, true);
    let size = fallback($$props["size"], "md");
    let href = fallback($$props["href"], () => void 0, true);
    const background = getContext("background");
    const colors = {
      dark: "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
      gray: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",
      red: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",
      yellow: "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",
      green: "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",
      indigo: "text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",
      purple: "text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",
      pink: "text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",
      blue: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",
      primary: "text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",
      default: "focus:ring-gray-400 hover:bg-gray-100"
    };
    const sizing = {
      xs: "m-0.5 rounded-sm focus:ring-1 p-0.5",
      sm: "m-0.5 rounded focus:ring-1 p-0.5",
      md: "m-0.5 rounded-lg focus:ring-2 p-1.5",
      lg: "m-0.5 rounded-lg focus:ring-2 p-2.5"
    };
    let buttonClass;
    const svgSizes = {
      xs: "w-3 h-3",
      sm: "w-3.5 h-3.5",
      md: "w-5 h-5",
      lg: "w-5 h-5"
    };
    buttonClass = twMerge("focus:outline-none whitespace-normal", sizing[size], colors[color], color === "default" && (background ? "dark:hover:bg-gray-600" : "dark:hover:bg-gray-700"), $$sanitized_props.class);
    if (href) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attributes({
        href,
        ...$$restProps,
        class: clsx(buttonClass),
        "aria-label": ariaLabel ?? name
      })}>`);
      if (name) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="sr-only">${escape_html(name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <!--[-->`);
      slot($$renderer2, $$props, "default", { svgSize: svgSizes[size] }, null);
      $$renderer2.push(`<!--]--></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({
        type: "button",
        ...$$restProps,
        class: clsx(buttonClass),
        "aria-label": ariaLabel ?? name
      })}>`);
      if (name) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="sr-only">${escape_html(name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <!--[-->`);
      slot($$renderer2, $$props, "default", { svgSize: svgSizes[size] }, null);
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { color, name, ariaLabel, size, href });
  });
}
function CloseButton($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["name"]);
  $$renderer.component(($$renderer2) => {
    let name = fallback($$props["name"], "Close");
    ToolbarButton($$renderer2, spread_props([
      { name },
      $$restProps,
      {
        class: twMerge("ms-auto", $$sanitized_props.class),
        children: invalid_default_snippet,
        $$slots: {
          default: ($$renderer3, { svgSize }) => {
            $$renderer3.push(`<svg${attr_class(clsx(svgSize))} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`);
          }
        }
      }
    ]));
    bind_props($$props, { name });
  });
}
function Wrapper($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["tag", "show", "use"]);
  let tag = fallback($$props["tag"], "div");
  let show = $$props["show"];
  let use = fallback($$props["use"], () => {
  });
  if (show) {
    $$renderer.push("<!--[-->");
    element(
      $$renderer,
      tag,
      () => {
        $$renderer.push(`${attributes({ ...$$restProps })}`);
      },
      () => {
        $$renderer.push(`<!--[-->`);
        slot($$renderer, $$props, "default", {}, null);
        $$renderer.push(`<!--]-->`);
      }
    );
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<!--[-->`);
    slot($$renderer, $$props, "default", {}, null);
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, { tag, show, use });
}
function clampSize(s) {
  return s && s === "xs" ? "sm" : s === "xl" ? "lg" : s;
}
function Input($$renderer, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "type",
    "value",
    "size",
    "clearable",
    "defaultClass",
    "color",
    "floatClass"
  ]);
  $$renderer.component(($$renderer2) => {
    let _size;
    let type = fallback($$props["type"], "text");
    let value = fallback($$props["value"], () => void 0, true);
    let size = fallback($$props["size"], () => void 0, true);
    let clearable = fallback($$props["clearable"], false);
    let defaultClass = fallback($$props["defaultClass"], "block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right");
    let color = fallback($$props["color"], "base");
    let floatClass = fallback($$props["floatClass"], "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400");
    const borderClasses = {
      base: "border border-gray-300 dark:border-gray-600",
      tinted: "border border-gray-300 dark:border-gray-500",
      green: "border border-green-500 dark:border-green-400",
      red: "border border-red-500 dark:border-red-400"
    };
    const ringClasses = {
      base: "focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500",
      green: "focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 dark:focus:ring-green-500",
      red: "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
    };
    const colorClasses = {
      base: "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
      tinted: "bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400",
      green: "bg-green-50 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700",
      red: "bg-red-50 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:bg-gray-700"
    };
    let background = getContext("background");
    let group = getContext("group");
    const textSizes = { sm: "sm:text-xs", md: "text-sm", lg: "sm:text-base" };
    const leftPadding = { sm: "ps-9", md: "ps-10", lg: "ps-11" };
    const rightPadding = { sm: "pe-9", md: "pe-10", lg: "pe-11" };
    const inputPadding = { sm: "p-2", md: "p-2.5", lg: "p-3" };
    let inputClass;
    _size = size || clampSize(group?.size) || "md";
    {
      const _color = color === "base" && background ? "tinted" : color;
      inputClass = twMerge([
        defaultClass,
        inputPadding[_size],
        $$slots.left && leftPadding[_size] || (clearable || $$slots.right) && rightPadding[_size],
        ringClasses[color],
        colorClasses[_color],
        borderClasses[_color],
        textSizes[_size],
        group || "rounded-lg",
        group && "first:rounded-s-lg last:rounded-e-lg",
        group && "[&:not(:first-child)]:-ms-px",
        $$sanitized_props.class
      ]);
    }
    Wrapper($$renderer2, {
      class: "relative w-full",
      show: $$slots.left || $$slots.right,
      children: ($$renderer3) => {
        if ($$slots.left) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div${attr_class(`${stringify(twMerge(floatClass, $$sanitized_props.classLeft))} start-0 ps-2.5 pointer-events-none`)}><!--[-->`);
          slot($$renderer3, $$props, "left", {}, null);
          $$renderer3.push(`<!--]--></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <!--[-->`);
        slot($$renderer3, $$props, "default", { props: { ...$$restProps, class: inputClass } }, () => {
          $$renderer3.push(`<input${attributes(
            {
              ...$$restProps,
              value,
              ...{ type },
              class: clsx(inputClass)
            },
            void 0,
            void 0,
            void 0,
            4
          )}/>`);
        });
        $$renderer3.push(`<!--]--> `);
        if ($$slots.right) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div${attr_class(`${stringify(twMerge(floatClass, $$sanitized_props.classRight))} end-0 pe-2.5`)}><!--[-->`);
          slot($$renderer3, $$props, "right", {}, null);
          $$renderer3.push(`<!--]--></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (clearable && value && `${value}`.length > 0) {
          $$renderer3.push("<!--[-->");
          CloseButton($$renderer3, {
            size,
            color: "none",
            class: ` ${stringify(twMerge(floatClass, $$sanitized_props.classRight))} focus:ring-0 end-6 focus:ring-gray-400 dark:text-white`
          });
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
    bind_props($$props, {
      type,
      value,
      size,
      clearable,
      defaultClass,
      color,
      floatClass
    });
  });
}
export {
  CloseButton as C,
  Input as I,
  Wrapper as W
};
