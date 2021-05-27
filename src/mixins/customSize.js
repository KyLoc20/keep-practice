// to custom the prop of size allowing user to input a valid number or choose preset size
// what's more a mapSize below is required when getting the size value
// const mapSize = {
//     sm: 20,
//     md: 24,
//     lg: 36,
//   };
export default {
    props: {
        size: {
            default: "md",
            validator: (v) => {
                if (typeof v === "string" && ["sm", "md", "lg"].indexOf(v) !== -1)
                    return true;
                else if (typeof v === "number" && v > 0) return true;
                else return false;
            },
        },
    },
    methods: {
        getSize(inputSize, mapSize) {
            if (typeof inputSize === "string") return mapSize[inputSize] || 24;
            else if (typeof inputSize === "number") return inputSize;
            else return 24;
        },
    },
}