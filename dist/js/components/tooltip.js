const tooltip = {
    init() {
        const targets = document.querySelectorAll('[data-tooltip="tippy"]');

        if (targets.length) {
            [...targets].forEach((target) => {
                if (target.dataset.tippyContent) {
                    tippy(target);
                }
            });
        }
    },
};

tooltip.init();