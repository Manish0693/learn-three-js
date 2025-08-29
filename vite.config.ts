import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [
    glsl({
      include: '**/*.{glsl,vs,fs,vert,frag}', // Shader extensions
      defaultExtension: 'glsl',             // Fallback extension
      warnDuplicatedImports: true,          // Warn if same shader imported twice
    })
  ]
})
