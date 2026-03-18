import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        emptyOutDir: true,
        sourcemap: false,

        rolldownOptions: {
            input: {
                main: "src/main.ts",
                options: "src/options.ts"
            },
            output: {
                format: "es",
                entryFileNames: "[name].js",
                assetFileNames: "[name].[ext]",
            },
        },
    },
});