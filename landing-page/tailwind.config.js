/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        orange:'#DD4C23',
        lite:'#EB6C1F',
        gra:'#222222',
        fad:'#F4C5A9',
        gray:'#F3F3F3',
        blc:"#5A5A5A",
        bbl:"#494949",
        brw:"#8C8C8C",
        eee:"#EEEEEE",
        dark:"#392A2A",
      },
      flex: {
        '1': '1 1 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        inherit: 'inherit',
        none: 'none',
        '2': '2 1 0%',
        '3': '3 1', // Adjusted flex value for flex-3
      },
    },
  },
  plugins: [],
};
