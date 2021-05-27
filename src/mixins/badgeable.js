import Badge from "../components/Badge/Badge";
export default {
    components: {
        Badge
    },
    props: {
        //todo if its an object it will call computed constantly
        badge: {
            type: [Number, Object],
            required: false,
        },
    },
    data() {
        return {
            badgeDefaultProp: {
                content: 0,
                color: "primary",
                size: "sm",
                visible: true,
                simple: true,
                rippleable: false,
            },
        }
    },
    computed: {
        badgeAvailable() {
            // console.log("badgeAvailable", this.badge)
            return this.checkBadge() && this.badgeContent > 0
        },
        badgeContent() {
            return this.computedValue(this.badge, 'content', "number")
        },
        badgeColor() {
            return this.computedValue(this.badge, 'color', "notDefaultType")
        },
        badgeSize() {
            return this.computedValue(this.badge, 'size', "notDefaultType")
        },
        badgeVisible() {
            return this.computedValue(this.badge, 'visible', "notDefaultType")
        },
        badgeSimple() {
            return this.computedValue(this.badge, 'simple', "notDefaultType")
        },
        badgeRippleable() {
            return this.computedValue(this.badge, 'rippleable', "notDefaultType")
        },
    },
    methods: {
        checkBadge() {
            if (this.badge === undefined) return false
            else if (typeof this.badge === "object" || typeof this.badge === "number") {
                return true
            } else return false
        },
        computedValue(obj, keyName, secondaryTypeName) {
            if (typeof obj === "object") {
                return obj[keyName] === undefined ? this.badgeDefaultProp[keyName] : obj[keyName]
            } else if (typeof obj === secondaryTypeName) {
                return obj
            } else {
                let defaultValue = this.badgeDefaultProp[keyName]
                return defaultValue
            }
        }
    }
}