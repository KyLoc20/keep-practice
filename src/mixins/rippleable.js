const ColorMap = {
    default: 'rgba(0, 0, 0, 0.3)',
    plain: 'rgba(255, 255, 255, 0.3)',
    primary: 'rgba(25, 118, 210, 0.3)',
    secondary: 'rgba(220, 0, 78, 0.3)',
}

export default {
    data() {
        return {}
    },
    mounted() {
        //todo the best way to get final style: window.getComputedStyle(this.$el).position
        // console.log('mount ripple', this.$el, window.getComputedStyle(this.$el).position)
    },
    methods: {
        generateRipple(target, e, isPositionFixed, color, duration) {
            let ripple = document.createElement("span");
            let radius = 21;
            let left = 0;
            let top = 0;
            //todo IMPORTANT target.getBoundingClientRect() get the size and absolute view position of an el(page position = view position+window.scroll)
            //todo IMPORTANT target.offsetLeft() relative position of an el, which is different from the target.getBoundingClientRect().left for an absolute el
            const boundingRect = target.getBoundingClientRect()
            if (isPositionFixed) {
                left = boundingRect.width / 2 - radius;
                top = boundingRect.height / 2 - radius;
            } else {
                left = e.clientX - boundingRect.left - radius;
                top = e.clientY - boundingRect.top - radius;
                // console.log('createRippleX', e.pageX, e.clientX, target.offsetLeft, boundingRect.left, left)
                // console.log('createRippleY', e.pageY, e.clientY, target.offsetTop, boundingRect.top, top)
            }
            ripple.style.width = ripple.style.height = `42px`;
            ripple.style.left = `${left}px`;
            ripple.style.top = `${top}px`;
            ripple.style.background = ColorMap[color] || color
            ripple.style.animationDuration = `${duration?duration:'800'}ms`
            ripple.classList.add("ripple");
            return ripple
        },
        generateOuter() {
            let outer = document.createElement('div')
            outer.style.overflow = 'hidden'
            outer.style.position = 'absolute'
            outer.style.top = '0'
            outer.style.left = '0'
            outer.style.width = '100%'
            outer.style.height = '100%'
                // outer.style.zIndex = '-100'
            outer.style.borderRadius = 'inherit'
            outer.classList.add("ripple-outer");
            return outer
        },
        createRippleByAddingLayer(e, isFixed = false, color = 'default', duration = 800) {
            //todo using an outer layer
            let target = e.currentTarget;
            //config the father component
            if (['absolute', 'fixed'].indexOf(window.getComputedStyle(target).position) === -1) target.style.position = 'relative'
                // this.setColor(target, color)
                // this.setVelocity(target, velocity)
                //generate an outer el
            let outer = this.generateOuter()
                //generate a ripple
            let ripple = this.generateRipple(target, e, isFixed, color, duration)

            //romove the former ripple
            const formerRipple = target.getElementsByClassName("ripple-outer")[0];
            if (formerRipple) formerRipple.remove();
            //mount the ripple
            outer.appendChild(ripple);
            //mount the outer
            target.appendChild(outer);
        },
        createRipple(e, isFixed = false, color = 'default', duration = 800) {
            let target = e.currentTarget;
            //config the father component
            if (['absolute', 'fixed'].indexOf(window.getComputedStyle(target).position) === -1) target.style.position = 'relative'
            target.style.overflow = 'hidden'
                // this.setColor(target, color)
                // this.setVelocity(target, velocity)
                //generate a ripple
            let ripple = this.generateRipple(target, e, isFixed, color, duration)
                //romove the former ripple
            const formerRipple = target.getElementsByClassName("ripple")[0];
            if (formerRipple) formerRipple.remove();
            //mount the ripple
            target.appendChild(ripple);
            // console.log(target, ripple)
        },
    }
}