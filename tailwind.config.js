/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{html,js,py}"],
  theme: {
    extend: {
      colors:{
        "mycolor":{
          1: "#f2f2f2",
          2: "#232f3e",
          3: "#000000",
          4:"#146eb4",
          5:"#ff9900",
        },
      }
    },
  },
  plugins: [],
}

