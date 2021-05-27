import Icon from "../components/Icon/Icon";
import { iconChecker } from "../components/Icon/icons";
export default {
    components: {
        Icon
    },
    props: {
        icon: {
            type: [String, Object],
            required: false,
        },
    },
    data() {
        return {}
    },
    computed: {
        iconAvailable() {
            return this.checkIcon()
        },
        iconName() {
            if (this.iconAvailable) {
                if (typeof this.icon === "object") {
                    return this.icon.name
                } else if (typeof this.icon === "string") {
                    return this.icon
                } else {
                    return 'unknown'
                }
            }
        },
        iconSize() {
            if (this.iconAvailable) {
                if (typeof this.icon === "object") {
                    return this.icon.size
                } else if (typeof this.icon === "string") {
                    return 'md'
                } else {
                    return 'md'
                }
            }
        },
        iconColor() {
            if (this.iconAvailable) {
                if (typeof this.icon === "object") {
                    return this.icon.color
                } else if (typeof this.icon === "string") {
                    return 'rgba(0,0,0,0.54)'
                } else {
                    return 'rgba(0,0,0,0.54)'
                }
            }
        },
    },
    methods: {
        checkIcon() {
            if (this.icon === undefined) return false
            else if (typeof this.icon === "object" && iconChecker(this.icon.name)) {
                return true
            } else if (typeof this.icon === "string" && iconChecker(this.icon)) {
                return true
            } else return false

        }
    }
}