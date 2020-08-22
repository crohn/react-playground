const root = document.getElementById('react-root');

if (!root) {
  console.error('Cannot find root');
} else {
  root.innerHTML = 'Hello World';
}
