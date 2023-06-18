import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import { Image as TiptapImage } from '@tiptap/extension-image';
import ResizableImage from './ResizableImage.svelte';

export const SvelteImageExtension = TiptapImage.extend({
  name: 'svelte-image-component',
  group: 'block',
  atom: true,
  draggable: true, // Optional: to make the node draggable
  inline: false,


  
  addAttributes() {
    return {
      count: {
        default: 0,
      },
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'svelte-image-component' }];
  },

  renderHTML(all) {
    let { HTMLAttributes } = all;
    return ['svelte-image-component', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(ResizableImage);
  },
});