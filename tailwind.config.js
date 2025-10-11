const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {}
    },
    plugins: [],
    theme: {
        extend: {
            colors: {
                /*
          how to use 
            //bg-[group]-[name]
            // text-[group]-[name]
            // border-[group]-[name]
        */
                background: {
                    primary: "#09090b", // zinc-950 → main background (e.g. body, layout)
                    elevated: "#1f1f23", // zinc-800 → elevated surfaces (cards, modals)
                    muted: "#71717a" // zinc-500 → subtle backgrounds or light borders
                },

                surface: {
                    secondary: "#18181b" // zinc-900 → secondary surfaces (navbar, sidebar)
                },

                text: {
                    primary: "#fafafa", // zinc-50 → main text color
                    secondary: "#d4d4d8" // zinc-300 → secondary or less important text
                },

                accent: {
                    primary: "#dc2626", // red-600 → primary buttons, links
                    hover: "#b91c1c", // red-700 → hover state for primary elements
                    secondary: "#f97316" // orange-500 → secondary highlights or icons
                }
            }
        }
    },
    plugins: []
});
