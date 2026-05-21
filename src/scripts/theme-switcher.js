const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

// Toggle function
function toggleTheme() {
    if (localStorage.getItem('theme') == 'dark') {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else if (localStorage.getItem('theme') == 'light') {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else if (html.getAttribute('data-theme') == 'dark') {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// TODO This is a good idea but it's not working yet
// Listen for system preference changes if no explicit user preference is set
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
//     if (!localStorage.getItem('theme')) {
//         if (e.matches) {
//             html.classList.add('dark');
//         } else {
//             html.classList.remove('dark');
//         }
//     }
// });

export default function initTheme() {
    if (localStorage.getItem('theme') == 'dark') {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
    }
}

// Add click listener
toggleBtn.addEventListener('click', toggleTheme);