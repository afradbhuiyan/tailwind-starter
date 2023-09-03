class Dropdown {

    constructor(target, options = {}) {

        if (typeof target === 'string') {
            this.target = document.querySelector(target);
        }

        if (target instanceof HTMLElement) {
            this.target = target;
        }

        if (!this.target) {
            throw new Error('No target element found');
        }

        this.toggle = this.target.querySelector('.dropdown-toggle');
        this.menu = this.target.querySelector('.dropdown-menu');

        if (!this.toggle) {
            throw new Error('No toggle element found');
        }

        if (!this.menu) {
            throw new Error('No menu element found');
        }

        this.options = options;
        this.init();
    }

    init() {
        const outsideClickListener = (e) => {
            if (!this.target.contains(e.target)) {
                this.menu.classList.remove('show');
                this.menu.classList.remove('animate-fade-in-up');
                removeClickListener();
            }
        };

        const removeClickListener = () => {
            this.cleanup();
            document.removeEventListener('click', outsideClickListener);
        };

        this.toggle.addEventListener('click', () => {
            this.updatePosition();
            this.menu.classList.toggle('show');
            this.menu.classList.toggle('animate-fade-in-up');
            document.addEventListener('click', outsideClickListener);
        });
    }

    computePosition() {
        if (this.options.strategy === 'absolute') {
            this.menu.style.position = 'absolute';
        }
        FloatingUIDOM.computePosition(this.target, this.menu, {
            placement: this.options.placement || 'bottom-start',
            strategy: this.options.strategy || 'fixed',
            middleware: [FloatingUIDOM.flip(), FloatingUIDOM.shift(), FloatingUIDOM.offset(6), FloatingUIDOM.hide()],
        }).then((position) => {
            const { referenceHidden } = position.middlewareData.hide;
            Object.assign(this.menu.style, {
                visibility: referenceHidden ? 'hidden' : 'visible',
                left: `${position.x}px`,
                top: `${position.y}px`,
            });
        });
    }

    updatePosition() {
        const cleanup = FloatingUIDOM.autoUpdate(this.target, this.menu, this.computePosition.bind(this));
        this.cleanup = cleanup;
    }
}

const dropdown = {
    init() {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach((dropdown) => {
            new Dropdown(dropdown, dropdown.dataset);
        });
    }
};

dropdown.init();