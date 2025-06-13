// rehype-table-scroll.js
import { visit } from 'unist-util-visit';

export default function rehypeTableScroll() {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (node.tagName === 'table' && parent) {
                parent.children[index] = {
                    type: 'element',
                    tagName: 'div',
                    properties: { className: ['table-scroll-container'] },
                    children: [node],
                };
            }
        });
    };
}