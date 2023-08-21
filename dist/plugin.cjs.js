var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// builds/module.js
__export(exports, {
  default: () => module_default
});

// src/index.js
var AlpineIndeterminate = function(Alpine) {
  Alpine.directive("indeterminate", (el, { expression }, { Alpine: Alpine2, effect, evaluateLater, cleanup, evaluate }) => {
    const root = Alpine2.closestDataStack(el).find((i) => i.hasOwnProperty(expression)).$el;
    const selector = `input[type="checkbox"][x-model="${expression}"]`;
    const hasXModel = el.hasAttribute("x-model");
    const listener = () => {
      var _a;
      const domCheckboxes = root.querySelectorAll(selector);
      const checked = root.querySelectorAll(selector + ":checked");
      if (checked.length < domCheckboxes.length) {
        domCheckboxes.forEach((domCheckbox) => {
          var _a2, _b;
          const model = (_b = (_a2 = domCheckbox._x_model) == null ? void 0 : _a2.get()) != null ? _b : [];
          if (model.includes(domCheckbox.value)) {
            return;
          }
          model.push(domCheckbox.value);
        });
      } else {
        domCheckboxes[0]._x_model.set([]);
        (_a = el._x_model) == null ? void 0 : _a.set(false);
        setTimeout(() => {
          el.dataset.indeterminate = false;
          el.dataset.checked = false;
          el.indeterminate = false;
          el.checked = false;
        }, 0);
      }
    };
    function setIndeterminateFromItems(items) {
      var _a;
      const domCheckboxes = root.querySelectorAll(selector);
      if (items.length === 0) {
        el.dataset.indeterminate = false;
        el.dataset.checked = false;
        el.indeterminate = false;
        el.checked = false;
        return;
      }
      if (items.length === domCheckboxes.length) {
        setTimeout(() => {
          var _a2;
          el.dataset.indeterminate = false;
          el.dataset.checked = true;
          el.indeterminate = false;
          el.checked = true;
          (_a2 = el._x_model) == null ? void 0 : _a2.set(true);
        }, 0);
        return;
      }
      (_a = el._x_model) == null ? void 0 : _a.set(false);
      el.dataset.indeterminate = true;
      el.dataset.checked = false;
      el.indeterminate = true;
      el.checked = false;
    }
    const getItemsFromX_Data = evaluateLater(expression);
    if (hasXModel) {
      const modelExpression = el.getAttribute("x-model");
      el._x_indeterminate_previousVal = Boolean(evaluate(modelExpression));
      const updateModel = evaluateLater(modelExpression);
      effect(() => {
        updateModel((value) => {
          getItemsFromX_Data((items) => {
            const domCheckboxes = root.querySelectorAll(selector);
            if (value === el._x_indeterminate_previousVal) {
              el._x_indeterminate_previousVal = value;
              return;
            }
            el._x_indeterminate_previousVal = value;
            if (items.length === domCheckboxes.length && !value) {
              listener();
              return;
            }
            if (value && domCheckboxes.length !== items.length) {
              listener();
              return;
            }
          });
        });
      });
    } else {
      el.addEventListener("click", listener);
      cleanup(() => {
        el.removeEventListener("click", listener);
      });
    }
    effect(() => {
      getItemsFromX_Data((items) => {
        setIndeterminateFromItems(items);
      });
    });
  });
};
var src_default = AlpineIndeterminate;

// builds/module.js
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
