import { Y as sanitize_props, Z as rest_props, a0 as spread_props, a1 as bind_props, _ as attr_class, a4 as attr, $ as clsx, V as slot } from "./index2.js";
import { twMerge } from "tailwind-merge";
import { F as Frame } from "./Label.js";
import { f as fallback } from "./utils2.js";
function Card($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "href",
    "horizontal",
    "reverse",
    "img",
    "padding",
    "size",
    "imgClass"
  ]);
  $$renderer.component(($$renderer2) => {
    let href = fallback($$props["href"], () => void 0, true);
    let horizontal = fallback($$props["horizontal"], false);
    let reverse = fallback($$props["reverse"], false);
    let img = fallback($$props["img"], () => void 0, true);
    let padding = fallback($$props["padding"], "lg");
    let size = fallback($$props["size"], "sm");
    let imgClass = fallback($$props["imgClass"], "");
    const paddings = {
      none: "",
      xs: "p-2",
      sm: "p-4",
      md: "p-4 sm:p-5",
      lg: "p-4 sm:p-6",
      xl: "p-4 sm:p-8"
    };
    const sizes = {
      none: "",
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-xl",
      lg: "max-w-2xl",
      xl: "max-w-screen-xl"
    };
    let innerPadding;
    let cardClass;
    let imgCls;
    innerPadding = paddings[padding];
    cardClass = twMerge("flex w-full", sizes[size], reverse ? "flex-col-reverse" : "flex-col", horizontal && (reverse ? "md:flex-row-reverse" : "md:flex-row"), href && "hover:bg-gray-100 dark:hover:bg-gray-700", !img && innerPadding, $$sanitized_props.class);
    imgCls = twMerge(reverse ? "rounded-b-lg" : "rounded-t-lg", horizontal && "object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none", horizontal && (reverse ? "md:rounded-e-lg" : "md:rounded-s-lg"), imgClass);
    Frame($$renderer2, spread_props([
      {
        tag: href ? "a" : "div",
        rounded: true,
        shadow: true,
        border: true,
        href
      },
      $$restProps,
      {
        class: cardClass,
        children: ($$renderer3) => {
          if (img) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<img${attr_class(clsx(imgCls))}${attr("src", img)} alt=""/> <div${attr_class(clsx(innerPadding))}><!--[-->`);
            slot($$renderer3, $$props, "default", {}, null);
            $$renderer3.push(`<!--]--></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<!--[-->`);
            slot($$renderer3, $$props, "default", {}, null);
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      }
    ]));
    bind_props($$props, { href, horizontal, reverse, img, padding, size, imgClass });
  });
}
export {
  Card as C
};
