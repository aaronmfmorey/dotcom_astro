import { visit } from 'unist-util-visit';

export function customImage() {
    return (tree) => {
        visit(tree, 'image', (node) => {
            console.log("MYNODE", node);
            // Replace the image node with a custom component
            node.type = 'html';
            node.value = `<img src="http://example.com/test.jpg" alt="SOME TEXT" />`;
        });
    };
}
