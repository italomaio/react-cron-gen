import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import { dts } from "rollup-plugin-dts";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import alias from "@rollup/plugin-alias";
import path from "path";
import rollupJson from "@rollup/plugin-json";
import depsExternal from "rollup-plugin-peer-deps-external";
import dtsPathAlias from "rollup-plugin-dts-path-alias";
import commonjs from "@rollup/plugin-commonjs";
import svgr from "@svgr/rollup";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";

export default [
  {
    input: "src/index.ts",
    onLog(level, log, handler) {
      if (log.code === "MODULE_LEVEL_DIRECTIVE") return;

      handler(level, log);
    },
    plugins: [
      depsExternal(),
      alias({
        entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      }),
      nodeResolve(),
      rollupJson(),
      commonjs({
        include: /node_modules/,
        esmExternals: true,
        requireReturnsDefault: "auto",
      }),
      svgr({
        icon: false,
      }),
      swc(
        defineRollupSwcOption({
          include: /\.[mc]?[jt]sx?$/,
          exclude: ["**/*.css", "node_modules/**"],
          tsconfig: "tsconfig.json",
          sourceMaps: true,
          jsc: {
            transform: {
              react: {
                runtime: "automatic",
              },
            },
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            target: "esnext",
          },
        })
      ),
    ],
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
  },
  {
    input: "src/styles.css",
    plugins: [
      postcss({
        plugins: [autoprefixer()],
        extract: true,
        minimize: true,
        sourceMap: true,
        extensions: [".css"],
      }),
    ],
    output: {
      file: "dist/styles.css",
    },
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      depsExternal(),
      dtsPathAlias({
        cwd: process.cwd(),
        aliases: {
          "@": path.resolve(__dirname, "dist/types"),
        },
      }),
      dts({
        entrypoint: "dist/types/index.d.ts",
        respectExternal: true,
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
];
