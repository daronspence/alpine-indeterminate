// src/index.js
var AlpineIndeterminate = function(Alpine) {
  Alpine.directive("indeterminate", (el, { expression }, { Alpine: Alpine2, effect, evaluateLater, cleanup, evaluate }) => {
    const root = evaluate("$root");
    console.log(root);
    const selector = `input[type="checkbox"][x-model="${expression}"]`;
    const hasXModel = el.hasAttribute("x-model");
    let domCheckboxes = root.querySelectorAll(selector);
    const listener = () => {
      const domCheckboxes2 = root.querySelectorAll(selector);
      const checked = root.querySelectorAll(selector + ":checked");
      if (checked.length < domCheckboxes2.length) {
        domCheckboxes2.forEach((domCheckbox) => {
          const model = domCheckbox._x_model?.get() ?? [];
          if (model.includes(domCheckbox.value)) {
            return;
          }
          model.push(domCheckbox.value);
        });
      } else {
        domCheckboxes2[0]._x_model.set([]);
        el._x_model?.set(false);
        Alpine2.nextTick(() => {
          el.dataset.indeterminate = false;
          el.dataset.checked = false;
          el.indeterminate = false;
          el.checked = false;
        });
      }
    };
    function setIndeterminateFromItems(items) {
      const domCheckboxes2 = root.querySelectorAll(selector);
      if (items.length === 0) {
        el.dataset.indeterminate = false;
        el.dataset.checked = false;
        el.indeterminate = false;
        el.checked = false;
        return;
      }
      if (items.length === domCheckboxes2.length) {
        setTimeout(() => {
          el.dataset.indeterminate = false;
          el.dataset.checked = true;
          el.indeterminate = false;
          el.checked = true;
          el._x_model?.set(true);
        }, 0);
        return;
      }
      el._x_model?.set(false);
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
            const domCheckboxes2 = root.querySelectorAll(selector);
            if (value === el._x_indeterminate_previousVal) {
              el._x_indeterminate_previousVal = value;
              return;
            }
            el._x_indeterminate_previousVal = value;
            if (items.length === domCheckboxes2.length && !value) {
              listener();
              return;
            }
            if (value && domCheckboxes2.length !== items.length) {
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
      console.log("updating checkboxes");
      domCheckboxes = root.querySelectorAll(selector);
    });
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
export {
  module_default as default
};
