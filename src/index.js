const AlpineIndeterminate = function (Alpine) {
    Alpine.directive('indeterminate', (el, { expression }, { Alpine, effect, evaluateLater, cleanup, evaluate }) => {
        // const root = Alpine.closestDataStack(el).find((i) => i.hasOwnProperty(expression)).$el
        const root = evaluate('$root')
        console.log(root);
        const selector = `input[type="checkbox"][x-model="${expression}"]`;
        const hasXModel = el.hasAttribute('x-model');

        let domCheckboxes = root.querySelectorAll(selector);

        const listener = () => {
            const domCheckboxes = root.querySelectorAll(selector)
            const checked = root.querySelectorAll(selector + ':checked')

            if (checked.length < domCheckboxes.length) {
                // Add them.
                domCheckboxes.forEach((domCheckbox) => {
                    const model = domCheckbox._x_model?.get() ?? [];

                    if (model.includes(domCheckbox.value)) {
                        // Skip if already included.
                        return;
                    }
                    model.push(domCheckbox.value);
                });
            } else {
                // Remove them all.
                domCheckboxes[0]._x_model.set([]);
                el._x_model?.set(false);
                Alpine.nextTick(()=> {
                    el.dataset.indeterminate = false;
                    el.dataset.checked = false;
                    el.indeterminate = false;
                    el.checked = false;
                });
            }
        }

        function setIndeterminateFromItems(items) {
            const domCheckboxes = root.querySelectorAll(selector)

            // console.log('Setting Indeterminate - X-Data & checkboxes length: ', items.length, domCheckboxes.length)
            if (items.length === 0) {
                // console.log('length = 0')
                el.dataset.indeterminate = false;
                el.dataset.checked = false;
                el.indeterminate = false;
                el.checked = false;
                return;
            }

            if (items.length === domCheckboxes.length) {
                // console.log('length is equal')
                setTimeout(()=> {
                    el.dataset.indeterminate = false;
                    el.dataset.checked = true;
                    el.indeterminate = false;
                    el.checked = true;
                    el._x_model?.set(true);
                }, 0);
                return;
            }

            // Items are greather than 0 but less than all checkboxes.
            // Set indeterminate to true and remove checked and x-data state.
            el._x_model?.set(false);
            el.dataset.indeterminate = true;
            el.dataset.checked = false;
            el.indeterminate = true;
            el.checked = false;
        }

        const getItemsFromX_Data = evaluateLater(expression);

        if (hasXModel) {
            const modelExpression = el.getAttribute('x-model')
            el._x_indeterminate_previousVal = Boolean(evaluate(modelExpression));
            const updateModel = evaluateLater(modelExpression);

            effect(() => {
                updateModel((value) => {
                    getItemsFromX_Data(items => {
                        const domCheckboxes = root.querySelectorAll(selector)

                        if (value === el._x_indeterminate_previousVal) {
                            el._x_indeterminate_previousVal = value;
                            return;
                        }

                        el._x_indeterminate_previousVal = value;
                        if ((items.length === domCheckboxes.length) && !value) {
                            // console.log('they match. toggle all off.')
                            listener();
                            return;
                        }

                        if (value && domCheckboxes.length !== items.length) {
                            // console.log('not all are checked. toggle all on')
                            listener();
                            return;
                        }
                    })
                });
            })
        } else {
            // Add listener to directive checkbox if not using x-model.
            el.addEventListener('click', listener)
            cleanup(() => {
                el.removeEventListener('click', listener)
            })
        }

        effect(() => {
            console.log('updating checkboxes');
            domCheckboxes = root.querySelectorAll(selector);
        })

        effect(() => {
            getItemsFromX_Data((items) => {
                setIndeterminateFromItems(items)
            });
        })
    });
}

export default AlpineIndeterminate
