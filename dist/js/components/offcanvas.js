class Offcanvas {
    constructor(target, options = {}) {
        //Store the target element
        this.target = null;

        //Store offcanvas element
        this.offcanvas = null;

        //Store offcanvas toggle
        this.toggle = null;

        //Store offcanvas transition in miliseconds.
        this.transition = 500;

        //Store offcanvas dismisses
        this.dismisses = null;

        //Store the offcanvas options
        this.options = {
            keyboard: true, //Boolean. Default is true
            backdrop: true, //Boolean | 'static'. Default is true
            ...options,
        };

        this.documentOnKeydown = (e) => this.hideOnKeydown({ e, offcanvas: this });

        if (typeof target === 'string') {
            this.target = document.querySelector(target);
        } else if (target instanceof HTMLElement) {
            this.target = target;
        } else {
            throw new Error('No target element found');
        }

        if (this.target.classList.contains('offcanvas')) {
            this.offcanvas = this.target;
        } else {
            this.toggle = this.target;
            this.offcanvas = document.querySelector(this.toggle.dataset.target);

            this.toggle.addEventListener('click', () => {
                const openOffcanvases = document.querySelectorAll('.offcanvas.show');

                if (openOffcanvases.length) {
                    [...openOffcanvases].forEach((offcanvas) => this.hide(offcanvas));
                } else {
                    this.show();
                }
            });
        }

        this.dismisses = this.offcanvas.querySelectorAll('[data-dismiss="offcanvas"]');

        if (this.dismisses.length) {
            [...this.dismisses].forEach((dismiss) => {
                dismiss.addEventListener('click', () => this.hide());
            });
        }
    }

    show(element = null) {
        const offcanvas = element ? element : this.offcanvas;

        if (!offcanvas.classList.contains('showing')) {
            offcanvas.classList.add('showing');

            if (this.options.backdrop) {
                document.body.appendChild(this.createBackdrop());
            }

            setTimeout(() => {
                const offcanvasBackdrop = document.querySelector('.offcanvas-backdrop');
                offcanvas.classList.replace('showing', 'show');

                if (offcanvasBackdrop) {
                    offcanvasBackdrop.classList.add('show');

                    offcanvasBackdrop.addEventListener('click', () => {
                        if (this.options.backdrop !== 'static') {
                            this.hide();
                        }
                    });
                }

                if (this.options.keyboard) {
                    document.addEventListener('keydown', this.documentOnKeydown);
                }
            }, 15);
        }
    }

    hide(element = null) {
        const offcanvas = element ? element : this.offcanvas;

        if (offcanvas.classList.contains('show') && !offcanvas.classList.contains('hiding')) {
            const offcanvasBackdrop = document.querySelector('.offcanvas-backdrop');

            offcanvas.classList.add('hiding');

            if (offcanvasBackdrop) {
                offcanvasBackdrop.classList.remove('show');
            }

            setTimeout(() => {
                offcanvas.classList.remove('show');
                offcanvas.classList.remove('hiding');

                if (offcanvasBackdrop) {
                    offcanvasBackdrop.remove();
                }

                if (this.options.keyboard) {
                    document.removeEventListener('keydown', this.documentOnKeydown);
                }
            }, this.transition);
        }
    }

    hideOnKeydown(args) {
        const { e, offcanvas } = args;

        if (e.key === 'Escape' && offcanvas.options.keyboard) {
            offcanvas.hide();
        }
    }

    createBackdrop() {
        if (document.querySelector('.offcanvas-backdrop')) {
            document.querySelector('.offcanvas-backdrop').remove();
        }

        const backdrop = document.createElement('div');
        backdrop.setAttribute('class', 'offcanvas-backdrop');

        return backdrop;
    }
}

const offcanvas = {
    init() {
        const toggles = this.querySelectors('[data-toggle="offcanvas"]');

        if (toggles.length) {
            toggles.forEach((toggle) => {
                const targetId = toggle.dataset.target;

                if (targetId) {
                    const target = document.querySelector(targetId);
                    const options = {
                        keyboard: target.dataset.keyboard === 'false' ? false : true,
                        backdrop: (() => {
                            let output = true;

                            if (target.dataset.backdrop === 'static') {
                                output = 'static';
                            }

                            if (target.dataset.backdrop === 'false') {
                                output = false;
                            }

                            return output;
                        })(),
                    };

                    new Offcanvas(toggle, options);
                }
            });
        }
    },

    querySelectors(selectors) {
        let output = [];

        if (selectors) {
            output = [...document.querySelectorAll(selectors)].filter((selectorElement) => {
                // Return all the elements except .code-viewer-source children elements
                return !selectorElement.parentElement.classList.contains('code-viewer-source');
            });
        }

        return output;
    },
};

offcanvas.init();

window.createDrawer = function (target, options = {}) {
    return new Offcanvas(target, options);
};