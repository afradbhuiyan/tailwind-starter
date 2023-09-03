const accordion = {
    init() {
        const accordions = [...document.querySelectorAll('.accordion')];
        const defaultOptions = {
            elementClass: 'accordion-item',
            triggerClass: 'accordion-button',
            panelClass: 'accordion-collapse',
            activeClass: 'show',
            duration: 300,            
        };

        if (accordions.length) {
            accordions.forEach((accordion) => {
                // accordion items
                const accordionItems = [...accordion.querySelectorAll(`.${defaultOptions.elementClass}`)];

                // accordion option for each accordion
                const accordionOptions = { ...defaultOptions, openOnInit: [] };
                
                // allow mutiple items to show
                if(accordion.dataset.showMultiple  === 'true') {
                    accordionOptions.showMultiple = true;
                }

                accordionItems.forEach((item, index) => {
                    if (item.classList.contains('show')) {
                        // Push default active .accordion-item index
                        accordionOptions.openOnInit.push(index);
                    }
                });

                new Accordion(accordion, accordionOptions);
            });
        }
    },
}

accordion.init();