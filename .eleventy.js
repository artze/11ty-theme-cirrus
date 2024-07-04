const { mkdir, readFile, readdir, writeFile } = require("node:fs/promises");
const CleanCss = require("clean-css");

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  /**
   * Minify CSS
   */
  eleventyConfig.on("eleventy.after", async ({ dir }) => {
    const cssFiles = await readdir(`${__dirname}/public/css`);
    await mkdir(`${__dirname}/${dir.output}/css`, { recursive: true });
    for (let i = 0; i < cssFiles.length; i++) {
      const css = await readFile(`${__dirname}/public/css/${cssFiles[i]}`, {
        encoding: "utf-8",
      });
      const cleanCssOutput = new CleanCss().minify(css);
      await writeFile(
        `${__dirname}/${dir.output}/css/${cssFiles[i]}`,
        cleanCssOutput.styles
      );
    }
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
};
