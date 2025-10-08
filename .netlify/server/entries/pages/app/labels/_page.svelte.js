import { X as sanitize_slots, Y as sanitize_props, Z as rest_props, _ as attr_class, $ as clsx, a0 as spread_props, a1 as bind_props, a2 as stringify, V as slot, W as head, a3 as ensure_array_like, a4 as attr, a5 as attr_style } from "../../../../chunks/index2.js";
import { B as Button } from "../../../../chunks/Button.js";
import { F as Frame, L as Label } from "../../../../chunks/Label.js";
import { C as CloseButton, I as Input } from "../../../../chunks/Input.js";
import { twMerge } from "tailwind-merge";
import { f as fallback } from "../../../../chunks/utils2.js";
import { e as escape_html } from "../../../../chunks/context.js";
function Modal($$renderer, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "open",
    "title",
    "size",
    "color",
    "placement",
    "autoclose",
    "outsideclose",
    "dismissable",
    "backdropClass",
    "classBackdrop",
    "dialogClass",
    "classDialog",
    "defaultClass",
    "headerClass",
    "classHeader",
    "bodyClass",
    "classBody",
    "footerClass",
    "classFooter"
  ]);
  $$renderer.component(($$renderer2) => {
    let backdropCls, dialogCls, frameCls, headerCls, bodyCls, footerCls;
    let open = fallback($$props["open"], false);
    let title = fallback($$props["title"], "");
    let size = fallback($$props["size"], "md");
    let color = fallback($$props["color"], "default");
    let placement = fallback($$props["placement"], "center");
    let autoclose = fallback($$props["autoclose"], false);
    let outsideclose = fallback($$props["outsideclose"], false);
    let dismissable = fallback($$props["dismissable"], true);
    let backdropClass = fallback($$props["backdropClass"], "fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80");
    let classBackdrop = fallback($$props["classBackdrop"], () => void 0, true);
    let dialogClass = fallback($$props["dialogClass"], "fixed top-0 start-0 end-0 h-modal md:inset-0 md:h-full z-50 w-full p-4 flex");
    let classDialog = fallback($$props["classDialog"], () => void 0, true);
    let defaultClass = fallback($$props["defaultClass"], "relative flex flex-col mx-auto");
    let headerClass = fallback($$props["headerClass"], "flex justify-between items-center p-4 md:p-5 rounded-t-lg");
    let classHeader = fallback($$props["classHeader"], () => void 0, true);
    let bodyClass = fallback($$props["bodyClass"], "p-4 md:p-5 space-y-4 flex-1 overflow-y-auto overscroll-contain");
    let classBody = fallback($$props["classBody"], () => void 0, true);
    let footerClass = fallback($$props["footerClass"], "flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse rounded-b-lg");
    let classFooter = fallback($$props["classFooter"], () => void 0, true);
    const getPlacementClasses = (placement2) => {
      switch (placement2) {
        case "top-left":
          return ["justify-start", "items-start"];
        case "top-center":
          return ["justify-center", "items-start"];
        case "top-right":
          return ["justify-end", "items-start"];
        case "center-left":
          return ["justify-start", "items-center"];
        case "center":
          return ["justify-center", "items-center"];
        case "center-right":
          return ["justify-end", "items-center"];
        case "bottom-left":
          return ["justify-start", "items-end"];
        case "bottom-center":
          return ["justify-center", "items-end"];
        case "bottom-right":
          return ["justify-end", "items-end"];
        default:
          return ["justify-center", "items-center"];
      }
    };
    const sizes = {
      xs: "max-w-md",
      sm: "max-w-lg",
      md: "max-w-2xl",
      lg: "max-w-4xl",
      xl: "max-w-7xl"
    };
    backdropCls = twMerge(backdropClass, classBackdrop);
    dialogCls = twMerge(dialogClass, classDialog, getPlacementClasses(placement));
    frameCls = twMerge(defaultClass, "w-full divide-y", $$sanitized_props.class);
    headerCls = twMerge(headerClass, classHeader);
    bodyCls = twMerge(bodyClass, classBody);
    footerCls = twMerge(footerClass, classFooter);
    if (open) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(clsx(backdropCls))}></div>  <div${attr_class(clsx(dialogCls))} tabindex="-1" aria-modal="true" role="dialog"><div${attr_class(`flex relative ${stringify(sizes[size])} w-full max-h-full`)}>`);
      Frame($$renderer2, spread_props([
        { rounded: true, shadow: true },
        $$restProps,
        {
          class: frameCls,
          color,
          children: ($$renderer3) => {
            if ($$slots.header || title) {
              $$renderer3.push("<!--[-->");
              Frame($$renderer3, {
                class: headerCls,
                color,
                children: ($$renderer4) => {
                  $$renderer4.push(`<!--[-->`);
                  slot($$renderer4, $$props, "header", {}, () => {
                    $$renderer4.push(`<h3${attr_class(`text-xl font-semibold ${stringify(color === "default" ? "" : "text-gray-900 dark:text-white")} p-0`)}>${escape_html(title)}</h3>`);
                  });
                  $$renderer4.push(`<!--]--> `);
                  if (dismissable) {
                    $$renderer4.push("<!--[-->");
                    CloseButton($$renderer4, { name: "Close modal", color });
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> <div${attr_class(clsx(bodyCls))} role="document">`);
            if (dismissable && !$$slots.header && !title) {
              $$renderer3.push("<!--[-->");
              CloseButton($$renderer3, { name: "Close modal", class: "absolute top-3 end-2.5", color });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> <!--[-->`);
            slot($$renderer3, $$props, "default", {}, null);
            $$renderer3.push(`<!--]--></div> `);
            if ($$slots.footer) {
              $$renderer3.push("<!--[-->");
              Frame($$renderer3, {
                class: footerCls,
                color,
                children: ($$renderer4) => {
                  $$renderer4.push(`<!--[-->`);
                  slot($$renderer4, $$props, "footer", {}, null);
                  $$renderer4.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]-->`);
          },
          $$slots: { default: true }
        }
      ]));
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, {
      open,
      title,
      size,
      color,
      placement,
      autoclose,
      outsideclose,
      dismissable,
      backdropClass,
      classBackdrop,
      dialogClass,
      classDialog,
      defaultClass,
      headerClass,
      classHeader,
      bodyClass,
      classBody,
      footerClass,
      classFooter
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let showCreateModal = false;
    let showEditModal = false;
    let createForm = { name: "", color: "#3B82F6" };
    let editForm = { name: "", color: "" };
    const predefinedColors = [
      "#3B82F6",
      // Blue
      "#EF4444",
      // Red
      "#10B981",
      // Green
      "#F59E0B",
      // Yellow
      "#8B5CF6",
      // Purple
      "#EC4899",
      // Pink
      "#06B6D4",
      // Cyan
      "#F97316"
      // Orange
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head($$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Labels</title>`);
        });
        $$renderer4.push(`<meta name="description" content="View your projects and tasks overview"/>`);
      });
      $$renderer3.push(`<div><div class="flex justify-between items-center mb-8"><h1 class="text-3xl font-bold text-gray-800">Labels</h1> `);
      Button($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Create Label`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<p class="text-gray-600">Loading...</p>`);
      }
      $$renderer3.push(`<!--]--> `);
      Modal($$renderer3, {
        title: "Create New Label",
        get open() {
          return showCreateModal;
        },
        set open($$value) {
          showCreateModal = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<form class="space-y-4"><div>`);
          Label($$renderer4, {
            for: "create-name",
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Label Name *`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "create-name",
            type: "text",
            required: true,
            minlength: "2",
            placeholder: "Enter label name",
            get value() {
              return createForm.name;
            },
            set value($$value) {
              createForm.name = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div>`);
          Label($$renderer4, {
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Color *`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <div class="grid grid-cols-4 gap-3 mb-3"><!--[-->`);
          const each_array_1 = ensure_array_like(predefinedColors);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let color = each_array_1[$$index_1];
            $$renderer4.push(`<button type="button"${attr("aria-label", `Select color ${stringify(color)}`)}${attr_class(`w-full h-12 rounded-lg border-2 transition-all ${stringify(createForm.color === color ? "border-gray-800 scale-110" : "border-gray-200 hover:border-gray-400")}`)}${attr_style(`background-color: ${stringify(color)}`)}></button>`);
          }
          $$renderer4.push(`<!--]--></div> `);
          Input($$renderer4, {
            type: "color",
            get value() {
              return createForm.color;
            },
            set value($$value) {
              createForm.color = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div class="p-4 bg-gray-100 rounded-lg"><p class="text-sm text-gray-600 mb-2">Preview:</p> <div class="inline-block px-4 py-2 rounded-lg font-medium"${attr_style(`background-color: ${stringify(createForm.color)}20; color: ${stringify(createForm.color)}`)}>${escape_html(createForm.name || "Label Name")}</div></div> <div class="flex gap-4">`);
          Button($$renderer4, {
            type: "submit",
            class: "flex-1",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Create Label`);
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
      $$renderer3.push(`<!----> `);
      Modal($$renderer3, {
        title: "Edit Label",
        get open() {
          return showEditModal;
        },
        set open($$value) {
          showEditModal = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<form class="space-y-4"><div>`);
          Label($$renderer4, {
            for: "edit-name",
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Label Name *`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "edit-name",
            type: "text",
            required: true,
            minlength: "2",
            placeholder: "Enter label name",
            get value() {
              return editForm.name;
            },
            set value($$value) {
              editForm.name = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div>`);
          Label($$renderer4, {
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Color *`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <div class="grid grid-cols-4 gap-3 mb-3"><!--[-->`);
          const each_array_2 = ensure_array_like(predefinedColors);
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let color = each_array_2[$$index_2];
            $$renderer4.push(`<button type="button"${attr("aria-label", `Select color ${stringify(color)}`)}${attr_class(`w-full h-12 rounded-lg border-2 transition-all ${stringify(editForm.color === color ? "border-gray-800 scale-110" : "border-gray-200 hover:border-gray-400")}`)}${attr_style(`background-color: ${stringify(color)}`)}></button>`);
          }
          $$renderer4.push(`<!--]--></div> `);
          Input($$renderer4, {
            type: "color",
            get value() {
              return editForm.color;
            },
            set value($$value) {
              editForm.color = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div class="p-4 bg-gray-100 rounded-lg"><p class="text-sm text-gray-600 mb-2">Preview:</p> <div class="inline-block px-4 py-2 rounded-lg font-medium"${attr_style(`background-color: ${stringify(editForm.color)}20; color: ${stringify(editForm.color)}`)}>${escape_html(editForm.name || "Label Name")}</div></div> <div class="flex gap-4">`);
          Button($$renderer4, {
            type: "submit",
            class: "flex-1",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Update Label`);
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
