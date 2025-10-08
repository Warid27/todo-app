import { e as escape_html } from "../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { L as Label } from "../../../chunks/Label.js";
import { I as Input } from "../../../chunks/Input.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let password = "";
    let confirmPassword = "";
    let loading = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">`);
      Card($$renderer3, {
        class: "w-full max-w-md",
        children: ($$renderer4) => {
          $$renderer4.push(`<h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1> `);
          {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> <form class="space-y-4"><div>`);
          Label($$renderer4, {
            for: "username",
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Username`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "username",
            type: "text",
            required: true,
            minlength: "3",
            placeholder: "Choose a username",
            get value() {
              return username;
            },
            set value($$value) {
              username = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div>`);
          Label($$renderer4, {
            for: "password",
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Password`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "password",
            type: "password",
            required: true,
            minlength: "6",
            placeholder: "Choose a password",
            get value() {
              return password;
            },
            set value($$value) {
              password = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div>`);
          Label($$renderer4, {
            for: "confirmPassword",
            class: "mb-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Confirm Password`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "confirmPassword",
            type: "password",
            required: true,
            placeholder: "Confirm your password",
            get value() {
              return confirmPassword;
            },
            set value($$value) {
              confirmPassword = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> `);
          Button($$renderer4, {
            type: "submit",
            class: "w-full",
            disabled: loading,
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->${escape_html("Register")}`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----></form> <div class="text-center mt-4"><p class="text-gray-600">Already have an account? <a href="/login" class="text-blue-600 hover:underline">Login</a></p></div>`);
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
