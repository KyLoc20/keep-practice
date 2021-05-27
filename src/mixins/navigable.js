import Anchor from "@/components/Anchor/Anchor"
export default {
    components: {
        Anchor,
    },
    props: {
        items: {
            type: Array,
        },
    },
    data() {
        return {
            anchorSelected: null,
        };
    },
    filters: {
        sizeAdder: (icon, size) => {
            if (!icon) return undefined
            else return { name: icon, size };
        },
    },
    methods: {
        handleSelect(label) {
            this.anchorSelected = label;
        },
    }
}